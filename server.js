const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer'); // For handling file uploads
const fs = require('fs');
const { exec } = require('child_process'); // To run Python script

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());

// Replace with your MongoDB connection string
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const dbName = 'civicIssues';
let db;

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbName);
  } catch (error) {
    console.error('Could not connect to MongoDB:', error);
  }
}
connectDB();

// Configure image storage
const upload = multer({ dest: 'uploads/' });

// Route to register a user
app.post('/registerUser', async (req, res) => {
  const { email, password, state, district, securityQuestion, securityAnswer, role, verificationCode } = req.body;

  if (role === 'Municipal Corporation' && verificationCode !== 6978) {
    return res.status(400).json({ success: false, message: 'Incorrect verification code.' });
  }

  const user = { email, password, state, district, securityQuestion, securityAnswer, role };

  try {
    const collection = db.collection('users');
    await collection.insertOne(user);
    res.status(200).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ success: false, message: 'Failed to register user', error });
  }
});

// Route to login a user
app.post('/loginUser', async (req, res) => {
  const { email, password } = req.body;

  try {
    const collection = db.collection('users');
    const user = await collection.findOne({ email: email });

    if (user && user.password === password) {
      res.status(200).json({ success: true, user: user });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ success: false, message: 'Failed to login user', error });
  }
});

app.post('/verifyPothole', upload.single('image'), async (req, res) => {
  try {
    const email = req.body.email;  // Ensure the frontend sends user email
    const base64Data = req.body.image.replace(/^data:image\/jpeg;base64,/, "");
    const imagePath = `uploads/pothole_test.jpg`;

    fs.writeFileSync(imagePath, base64Data, 'base64');

    const userCollection = db.collection('users');
    const user = await userCollection.findOne({ email });

    // Check if user is blocked
    if (user && user.blockedUntil && new Date(user.blockedUntil) > new Date()) {
      return res.status(403).json({ success: false, message: 'User temporarily blocked. Try again later.' });
    }

    exec(`python3 predict.py ${imagePath}`, async (error, stdout, stderr) => {
      if (error) {
        console.error('Error running model:', stderr);
        return res.status(500).json({ success: false, message: 'Model execution error' });
      }

      const result = stdout.trim();
      const isPothole = result.includes('Pothole detected');

      if (!isPothole) {
        let failedAttempts = user?.failedAttempts ? user.failedAttempts + 1 : 1;

        if (failedAttempts >= 3) {
          const blockTime = new Date();
          blockTime.setDate(blockTime.getDate() + 1);
          await userCollection.updateOne({ email }, { $set: { blockedUntil: blockTime, failedAttempts: 0 } }, { upsert: true });

          return res.status(403).json({ success: false, message: 'Too many failed attempts. User blocked for 24 hours.' });
        } else {
          await userCollection.updateOne({ email }, { $set: { failedAttempts } }, { upsert: true });
        }

        return res.json({ success: true, isPothole: false, message: `Attempt ${failedAttempts}/3` });
      } else {
        await userCollection.updateOne({ email }, { $set: { failedAttempts: 0 } });
      }

      res.json({ success: true, isPothole });
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to process image' });
  }
});


// Route to submit a complaint
app.post('/submitComplaint', async (req, res) => {
  console.log("Received complaint data:", req.body);
  const { name, description, status, createdAt, image } = req.body;
  const location = "Lat: 19.0673, Lon: 72.9892";
  const createdAtIST = createdAt ? new Date(createdAt).toISOString() : new Date().toISOString();
 
  // Set deadline (7 days from createdAt)
  const deadline = new Date(createdAtIST);
  deadline.setDate(deadline.getDate() + 7);
 
  const complaint = { name, description, status, createdAt: createdAtIST, deadline: deadline.toISOString(), image, location };

  try {
    const collection = db.collection('complaints');
    const result = await collection.insertOne(complaint);
    res.status(200).json({ message: 'Complaint submitted successfully', result });
  } catch (error) {
    console.error('Error inserting complaint:', error);
    res.status(500).json({ message: 'Failed to submit complaint', error });
  }
});

// Route to fetch all complaints
app.get('/complaints', async (req, res) => {
  try {
    const collection = db.collection('complaints');
    const complaints = await collection.find({}).toArray();

    const groupedComplaints = {};
    complaints.forEach(complaint => {
      const key = `${complaint.name}-${complaint.location}`;
      if (!groupedComplaints[key]) {
        groupedComplaints[key] = [];
      }
      groupedComplaints[key].push(complaint);
    });

    const sortedComplaints = Object.values(groupedComplaints).flat().sort((a, b) => {
      const keyA = `${a.name}-${a.location}`;
      const keyB = `${b.name}-${b.location}`;
      return groupedComplaints[keyB].length - groupedComplaints[keyA].length;
    });

    res.status(200).json(sortedComplaints);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ message: 'Failed to fetch complaints', error });
  }
});

// Route to mark a complaint as solved
app.put('/markAsSolved/:id', async (req, res) => {
  const complaintId = req.params.id;
  const { image } = req.body;

  try {
    let updateData = { status: 'Solved' };
    if (image) {
      updateData.solvedImage = image;
    }

    const result = await db.collection('complaints').updateOne(
      { _id: new ObjectId(complaintId) },
      { $set: updateData }
    );

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Complaint marked as solved' });
    } else {
      res.status(404).json({ message: 'Complaint not found' });
    }
  } catch (error) {
    console.error('Error marking complaint as solved:', error);
    res.status(500).json({ message: 'Failed to mark complaint as solved', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
