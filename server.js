const { MongoClient, ObjectId } = require('mongodb'); // Import both MongoClient and ObjectId only once
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Replace with your MongoDB connection string
const uri = "mongodb://localhost:27017"; // Modify if your MongoDB is hosted elsewhere
const client = new MongoClient(uri);

// Database and collection setup
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

// Route to register a user
app.post('/registerUser', async (req, res) => {
  const { email, password, state, district, securityQuestion, securityAnswer, role, verificationCode } = req.body;

  // Handle Municipal Corporation registration with verification code
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
    // Group complaints by type and location
    const groupedComplaints = {};
    complaints.forEach(complaint => {
      const key = `${complaint.name}-${complaint.location}`;
      if (!groupedComplaints[key]) {
        groupedComplaints[key] = [];
      }
      groupedComplaints[key].push(complaint);
    });
    // Convert object to array and sort to show duplicates first
    const sortedComplaints = Object.values(groupedComplaints).flat().sort((a, b) => {
      const keyA = `${a.name}-${a.location}`;
      const keyB = `${b.name}-${b.location}`;
      return groupedComplaints[keyB].length - groupedComplaints[keyA].length; // Sort by number of duplicates
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
  const { image } = req.body; // Receive solved image data if provided
  try {
    let updateData = { status: 'Solved' };
    if (image) {
      updateData.solvedImage = image; // Store solved image if provided
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