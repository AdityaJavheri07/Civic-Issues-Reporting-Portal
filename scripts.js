let selectedAction = '';
let usersData = {
    'enduser@example.com': {
        password: 'password123',
        role: 'End User'
    },
    'municipal@example.com': {
        password: 'password123',
        role: 'Municipal Corlet selectedAction = '';
let usersData = {
    'enduser@example.com': {
        password: 'password123',
        role: 'End User'
    },
    'municipal@example.com': {
        password: 'password123',
        role: 'Municipal Corporation'
    }
};

const complaints = [
    { id: 1, type: 'Pothole', description: 'Big pothole on Main St.', status: 'Pending', createdAt: '2024-09-20' },
    { id: 2, type: 'Water Logging', description: 'Water logged near the park.', status: 'In Review', createdAt: '2024-09-25' },
    { id: 3, type: 'Streetlight', description: 'Streetlight not working.', status: 'Solved', createdAt: '2024-09-15' },
];

// Populate states in the state dropdown
const statesData = {
    states: [
        { state: "Andhra Pradesh", districts: ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"] },
        { state: "Arunachal Pradesh", districts: ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kurung Kumey", "Lohit", "Lower Subansiri", "Namsai", "Papum Pare", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"] },
        { state: "Assam", districts: ["Baksa", "Barpeta", "Bongaigaon", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Golaghat", "Hailakandi", "Jorhat", "Kamrup", "Karimganj", "Kokrajhar", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "Tinsukia", "Udalguri"] },
        { state: "Bihar", districts: ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Buxar", "Darbhanga", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Supaul", "Vaishali", "West Champaran"] },
        { state: "Chhattisgarh", districts: ["Balod", "Baloda Bazar", "Bastar", "Bemetara", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Korba", "Mahasamund", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"] },
        { state: "Goa", districts: ["North Goa", "South Goa"] },
        { state: "Gujarat", districts: ["Ahmedabad", "Amreli", "Anand", "Banas Kantha", "Bharuch", "Bhavnagar", "Dahod", "Dangs", "Gandhinagar", "Kutch", "Kheda", "Mahisagar", "Mehsana", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Vadodara", "Valsad"] },
        { state: "Haryana", districts: ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Mahendragarh", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"] },
        { state: "Himachal Pradesh", districts: ["Bilaspur", "Chamba", "Dharamshala", "Hamirpur", "Kinnaur", "Kullu", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"] },
        { state: "Jharkhand", districts: ["Bokaro", "Chatra", "Dhanbad", "Dumka", "East Singhbhum", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"] },
        { state: "Karnataka", districts: ["Bagalkot", "Bangalore Rural", "Bangalore Urban", "Belgaum", "Bellary", "Bidar", "Chamarajanagar", "Chikballapur", "Chikmagalur", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysore", "Raichur", "Ramanagara", "Shivamogga", "Tumkur", "Udupi", "Uttara Kannada", "Yadgir"] },
        { state: "Kerala", districts: ["Alappuzha", "Ernakulam", "Idukki", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"] },
        { state: "Madhya Pradesh", districts: ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Shahdol", "Shajapur", "Sheopur", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"] },
        { state: "Maharashtra", districts: ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalna", "Jalgaon", "Kolhapur", "Latur", "Mumbai", "Nagpur", "Nanded", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"] },
        { state: "Manipur", districts: ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Senapati", "Tamenglong", "Thoubal", "Ukhrul"] },
        { state: "Meghalaya", districts: ["East Garo Hills", "East Khasi Hills", "Jaintia Hills", "North Garo Hills", "South Garo Hills", "West Garo Hills", "West Khasi Hills"] },
        { state: "Mizoram", districts: ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"] },
        { state: "Nagaland", districts: ["Dimapur", "Kiphire", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"] },
        { state: "Odisha", districts: ["Angul", "Baleswar", "Bargarh", "Bhadrak", "Bolangir", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khurda", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Sonepur", "Jagatsinghpur", "Dhenkanal", "Cuttack", "Ganjam", "Gajapati", "Koraput", "Mayurbhanj", "Bolangir"] },
        { state: "Punjab", districts: ["Amritsar", "Barnala", "Bathinda", "Fatehgarh Sahib", "Fazilka", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Pathankot", "Patiala", "Rupnagar", "Sangrur", "SAS Nagar"] },
        { state: "Rajasthan", districts: ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Jaipur", "Jaisalmer", "Jalore", "Jhunjhunu", "Jodhpur", "Karauli", "Nagaur", "Pali", "Rajsamand", "Sawai Madhopur", "Sikar", "Tonk", "Udaipur"] },
        { state: "Sikkim", districts: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"] },
        { state: "Tamil Nadu", districts: ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivagangai", "Tenkasi", "Thanjavur", "Theni", "Tirunelveli", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Vellore", "Virudhunagar"] },
        { state: "Telangana", districts: ["Adilabad", "Hyderabad", "Karimnagar", "Khammam", "Mahbubnagar", "Medak", "Nalgonda", "Nizamabad", "Ranga Reddy", "Warangal"] },
        { state: "Tripura", districts: ["Dhalai", "Gomati", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"] },
        { state: "Uttar Pradesh", districts: ["Agra", "Aligarh", "Allahabad", "Ambedkar Nagar", "Auraiya", "Azamgarh", "Badaun", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Bijnor", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Hamirpur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Jhansi", "Kannauj", "Kanpur Nagar", "Kanpur Dehat", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerat", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Raebareli", "Rampur", "Saharanpur", "Shahjahanpur", "Shrawasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi", "Vichedia"] },
        { state: "Uttarakhand", districts: ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"] },
        { state: "West Bengal", districts: ["Alipurduar", "Bankura", "Birbhum", "Burdwan", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Malda", "Medinipur", "Murshidabad", "Nadia", "North 24 Parganas", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"] },
    ]
};

// Declare the verification code variable
const verificationCode = 6978;

// Populate states
function populateStates() {
    const stateInput = document.getElementById('state');
    stateInput.innerHTML = '<option value="">Select a state</option>';
    statesData.states.forEach(state => {
        const option = document.createElement('option');
        option.value = state.state;
        option.textContent = state.state;
        stateInput.appendChild(option);
    });
}

// Populate districts
function populateDistricts() {
    const stateInput = document.getElementById('state');
    const districtInput = document.getElementById('district');
    const selectedState = stateInput.value;

    const stateData = statesData.states.find(state => state.state === selectedState);
    if (stateData) {
        districtInput.innerHTML = '<option value="">Select a district</option>';
        stateData.districts.forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            districtInput.appendChild(option);
        });
    }
}

// Show login or register options
function showOptions(actionType) {
    selectedAction = actionType;
    document.getElementById('home-frame').classList.add('hidden');
    document.getElementById('options-frame').classList.remove('hidden');
    if (actionType === 'login') {
        document.getElementById('role-selection').classList.remove('hidden'); // Show role selection for login
        document.getElementById('action-title').textContent = 'Login';
    } else {
        document.getElementById('role-selection').classList.add('hidden'); // Hide role selection for register
        document.getElementById('action-title').textContent = 'Register';
        document.getElementById('form-container').classList.remove('hidden');
        document.getElementById('register-form').classList.remove('hidden');
        document.getElementById('login-form').classList.add('hidden');
    }
}


// Show form based on role
function showForm(role, formType) {
    const roleTitle = role === 'end-user' ? 'End User' : 'Municipal Corporation';
    document.getElementById('action-title').textContent = `${formType.charAt(0).toUpperCase() + formType.slice(1)} as ${roleTitle}`;

    document.getElementById('role-selection').classList.add('hidden');
    document.getElementById('form-container').classList.remove('hidden');

    document.getElementById('login-form').classList.toggle('hidden', formType !== 'login');
    document.getElementById('register-form').classList.toggle('hidden', formType !== 'register');
    document.getElementById('forgot-password-form').classList.add('hidden');
    document.getElementById('complaint-form').classList.toggle('hidden', formType !== 'complaint');

    // Show the "Previously Lodged Complaints" button only if showing the complaint form
    const complaintsButton = document.getElementById('logged-complaints-button-container');
    if (formType === 'complaint') {
        complaintsButton.classList.remove('hidden');
    } else {
        complaintsButton.classList.add('hidden');
    }

    updateFormVisibility(role);
}


document.getElementById('role').addEventListener('change', function () {
    const selectedRole = this.value;
    updateFormVisibility(selectedRole);
});

function updateFormVisibility(role) {
    const verificationCodeField = document.getElementById('verification-code');
    const verificationCodeLabel = document.getElementById('verification-code-label'); // Ensure label has an ID
    const securityQuestionSelect = document.getElementById('security-question');

    if (role === 'End User') {
        // Hide the verification code field for End Users
        verificationCodeField.style.display = 'none';
        verificationCodeLabel.style.display = 'none';

        // Set end-user specific security questions
        securityQuestionSelect.innerHTML = `
            <option value="">Select a question</option>
            <option value="favorite-color">What is your favorite color?</option>
            <option value="pet-name">What is your pet's name?</option>
            <option value="birth-city">What city were you born in?</option>
        `;
    } else if (role === 'Municipal Corporation') {
        // Show the verification code field for Municipal Corporation
        verificationCodeField.style.display = 'block';
        verificationCodeLabel.style.display = 'block';

        // Set municipal corporation-specific security questions
        securityQuestionSelect.innerHTML = `
            <option value="">Select a question</option>
            <option value="municipal-name">What is the name of your municipal corporation?</option>
            <option value="department">What department do you work in?</option>
            <option value="last-meeting">What was the date of your last municipal meeting?</option>
            <option value="office-address">What is the address of your municipal office?</option>
            <option value="mayor">Who is the current mayor of your municipality?</option>
        `;
    } else {
        // Default case: hide verification code and reset security questions
        verificationCodeField.style.display = 'none';
        verificationCodeLabel.style.display = 'none';
        securityQuestionSelect.innerHTML = `<option value="">Select a question</option>`;
    }
}

function toggleVerificationCode() {
    const roleSelect = document.getElementById('role');
    const verificationCodeInput = document.getElementById('verification-code');
    const verificationCodeLabel = document.getElementById('verification-code-label');

    if (roleSelect.value === 'Municipal Corporation') {
        verificationCodeInput.style.display = 'block'; // Show the input
        verificationCodeLabel.style.display = 'block'; // Show the label
    } else {
        verificationCodeInput.style.display = 'none'; // Hide the input
        verificationCodeLabel.style.display = 'none'; // Hide the label
    }
}

function registerUser(event) {
    event.preventDefault(); // Prevent the form from reloading the page
    // Get values from the form fields
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const state = document.getElementById('state').value;
    const district = document.getElementById('district').value;
    const selectedQuestion = document.getElementById('security-question').value;
    const answer = document.getElementById('security-answer').value;
    const role = document.getElementById('role').value;
    const enteredCode = parseInt(document.getElementById('verification-code').value); // For Municipal Corporation

    // Additional password validation
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
        alert('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
        return;
    }

    const userData = {
        email: email,
        password: password,
        state: state,
        district: district,
        securityQuestion: selectedQuestion,
        securityAnswer: answer,
        role: role,
        verificationCode: enteredCode
    };

    fetch('http://localhost:3000/registerUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful!');
            backToMain(); // Navigate back after successful registration
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to register user.');
    });
}


function registerMunicipal(event) {
    event.preventDefault();

    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const enteredCode = parseInt(document.getElementById('verification-code').value); // Convert entered code to a number

    // Check if the entered verification code matches the predefined code
    if (enteredCode === verificationCode) { // Now comparing two numbers
        if (email && password) {
            usersData[email] = {
                password: password,
                role: 'Municipal Corporation'
            };
            alert('Registration successful as Municipal Corporation!');
            backToMain();
        } else {
            alert('Please fill in all the required fields.');
        }
    } else {
        alert('Verification code does not match. Please contact the owner of this portal.');
    }
}

function loginUser(event) {
  event.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const loginData = {
    email: username,
    password: password
  };

  fetch('http://localhost:3000/loginUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      const role = data.user.role; // Get the role of the user
      const userEmail = data.user.email; // Get user email from response

      // ✅ Store email in localStorage after successful login
      localStorage.setItem("userEmail", userEmail);

      if (role === 'End User') {
        showForm('end-user', 'complaint'); // Show complaint form for End Users
      } else if (role === 'Municipal Corporation') {
        document.getElementById('home-frame').classList.add('hidden');
        document.getElementById('options-frame').classList.add('hidden');
        document.getElementById('municipal-dashboard').classList.remove('hidden');
        loadMunicipalDashboard(); // Call function to load complaints in the dashboard
      }
    } else {
      alert('Invalid username or password.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Failed to login.');
  });
}


// Show forgot password form
function showForgotPassword() {
    const username = document.getElementById('login-username').value;

    if (username in usersData) {
        const selectedQuestionKey = usersData[username].securityQuestion;
        let questionText;

        switch (selectedQuestionKey) {
            case 'food':
                questionText = 'What is your favorite food?';
                break;
            case 'sport':
                questionText = 'What is your favorite sport?';
                break;
            case 'birthplace':
                questionText = 'Where were you born?';
                break;
            case 'firstjob':
                questionText = 'Which company did you first join?';
                break;
            case 'mothermaiden':
                questionText = 'What is your mother\'s maiden name?';
                break;
            case 'school':
                questionText = 'What was the name of your primary school?';
                break;
            default:
                questionText = 'Security question not found.';
                break;
        }

        document.getElementById('reset-username').value = username;
        document.getElementById('reset-question').textContent = questionText;

        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('register-form').classList.add('hidden');
        document.getElementById('forgot-password-form').classList.remove('hidden');
    } else {
        alert('Username not found. Please enter a valid username.');
    }
}

// Show password during reset
function showPassword(event) {
    event.preventDefault();

    const username = document.getElementById('reset-username').value;
    const answer = document.getElementById('reset-answer').value;

    if (username in usersData && usersData[username].securityAnswer === answer) {
        alert(`Your password is: ${usersData[username].password}`);
        backToMain();
    } else {
        alert('Incorrect answer. Please try again.');
    }
}

function submitComplaint(event) {
    event.preventDefault(); // Prevent default form submission

    const complaintName = document.getElementById('complaint-name').value;
    const complaintDescription = document.getElementById('complaint-description').value;
    const video = document.getElementById('video');

    // Retrieve video frame
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg');

    // Step for Blurriness detection
    const variance = detectBlurriness(imageData);

    if (variance < 100) {
        alert('The captured image is blurred. Please retake the photo.');
        return;
    }

    const userEmail = localStorage.getItem("userEmail"); // Ensure user is logged in

    // Only proceed with pothole detection if "Pothole" is selected
    if (complaintName === "pothole") {
        let failedAttempts = parseInt(localStorage.getItem(`failedAttempts_${userEmail}`) || "0");

        fetch('http://localhost:3000/verifyPothole', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: imageData, email: userEmail }) // Including user email
        })
        .then(response => response.json())
        .then(data => {
            if (data.isPothole) {
                alert('\u2705 Pothole detected! Proceeding with complaint submission.');
                submitToBackend(complaintName, complaintDescription, imageData); // Submit complaint
            } else {
                failedAttempts++;
                localStorage.setItem(`failedAttempts_${userEmail}`, failedAttempts); // Increment failed attempts
                if (failedAttempts >= 3) {
                    alert("Max attempts reached! You are blocked for 24 hours.");
                    // Additional logic to block the user for 24 hours can be added here
                } else {
                    alert(`\u26a0 No pothole detected. Attempt ${failedAttempts}/3.`);
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error in pothole detection.');
        });

    } else if (complaintName === "waterlogging") {
        // New: water logging detection logic
        fetch('http://localhost:3000/verifyWaterLogging', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: imageData, email: userEmail }) // Including user email
        })
        .then(response => response.json())
        .then(data => {
            if (data.isWaterLogged) {
                alert('\u2705 Water logging detected! Proceeding with complaint submission.');
                submitToBackend(complaintName, complaintDescription, imageData); // Submit complaint
            } else {
                alert('\u26A0 No water logging detected. Please try again with a clearer image.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error in water logging detection.');
        });

    } else {
        // For other complaint types, submit directly
        submitToBackend(complaintName, complaintDescription, imageData);
    }
}


// Function to submit complaint to backend
function submitToBackend(complaintName, complaintDescription, imageData) {
    fetch('http://localhost:3000/submitComplaint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: complaintName,
            description: complaintDescription,
            status: 'Pending',
            createdAt: new Date().toISOString(),
            image: imageData
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        console.log('Complaint submitted:', data.result);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to submit the complaint.');
    });
}


async function verifyPothole(imageData) {
    const email = localStorage.getItem("userEmail");

    let response = await fetch("http://localhost:3000/verifyPothole", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData, email })
    });

    let data = await response.json();
   
    if (!data.success) {
        alert(data.message);
        return;
    }

    if (!data.isPothole) {
        let failedAttempts = parseInt(localStorage.getItem("failedAttempts") || "0") + 1;
        localStorage.setItem("failedAttempts", failedAttempts);

        if (failedAttempts >= 3) {
            localStorage.setItem("blockTime", Date.now());  // Set block time
            alert("Max attempts reached! You are blocked for 24 hours.");
        } else {
            alert(`Failed attempt ${failedAttempts}/3. Try again.`);
        }
    } else {
        localStorage.setItem("failedAttempts", "0");  // Reset on success
    }
}



// Function to show the complaint registration form
function showComplaintForm() {
    document.getElementById('complaint-form').classList.remove('hidden');
    document.getElementById('logged-complaints').classList.add('hidden');
}

// Function to show the logged complaints section
function showLoggedComplaints() {
    // Hide the complaint form and show the logged complaints section
    document.getElementById('complaint-form').classList.add('hidden');
    document.getElementById('logged-complaints').classList.remove('hidden');

    // Call function to fetch and display logged complaints from the server
    displayLoggedComplaints();
}

// Function to fetch and display logged complaints
function displayLoggedComplaints() {
    fetch('http://localhost:3000/complaints') // Fetch complaints from your server
        .then(response => response.json())
        .then(complaints => {
            const loggedComplaintsBody = document.getElementById('logged-complaints-body');
            loggedComplaintsBody.innerHTML = ''; // Clear previous entries

            complaints.forEach((complaint, index) => {
                const row = `<tr>
                    <td>${complaint.name}</td>
                    <td>${complaint.description}</td>
                    <td>${complaint.status}</td>
                    <td>${new Date(complaint.createdAt).toLocaleString()}</td>
                </tr>`;
                loggedComplaintsBody.innerHTML += row; // Append row to table body
            });
        })
        .catch(error => {
            console.error('Error fetching complaints:', error);
            alert('Failed to load previous complaints');
        });
}


// Open camera
function openCamera() {
    const cameraContainer = document.getElementById('camera-container');
    cameraContainer.classList.remove('hidden');

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            const video = document.getElementById('video');
            video.srcObject = stream;
            video.play();
        })
        .catch(err => {
            alert('Unable to access camera: ' + err);
        });
}


function capture() {
    let userEmail = localStorage.getItem("userEmail");

    if (!userEmail || userEmail.trim() === "") {
        alert("User not logged in. Please log in to continue.");
        return;
    }

    let failedAttempts = parseInt(localStorage.getItem(`failedAttempts_${userEmail}`) || "0");

    // Safely parse blockTime and avoid string "null"/"undefined"
    let blockTimeRaw = localStorage.getItem(`blockTime_${userEmail}`);
    let blockTime = (blockTimeRaw && blockTimeRaw !== "null" && blockTimeRaw !== "undefined") ? parseInt(blockTimeRaw) : null;

    if (blockTime !== null && !isNaN(blockTime)) {
        const timeElapsed = Date.now() - blockTime;
        const twentyFourHours = 24 * 60 * 60 * 1000;

        if (timeElapsed < twentyFourHours) {
            alert("Max attempts reached! You are blocked for 24 hours.");
            return;
        } else {
            // Unblock the user after 24 hours
            localStorage.removeItem(`blockTime_${userEmail}`);
            localStorage.setItem(`failedAttempts_${userEmail}`, "0");
            failedAttempts = 0;
        }
    }

    if (failedAttempts >= 3) {
        localStorage.setItem(`blockTime_${userEmail}`, Date.now());
        alert("Max attempts reached! You are blocked for 24 hours.");
        return;
    }

    const video = document.getElementById("video");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const variance = detectBlurriness(imageData.data);

    if (variance < 100) {
        alert("The captured image is blurred. Please retake the photo.");
        return;
    }

    const complaintType = document.getElementById("complaint-name").value;
    const imageDataURL = canvas.toDataURL("image/jpeg");

    const confirmClearImage = confirm(`The image is clear. Do you want to proceed with ${complaintType} detection?`);
    if (!confirmClearImage) {
        alert("You chose not to proceed with detection.");
        return;
    }

    // Determine which backend endpoint and result key to use
    let endpoint = "";
    let resultKey = "";
    let complaintName = complaintType;
    let complaintDescription = "";

    if (complaintType === "pothole") {
        endpoint = "http://localhost:5000/verifyPothole";
        resultKey = "isPothole";
        complaintDescription = "Pothole detected from captured image.";
    } else if (complaintType === "waterlogging") {
        endpoint = "http://localhost:5000/verifyWaterLogging";
        resultKey = "isWaterLogged";
        complaintDescription = "Water logging detected from captured image.";
    }

    if (endpoint) {
        fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: imageDataURL, email: userEmail })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success && data[resultKey]) {
                alert(`✅ ${complaintType.charAt(0).toUpperCase() + complaintType.slice(1)} detected! Proceeding with complaint submission.`);
                localStorage.setItem(`failedAttempts_${userEmail}`, "0");

                submitToBackend(complaintName, complaintDescription, imageDataURL);
            } else {
                failedAttempts++;
                localStorage.setItem(`failedAttempts_${userEmail}`, failedAttempts);

                if (failedAttempts >= 3) {
                    localStorage.setItem(`blockTime_${userEmail}`, Date.now());
                    alert("Max attempts reached! You are blocked for 24 hours.");
                } else {
                    alert(`⚠️ No ${complaintType} detected. Failed attempt ${failedAttempts}/3.`);
                }
            }
        })
        .catch(error => {
            console.error(`Error sending image to Flask server:`, error);
            alert("Error occurred while detecting the issue. Please try again.");
        });
    } 
	else {
        // If it's not a supported ML-detectable complaint type, just submit it
        submitToBackend(complaintName, "Submitted via camera", imageDataURL);
    }
}





// Function to detect blurriness
function detectBlurriness(imageData) {
    const grayData = [];
    const width = Math.sqrt(imageData.length / 4);
    const height = width; // Assuming square image

    // Convert to grayscale
    for (let i = 0; i < imageData.length; i += 4) {
        const gray = 0.299 * imageData[i] + 0.587 * imageData[i + 1] + 0.114 * imageData[i + 2];
        grayData.push(gray);
    }

    // Laplacian variance calculation
    const laplacianData = [];
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const i = y * width + x;
            const laplacian = (
                -grayData[i - width - 1] - grayData[i - width] - grayData[i - width + 1] +
                -grayData[i - 1] + 8 * grayData[i] - grayData[i + 1] +
                -grayData[i + width - 1] - grayData[i + width] - grayData[i + width + 1]
            );
            laplacianData.push(laplacian);
        }
    }

    // Calculate variance of Laplacian
    const mean = laplacianData.reduce((sum, value) => sum + value, 0) / laplacianData.length;
    const variance = laplacianData.reduce((sum, value) => sum + (value - mean) ** 2, 0) / laplacianData.length;

    return variance; // Return the calculated variance
}

// Function to handle image upload
async function uploadImage() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = async () => {
        const file = fileInput.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = async () => {
            const base64Image = reader.result;

            // Use user email from localStorage
            const email = localStorage.getItem('userEmail') || 'anonymous@example.com';

            // Get complaint type from dropdown
            const complaintType = document.getElementById('complaint-name').value;

            // Set the endpoint based on normalized complaint type
            let endpoint = '';
            if (complaintType.toLowerCase() === 'waterlogging') {
                endpoint = 'http://localhost:5000/verifyWaterLogging';
            } else {
                endpoint = 'http://localhost:5000/verifyPothole'; // default
            }

            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        image: base64Image,
                        email: email
                    })
                });

                const data = await response.json();
                console.log("API Response:", data);

                if (!data.success) {
                    alert(data.message || "Something went wrong.");
                    return;
                }

                const confirmProceed = confirm("Image is clear. Do you want to proceed?");
                if (!confirmProceed) return;

                // Check result depending on complaint type
                if (complaintType.toLowerCase() === 'waterlogging') {
                    if (data.isWaterLogged) {
                        alert("✅ Water logging detected! Submitting complaint automatically.");

                        const complaintName = 'water logging';
                        const complaintDescription = 'Detected water logging via uploaded image.';

                        // Submit complaint to backend via fetch
                        submitToBackend(complaintName, complaintDescription, base64Image);
                    } else {
                        alert("❌ No water logging detected. Please try again with a clearer image.");
                    }
                } else {
                    if (data.isPothole) {
                        alert("✅ Pothole detected! Submitting complaint automatically.");

                        const complaintName = 'pothole';
                        const complaintDescription = 'Detected pothole via uploaded image.';

                        // Submit complaint to backend via fetch
                        submitToBackend(complaintName, complaintDescription, base64Image);
                    } else {
                        alert("❌ No pothole detected. Please try again with a clearer image.");
                    }
                }
            } catch (error) {
                console.error("Upload error:", error);
                alert("Failed to process image. Please try again.");
            }
        };

        reader.readAsDataURL(file);
    };

    fileInput.click();
}





// Function to go back to the complaint form from logged complaints
function backToMain() {
    // Check if logged complaints section is visible
    if (!document.getElementById('logged-complaints').classList.contains('hidden')) {
        // Hide the logged complaints section and show the complaint form
        document.getElementById('logged-complaints').classList.add('hidden');
        document.getElementById('complaint-form').classList.remove('hidden'); // Show complaint form

        // Clear any data in the logged complaints table
        document.getElementById('logged-complaints-body').innerHTML = '';
    } else {
        // If not coming from logged complaints, go back to the home page
        document.getElementById('options-frame').classList.add('hidden');
        document.getElementById('form-container').classList.add('hidden');
        document.getElementById('role-selection').classList.remove('hidden');
        document.getElementById('home-frame').classList.remove('hidden');
        resetForms();
    }
}


// Reset all forms
function resetForms() {
    document.getElementById('login-form').reset();
    document.getElementById('register-form').reset();
    document.getElementById('forgot-password-form').reset();
    document.getElementById('complaint-form').reset();
}

// Function to fetch complaints from the server and display them on the dashboard
function loadMunicipalDashboard() {
    fetch('http://localhost:3000/complaints')
        .then(response => response.json())
        .then(complaints => {
            const municipalTableBody = document.getElementById('municipal-complaints-table-body');
            municipalTableBody.innerHTML = '';

            let srNo = 1;
            let groupedComplaints = {};

            // Group complaints by type and location
            complaints.forEach(complaint => {
                const key = `${complaint.name}-${complaint.location}`;
                if (!groupedComplaints[key]) {
                    groupedComplaints[key] = [];
                }
                groupedComplaints[key].push(complaint);
            });

            // Sort groups with most duplicates appearing first
            const sortedGroups = Object.entries(groupedComplaints).sort((a, b) => b[1].length - a[1].length);

            sortedGroups.forEach(([key, group]) => {
                const serialNumber = srNo++; // Assign the same serial number to all complaints in the group

                group.forEach((complaint, index) => {
                    let formattedDate = new Date(complaint.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

                    // Calculate time remaining
                    let timeRemaining = "N/A";
                    if (complaint.deadline) {
                        const deadline = new Date(complaint.deadline);
                        const now = new Date();
                        const timeDiff = deadline - now;

                        if (timeDiff > 0) {
                            const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                            const hoursLeft = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            timeRemaining = `${daysLeft} days & ${hoursLeft} hours left`;
                        } else {
                            timeRemaining = "Expired";
                        }
                    }

                    // Extract and format latitude & longitude
                    let locationLink = "N/A";
                    if (complaint.location) {
                        const locationMatch = complaint.location.match(/Lat: ([\d.-]+), Lon: ([\d.-]+)/);
                        if (locationMatch) {
                            const latitude = locationMatch[1];
                            const longitude = locationMatch[2];
                            locationLink = `<a href="https://www.google.com/maps?q=${latitude},${longitude}" target="_blank">Lat: ${latitude}, Lon: ${longitude}</a>`;
                        }
                    }

                    const row = `<tr ${index === 0 ? 'style="border-top: 3px solid red;"' : ''}>
                        <td>${serialNumber}</td> <!-- Same Serial Number for Grouped Complaints -->
                        <td>${complaint.name}</td> <!-- Complaint Name -->
                        <td>${complaint.description}</td> <!-- Description -->
                        <td>${complaint.status}</td> <!-- Status -->
                        <td>${formattedDate}</td> <!-- Created At -->
                        <td>${timeRemaining}</td> <!-- Time Remaining -->
                        <td>${locationLink}</td> <!-- Clickable Latitude & Longitude -->
                        <td>
                            <img src="${complaint.image}" alt="Complaint Image" style="width: 100px; height: auto; cursor: pointer;"
                                 onclick="window.open('${complaint.image}', '_blank')">
                        </td> <!-- Image -->
                        <td>
                            ${complaint.status !== 'Solved' ? `<button data-complaint-id="${complaint._id}" onclick="markAsSolved('${complaint._id}')">Mark as Solved</button>` : ''}
                        </td> <!-- Actions -->
                    </tr>`;

                    municipalTableBody.innerHTML += row;
                });
            });
        })
        .catch(error => {
            console.error('Error fetching complaints:', error);
            alert('Failed to load complaints');
        });
}



// Load complaints when the dashboard is displayed
document.addEventListener('DOMContentLoaded', loadMunicipalDashboard);

// Show logged complaints section for end-user
function showLoggedComplaints() {
    document.getElementById('complaint-form').classList.add('hidden'); // Hide complaint form
    document.getElementById('logged-complaints').classList.remove('hidden'); // Show logged complaints section

    // Fetch and display logged complaints
    fetch('http://localhost:3000/complaints')
        .then(response => response.json())
        .then(complaints => {
            const loggedComplaintsBody = document.getElementById('logged-complaints-body');
            loggedComplaintsBody.innerHTML = ''; // Clear previous entries

            complaints.forEach(complaint => {
                const row = `<tr>
                    <td>${complaint.name}</td>
                    <td>${complaint.description}</td>
                    <td>${complaint.status}</td>
                    <td>${new Date(complaint.createdAt).toLocaleString()}</td>
                </tr>`;
                loggedComplaintsBody.innerHTML += row; // Append row to table body
            });
        })
        .catch(error => {
            console.error('Error fetching complaints:', error);
            alert('Failed to load previous complaints');
        });
}

function submitImage(event) {
    event.preventDefault();

    const imageInput = document.getElementById('image');
    const file = imageInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = async function (e) {
            const imageData = e.target.result; // Encoded image data
            const complaintType = document.getElementById('complaintType').value;

            // Prepare payload with fixed location data
            const data = {
                name: complaintType,
                description: "Sample description", // Update as needed
                status: "Pending",
                createdAt: new Date().toISOString(),
                image: imageData,
                location: "Lat: 19.0673, Lon: 72.9892" // Hardcoded location value
            };

            try {
                const response = await fetch('http://localhost:3000/submitComplaint', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    const result = await response.json();
                    alert('Complaint submitted successfully');
                } else {
                    alert('Failed to submit complaint');
                }
            } catch (error) {
                console.error('Error during submission:', error);
            }
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please upload an image to submit.');
    }
}

// Function to mark complaint as solved (implement as needed)
function markAsSolved(complaintId) {
    fetch(`http://localhost:3000/markAsSolved/${complaintId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Complaint marked as solved') {
            alert('Complaint marked as solved!');

            // Find the button in the document and hide it
            const button = document.querySelector(`button[data-complaint-id="${complaintId}"]`);
            if (button) {
                button.style.display = 'none'; // Hide the button
            }

            // Refresh the municipal dashboard
            loadMunicipalDashboard();
        } else {
            alert(`Failed to mark as solved: ${data.message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while marking the complaint as solved.');
    });
}


// Show image upload option after marking as solved
function showSolvedImageUpload(complaintId) {
    const uploadSection = document.createElement('div');
    uploadSection.innerHTML = `
        <label for="solved-image-${complaintId}">Upload Solved Complaint Image:</label><br>
        <input type="file" id="solved-image-${complaintId}" accept="image/*" onchange="handleSolvedImageUpload(event, ${complaintId})"><br><br>
    `;
    document.getElementById('municipal-dashboard').appendChild(uploadSection);
}

// Handle image upload for solved complaints
function handleSolvedImageUpload(event, complaintId) {
    const file = event.target.files[0];
    if (file) {
        alert(`Image uploaded for complaint ID ${complaintId}`);
        // Here, you could send the image to a server or store it as needed
    } else {
        alert('No image selected.');
    }
}

// Show Higher Authority Notifications
function showHigherAuthorityNotifications() {
    document.getElementById('higher-authority-section').classList.toggle('hidden');
}

// Update the status of a complaint
function updateStatus(id, status) {
    const complaint = complaints.find(c => c.id === id);
    if (complaint) {
        complaint.status = status;
        alert(`Complaint ID ${id} marked as ${status}`);
        loadMunicipalDashboard(); // Reload the dashboard to reflect changes
    }
}

// Call this function on page load
document.addEventListener('DOMContentLoaded', () => {
    populateStates();
    document.getElementById('state').addEventListener('change', populateDistricts);
});

document.getElementById('role').addEventListener('change', function () {
  const selectedRole = this.value;
  updateFormVisibility(selectedRole);
});

document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chat-container");
    const toggleButton = document.getElementById("toggle-chatbot");
    const closeButton = document.getElementById("close-chatbot");

    toggleButton.addEventListener("click", function () {
        chatContainer.style.display = "block"; // Show chatbot
    });

    closeButton.addEventListener("click", function () {
        chatContainer.style.display = "none"; // Hide chatbot
    });
});


poration'
    }
};

const complaints = [
    { id: 1, type: 'Pothole', description: 'Big pothole on Main St.', status: 'Pending', createdAt: '2024-09-20' },
    { id: 2, type: 'Water Logging', description: 'Water logged near the park.', status: 'In Review', createdAt: '2024-09-25' },
    { id: 3, type: 'Streetlight', description: 'Streetlight not working.', status: 'Solved', createdAt: '2024-09-15' },
];

// Populate states in the state dropdown
const statesData = {
    states: [
        { state: "Andhra Pradesh", districts: ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"] },
        { state: "Arunachal Pradesh", districts: ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kurung Kumey", "Lohit", "Lower Subansiri", "Namsai", "Papum Pare", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"] },
        { state: "Assam", districts: ["Baksa", "Barpeta", "Bongaigaon", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Golaghat", "Hailakandi", "Jorhat", "Kamrup", "Karimganj", "Kokrajhar", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "Tinsukia", "Udalguri"] },
        { state: "Bihar", districts: ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Buxar", "Darbhanga", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Supaul", "Vaishali", "West Champaran"] },
        { state: "Chhattisgarh", districts: ["Balod", "Baloda Bazar", "Bastar", "Bemetara", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Korba", "Mahasamund", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"] },
        { state: "Goa", districts: ["North Goa", "South Goa"] },
        { state: "Gujarat", districts: ["Ahmedabad", "Amreli", "Anand", "Banas Kantha", "Bharuch", "Bhavnagar", "Dahod", "Dangs", "Gandhinagar", "Kutch", "Kheda", "Mahisagar", "Mehsana", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Vadodara", "Valsad"] },
        { state: "Haryana", districts: ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Mahendragarh", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"] },
        { state: "Himachal Pradesh", districts: ["Bilaspur", "Chamba", "Dharamshala", "Hamirpur", "Kinnaur", "Kullu", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"] },
        { state: "Jharkhand", districts: ["Bokaro", "Chatra", "Dhanbad", "Dumka", "East Singhbhum", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"] },
        { state: "Karnataka", districts: ["Bagalkot", "Bangalore Rural", "Bangalore Urban", "Belgaum", "Bellary", "Bidar", "Chamarajanagar", "Chikballapur", "Chikmagalur", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysore", "Raichur", "Ramanagara", "Shivamogga", "Tumkur", "Udupi", "Uttara Kannada", "Yadgir"] },
        { state: "Kerala", districts: ["Alappuzha", "Ernakulam", "Idukki", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"] },
        { state: "Madhya Pradesh", districts: ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Shahdol", "Shajapur", "Sheopur", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"] },
        { state: "Maharashtra", districts: ["Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalna", "Jalgaon", "Kolhapur", "Latur", "Mumbai", "Nagpur", "Nanded", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"] },
        { state: "Manipur", districts: ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Senapati", "Tamenglong", "Thoubal", "Ukhrul"] },
        { state: "Meghalaya", districts: ["East Garo Hills", "East Khasi Hills", "Jaintia Hills", "North Garo Hills", "South Garo Hills", "West Garo Hills", "West Khasi Hills"] },
        { state: "Mizoram", districts: ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"] },
        { state: "Nagaland", districts: ["Dimapur", "Kiphire", "Longleng", "Mokokchung", "Mon", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"] },
        { state: "Odisha", districts: ["Angul", "Baleswar", "Bargarh", "Bhadrak", "Bolangir", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khurda", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Sonepur", "Jagatsinghpur", "Dhenkanal", "Cuttack", "Ganjam", "Gajapati", "Koraput", "Mayurbhanj", "Bolangir"] },
        { state: "Punjab", districts: ["Amritsar", "Barnala", "Bathinda", "Fatehgarh Sahib", "Fazilka", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Pathankot", "Patiala", "Rupnagar", "Sangrur", "SAS Nagar"] },
        { state: "Rajasthan", districts: ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Jaipur", "Jaisalmer", "Jalore", "Jhunjhunu", "Jodhpur", "Karauli", "Nagaur", "Pali", "Rajsamand", "Sawai Madhopur", "Sikar", "Tonk", "Udaipur"] },
        { state: "Sikkim", districts: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"] },
        { state: "Tamil Nadu", districts: ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Salem", "Sivagangai", "Tenkasi", "Thanjavur", "Theni", "Tirunelveli", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Vellore", "Virudhunagar"] },
        { state: "Telangana", districts: ["Adilabad", "Hyderabad", "Karimnagar", "Khammam", "Mahbubnagar", "Medak", "Nalgonda", "Nizamabad", "Ranga Reddy", "Warangal"] },
        { state: "Tripura", districts: ["Dhalai", "Gomati", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"] },
        { state: "Uttar Pradesh", districts: ["Agra", "Aligarh", "Allahabad", "Ambedkar Nagar", "Auraiya", "Azamgarh", "Badaun", "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Bijnor", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", "Hamirpur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Jhansi", "Kannauj", "Kanpur Nagar", "Kanpur Dehat", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerat", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Raebareli", "Rampur", "Saharanpur", "Shahjahanpur", "Shrawasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi", "Vichedia"] },
        { state: "Uttarakhand", districts: ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"] },
        { state: "West Bengal", districts: ["Alipurduar", "Bankura", "Birbhum", "Burdwan", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Malda", "Medinipur", "Murshidabad", "Nadia", "North 24 Parganas", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"] },
    ]
};

// Declare the verification code variable
const verificationCode = 6978;

// Populate states
function populateStates() {
    const stateInput = document.getElementById('state');
    stateInput.innerHTML = '<option value="">Select a state</option>';
    statesData.states.forEach(state => {
        const option = document.createElement('option');
        option.value = state.state;
        option.textContent = state.state;
        stateInput.appendChild(option);
    });
}

// Populate districts
function populateDistricts() {
    const stateInput = document.getElementById('state');
    const districtInput = document.getElementById('district');
    const selectedState = stateInput.value;

    const stateData = statesData.states.find(state => state.state === selectedState);
    if (stateData) {
        districtInput.innerHTML = '<option value="">Select a district</option>';
        stateData.districts.forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district;
            districtInput.appendChild(option);
        });
    }
}

// Show login or register options
function showOptions(actionType) {
    selectedAction = actionType;
    document.getElementById('home-frame').classList.add('hidden');
    document.getElementById('options-frame').classList.remove('hidden');
    if (actionType === 'login') {
        document.getElementById('role-selection').classList.remove('hidden'); // Show role selection for login
        document.getElementById('action-title').textContent = 'Login';
    } else {
        document.getElementById('role-selection').classList.add('hidden'); // Hide role selection for register
        document.getElementById('action-title').textContent = 'Register';
        document.getElementById('form-container').classList.remove('hidden');
        document.getElementById('register-form').classList.remove('hidden');
        document.getElementById('login-form').classList.add('hidden');
    }
}


// Show form based on role
function showForm(role, formType) {
    const roleTitle = role === 'end-user' ? 'End User' : 'Municipal Corporation';
    document.getElementById('action-title').textContent = `${formType.charAt(0).toUpperCase() + formType.slice(1)} as ${roleTitle}`;

    document.getElementById('role-selection').classList.add('hidden');
    document.getElementById('form-container').classList.remove('hidden');

    document.getElementById('login-form').classList.toggle('hidden', formType !== 'login');
    document.getElementById('register-form').classList.toggle('hidden', formType !== 'register');
    document.getElementById('forgot-password-form').classList.add('hidden');
    document.getElementById('complaint-form').classList.toggle('hidden', formType !== 'complaint');

    // Show the "Previously Lodged Complaints" button only if showing the complaint form
    const complaintsButton = document.getElementById('logged-complaints-button-container');
    if (formType === 'complaint') {
        complaintsButton.classList.remove('hidden');
    } else {
        complaintsButton.classList.add('hidden');
    }

    updateFormVisibility(role);
}


document.getElementById('role').addEventListener('change', function () {
    const selectedRole = this.value;
    updateFormVisibility(selectedRole);
});

function updateFormVisibility(role) {
    const verificationCodeField = document.getElementById('verification-code');
    const verificationCodeLabel = document.getElementById('verification-code-label'); // Ensure label has an ID
    const securityQuestionSelect = document.getElementById('security-question');

    if (role === 'End User') {
        // Hide the verification code field for End Users
        verificationCodeField.style.display = 'none';
        verificationCodeLabel.style.display = 'none';

        // Set end-user specific security questions
        securityQuestionSelect.innerHTML = `
            <option value="">Select a question</option>
            <option value="favorite-color">What is your favorite color?</option>
            <option value="pet-name">What is your pet's name?</option>
            <option value="birth-city">What city were you born in?</option>
        `;
    } else if (role === 'Municipal Corporation') {
        // Show the verification code field for Municipal Corporation
        verificationCodeField.style.display = 'block';
        verificationCodeLabel.style.display = 'block';

        // Set municipal corporation-specific security questions
        securityQuestionSelect.innerHTML = `
            <option value="">Select a question</option>
            <option value="municipal-name">What is the name of your municipal corporation?</option>
            <option value="department">What department do you work in?</option>
            <option value="last-meeting">What was the date of your last municipal meeting?</option>
            <option value="office-address">What is the address of your municipal office?</option>
            <option value="mayor">Who is the current mayor of your municipality?</option>
        `;
    } else {
        // Default case: hide verification code and reset security questions
        verificationCodeField.style.display = 'none';
        verificationCodeLabel.style.display = 'none';
        securityQuestionSelect.innerHTML = `<option value="">Select a question</option>`;
    }
}

function toggleVerificationCode() {
    const roleSelect = document.getElementById('role');
    const verificationCodeInput = document.getElementById('verification-code');
    const verificationCodeLabel = document.getElementById('verification-code-label');

    if (roleSelect.value === 'Municipal Corporation') {
        verificationCodeInput.style.display = 'block'; // Show the input
        verificationCodeLabel.style.display = 'block'; // Show the label
    } else {
        verificationCodeInput.style.display = 'none'; // Hide the input
        verificationCodeLabel.style.display = 'none'; // Hide the label
    }
}

function registerUser(event) {
    event.preventDefault(); // Prevent the form from reloading the page
    // Get values from the form fields
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const state = document.getElementById('state').value;
    const district = document.getElementById('district').value;
    const selectedQuestion = document.getElementById('security-question').value;
    const answer = document.getElementById('security-answer').value;
    const role = document.getElementById('role').value;
    const enteredCode = parseInt(document.getElementById('verification-code').value); // For Municipal Corporation

    // Additional password validation
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(password)) {
        alert('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
        return;
    }

    const userData = {
        email: email,
        password: password,
        state: state,
        district: district,
        securityQuestion: selectedQuestion,
        securityAnswer: answer,
        role: role,
        verificationCode: enteredCode
    };

    fetch('http://localhost:3000/registerUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful!');
            backToMain(); // Navigate back after successful registration
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to register user.');
    });
}


function registerMunicipal(event) {
    event.preventDefault();

    const email = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const enteredCode = parseInt(document.getElementById('verification-code').value); // Convert entered code to a number

    // Check if the entered verification code matches the predefined code
    if (enteredCode === verificationCode) { // Now comparing two numbers
        if (email && password) {
            usersData[email] = {
                password: password,
                role: 'Municipal Corporation'
            };
            alert('Registration successful as Municipal Corporation!');
            backToMain();
        } else {
            alert('Please fill in all the required fields.');
        }
    } else {
        alert('Verification code does not match. Please contact the owner of this portal.');
    }
}

function loginUser(event) {
  event.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  const loginData = {
    email: username,
    password: password
  };

  fetch('http://localhost:3000/loginUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      const role = data.user.role; // Get the role of the user
      const userEmail = data.user.email; // Get user email from response

      // ✅ Store email in localStorage after successful login
      localStorage.setItem("userEmail", userEmail);

      if (role === 'End User') {
        showForm('end-user', 'complaint'); // Show complaint form for End Users
      } else if (role === 'Municipal Corporation') {
        document.getElementById('home-frame').classList.add('hidden');
        document.getElementById('options-frame').classList.add('hidden');
        document.getElementById('municipal-dashboard').classList.remove('hidden');
        loadMunicipalDashboard(); // Call function to load complaints in the dashboard
      }
    } else {
      alert('Invalid username or password.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Failed to login.');
  });
}


// Show forgot password form
function showForgotPassword() {
    const username = document.getElementById('login-username').value;

    if (username in usersData) {
        const selectedQuestionKey = usersData[username].securityQuestion;
        let questionText;

        switch (selectedQuestionKey) {
            case 'food':
                questionText = 'What is your favorite food?';
                break;
            case 'sport':
                questionText = 'What is your favorite sport?';
                break;
            case 'birthplace':
                questionText = 'Where were you born?';
                break;
            case 'firstjob':
                questionText = 'Which company did you first join?';
                break;
            case 'mothermaiden':
                questionText = 'What is your mother\'s maiden name?';
                break;
            case 'school':
                questionText = 'What was the name of your primary school?';
                break;
            default:
                questionText = 'Security question not found.';
                break;
        }

        document.getElementById('reset-username').value = username;
        document.getElementById('reset-question').textContent = questionText;

        document.getElementById('login-form').classList.add('hidden');
        document.getElementById('register-form').classList.add('hidden');
        document.getElementById('forgot-password-form').classList.remove('hidden');
    } else {
        alert('Username not found. Please enter a valid username.');
    }
}

// Show password during reset
function showPassword(event) {
    event.preventDefault();

    const username = document.getElementById('reset-username').value;
    const answer = document.getElementById('reset-answer').value;

    if (username in usersData && usersData[username].securityAnswer === answer) {
        alert(`Your password is: ${usersData[username].password}`);
        backToMain();
    } else {
        alert('Incorrect answer. Please try again.');
    }
}

function submitComplaint(event) {
    event.preventDefault(); // Prevent default form submission

    const complaintName = document.getElementById('complaint-name').value;
    const complaintDescription = document.getElementById('complaint-description').value;
    const video = document.getElementById('video');

    // Retrieve video frame
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg');

    // Step for Blurriness detection
    const variance = detectBlurriness(imageData);

    if (variance < 100) {
        alert('The captured image is blurred. Please retake the photo.');
        return;
    }

    // Only proceed with pothole detection if "Pothole" is selected
    if (complaintName === "pothole") {
        const userEmail = localStorage.getItem("userEmail"); // Ensure user is logged in
        let failedAttempts = parseInt(localStorage.getItem(`failedAttempts_${userEmail}`) || "0");

        fetch('http://localhost:3000/verifyPothole', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: imageData, email: userEmail }) // Including user email
        })
        .then(response => response.json())
        .then(data => {
            if (data.isPothole) {
                alert('\u2705 Pothole detected! Proceeding with complaint submission.');
                submitToBackend(complaintName, complaintDescription, imageData); // Submit complaint
            } else {
                failedAttempts++;
                localStorage.setItem(`failedAttempts_${userEmail}`, failedAttempts); // Increment failed attempts
                if (failedAttempts >= 3) {
                    alert("Max attempts reached! You are blocked for 24 hours.");
                    // Additional logic to block the user for 24 hours can be added here
                } else {
                    alert(`\u26a0 No pothole detected. Attempt ${failedAttempts}/3.`);
                }
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error in pothole detection.');
        });
    } else {
        // For other complaint types, submit directly
        submitToBackend(complaintName, complaintDescription, imageData);
    }
}

// Function to submit complaint to backend
function submitToBackend(complaintName, complaintDescription, imageData) {
    fetch('http://localhost:3000/submitComplaint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: complaintName,
            description: complaintDescription,
            status: 'Pending',
            createdAt: new Date().toISOString(),
            image: imageData
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        console.log('Complaint submitted:', data.result);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to submit the complaint.');
    });
}


async function verifyPothole(imageData) {
    const email = localStorage.getItem("userEmail");

    let response = await fetch("http://localhost:3000/verifyPothole", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData, email })
    });

    let data = await response.json();
   
    if (!data.success) {
        alert(data.message);
        return;
    }

    if (!data.isPothole) {
        let failedAttempts = parseInt(localStorage.getItem("failedAttempts") || "0") + 1;
        localStorage.setItem("failedAttempts", failedAttempts);

        if (failedAttempts >= 3) {
            localStorage.setItem("blockTime", Date.now());  // Set block time
            alert("Max attempts reached! You are blocked for 24 hours.");
        } else {
            alert(`Failed attempt ${failedAttempts}/3. Try again.`);
        }
    } else {
        localStorage.setItem("failedAttempts", "0");  // Reset on success
    }
}



// Function to show the complaint registration form
function showComplaintForm() {
    document.getElementById('complaint-form').classList.remove('hidden');
    document.getElementById('logged-complaints').classList.add('hidden');
}

// Function to show the logged complaints section
function showLoggedComplaints() {
    // Hide the complaint form and show the logged complaints section
    document.getElementById('complaint-form').classList.add('hidden');
    document.getElementById('logged-complaints').classList.remove('hidden');

    // Call function to fetch and display logged complaints from the server
    displayLoggedComplaints();
}

// Function to fetch and display logged complaints
function displayLoggedComplaints() {
    fetch('http://localhost:3000/complaints') // Fetch complaints from your server
        .then(response => response.json())
        .then(complaints => {
            const loggedComplaintsBody = document.getElementById('logged-complaints-body');
            loggedComplaintsBody.innerHTML = ''; // Clear previous entries

            complaints.forEach((complaint, index) => {
                const row = `<tr>
                    <td>${complaint.name}</td>
                    <td>${complaint.description}</td>
                    <td>${complaint.status}</td>
                    <td>${new Date(complaint.createdAt).toLocaleString()}</td>
                </tr>`;
                loggedComplaintsBody.innerHTML += row; // Append row to table body
            });
        })
        .catch(error => {
            console.error('Error fetching complaints:', error);
            alert('Failed to load previous complaints');
        });
}


// Open camera
function openCamera() {
    const cameraContainer = document.getElementById('camera-container');
    cameraContainer.classList.remove('hidden');

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            const video = document.getElementById('video');
            video.srcObject = stream;
            video.play();
        })
        .catch(err => {
            alert('Unable to access camera: ' + err);
        });
}


function capture() {
    let userEmail = localStorage.getItem("userEmail");

    if (!userEmail || userEmail.trim() === "") {
        alert("User not logged in. Please log in to continue.");
        return;
    }

    let failedAttempts = parseInt(localStorage.getItem(`failedAttempts_${userEmail}`) || "0");
    let blockTime = localStorage.getItem(`blockTime_${userEmail}`);

    if (blockTime && Date.now() - parseInt(blockTime) < 24 * 60 * 60 * 1000) {
        alert("Max attempts reached! You are blocked for 24 hours.");
        return;
    }

    if (failedAttempts >= 3) {
        localStorage.setItem(`blockTime_${userEmail}`, Date.now());
        alert("Max attempts reached! You are blocked for 24 hours.");
        return;
    }

    const video = document.getElementById("video");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const variance = detectBlurriness(imageData.data);

    if (variance < 100) {
        alert("The captured image is blurred. Please retake the photo.");
        return;
    }

    const complaintType = document.getElementById("complaint-name").value;
    const imageDataURL = canvas.toDataURL("image/jpeg");

    const confirmClearImage = confirm(`The image is clear. Do you want to proceed with ${complaintType} detection?`);
    if (!confirmClearImage) {
        alert("You chose not to proceed with detection.");
        return;
    }

    if (complaintType === "pothole") {
        fetch("http://localhost:3000/verifyPothole", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: imageDataURL, email: userEmail })
        })
        .then(response => response.json())
        .then(data => {
            if (data.isPothole) {
                alert("✅ Pothole detected! Proceeding with complaint submission.");
                localStorage.setItem(`failedAttempts_${userEmail}`, "0");
            } else {
                failedAttempts++;
                localStorage.setItem(`failedAttempts_${userEmail}`, failedAttempts);

                if (failedAttempts >= 3) {
                    localStorage.setItem(`blockTime_${userEmail}`, Date.now());
                    alert("Max attempts reached! You are blocked for 24 hours.");
                } else {
                    alert(`⚠️ No pothole detected. Failed attempt ${failedAttempts}/3.`);
                }
            }
        })
        .catch(error => console.error("Error:", error));
    }
}



// Function to detect blurriness
function detectBlurriness(imageData) {
    const grayData = [];
    const width = Math.sqrt(imageData.length / 4);
    const height = width; // Assuming square image

    // Convert to grayscale
    for (let i = 0; i < imageData.length; i += 4) {
        const gray = 0.299 * imageData[i] + 0.587 * imageData[i + 1] + 0.114 * imageData[i + 2];
        grayData.push(gray);
    }

    // Laplacian variance calculation
    const laplacianData = [];
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const i = y * width + x;
            const laplacian = (
                -grayData[i - width - 1] - grayData[i - width] - grayData[i - width + 1] +
                -grayData[i - 1] + 8 * grayData[i] - grayData[i + 1] +
                -grayData[i + width - 1] - grayData[i + width] - grayData[i + width + 1]
            );
            laplacianData.push(laplacian);
        }
    }

    // Calculate variance of Laplacian
    const mean = laplacianData.reduce((sum, value) => sum + value, 0) / laplacianData.length;
    const variance = laplacianData.reduce((sum, value) => sum + (value - mean) ** 2, 0) / laplacianData.length;

    return variance; // Return the calculated variance
}

// Function to go back to the complaint form from logged complaints
function backToMain() {
    // Check if logged complaints section is visible
    if (!document.getElementById('logged-complaints').classList.contains('hidden')) {
        // Hide the logged complaints section and show the complaint form
        document.getElementById('logged-complaints').classList.add('hidden');
        document.getElementById('complaint-form').classList.remove('hidden'); // Show complaint form

        // Clear any data in the logged complaints table
        document.getElementById('logged-complaints-body').innerHTML = '';
    } else {
        // If not coming from logged complaints, go back to the home page
        document.getElementById('options-frame').classList.add('hidden');
        document.getElementById('form-container').classList.add('hidden');
        document.getElementById('role-selection').classList.remove('hidden');
        document.getElementById('home-frame').classList.remove('hidden');
        resetForms();
    }
}


// Reset all forms
function resetForms() {
    document.getElementById('login-form').reset();
    document.getElementById('register-form').reset();
    document.getElementById('forgot-password-form').reset();
    document.getElementById('complaint-form').reset();
}

// Function to fetch complaints from the server and display them on the dashboard
function loadMunicipalDashboard() {
    fetch('http://localhost:3000/complaints')
        .then(response => response.json())
        .then(complaints => {
            const municipalTableBody = document.getElementById('municipal-complaints-table-body');
            municipalTableBody.innerHTML = '';

            let srNo = 1;
            let groupedComplaints = {};

            // Group complaints by type and location
            complaints.forEach(complaint => {
                const key = `${complaint.name}-${complaint.location}`;
                if (!groupedComplaints[key]) {
                    groupedComplaints[key] = [];
                }
                groupedComplaints[key].push(complaint);
            });

            // Sort groups with most duplicates appearing first
            const sortedGroups = Object.entries(groupedComplaints).sort((a, b) => b[1].length - a[1].length);

            sortedGroups.forEach(([key, group]) => {
                const serialNumber = srNo++; // Assign the same serial number to all complaints in the group

                group.forEach((complaint, index) => {
                    let formattedDate = new Date(complaint.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

                    // Calculate time remaining
                    let timeRemaining = "N/A";
                    if (complaint.deadline) {
                        const deadline = new Date(complaint.deadline);
                        const now = new Date();
                        const timeDiff = deadline - now;

                        if (timeDiff > 0) {
                            const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                            const hoursLeft = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                            timeRemaining = `${daysLeft} days & ${hoursLeft} hours left`;
                        } else {
                            timeRemaining = "Expired";
                        }
                    }

                    // Extract and format latitude & longitude
                    let locationLink = "N/A";
                    if (complaint.location) {
                        const locationMatch = complaint.location.match(/Lat: ([\d.-]+), Lon: ([\d.-]+)/);
                        if (locationMatch) {
                            const latitude = locationMatch[1];
                            const longitude = locationMatch[2];
                            locationLink = `<a href="https://www.google.com/maps?q=${latitude},${longitude}" target="_blank">Lat: ${latitude}, Lon: ${longitude}</a>`;
                        }
                    }

                    const row = `<tr ${index === 0 ? 'style="border-top: 3px solid red;"' : ''}>
                        <td>${serialNumber}</td> <!-- Same Serial Number for Grouped Complaints -->
                        <td>${complaint.name}</td> <!-- Complaint Name -->
                        <td>${complaint.description}</td> <!-- Description -->
                        <td>${complaint.status}</td> <!-- Status -->
                        <td>${formattedDate}</td> <!-- Created At -->
                        <td>${timeRemaining}</td> <!-- Time Remaining -->
                        <td>${locationLink}</td> <!-- Clickable Latitude & Longitude -->
                        <td>
                            <img src="${complaint.image}" alt="Complaint Image" style="width: 100px; height: auto; cursor: pointer;"
                                 onclick="window.open('${complaint.image}', '_blank')">
                        </td> <!-- Image -->
                        <td>
                            ${complaint.status !== 'Solved' ? `<button data-complaint-id="${complaint._id}" onclick="markAsSolved('${complaint._id}')">Mark as Solved</button>` : ''}
                        </td> <!-- Actions -->
                    </tr>`;

                    municipalTableBody.innerHTML += row;
                });
            });
        })
        .catch(error => {
            console.error('Error fetching complaints:', error);
            alert('Failed to load complaints');
        });
}



// Load complaints when the dashboard is displayed
document.addEventListener('DOMContentLoaded', loadMunicipalDashboard);

// Show logged complaints section for end-user
function showLoggedComplaints() {
    document.getElementById('complaint-form').classList.add('hidden'); // Hide complaint form
    document.getElementById('logged-complaints').classList.remove('hidden'); // Show logged complaints section

    // Fetch and display logged complaints
    fetch('http://localhost:3000/complaints')
        .then(response => response.json())
        .then(complaints => {
            const loggedComplaintsBody = document.getElementById('logged-complaints-body');
            loggedComplaintsBody.innerHTML = ''; // Clear previous entries

            complaints.forEach(complaint => {
                const row = `<tr>
                    <td>${complaint.name}</td>
                    <td>${complaint.description}</td>
                    <td>${complaint.status}</td>
                    <td>${new Date(complaint.createdAt).toLocaleString()}</td>
                </tr>`;
                loggedComplaintsBody.innerHTML += row; // Append row to table body
            });
        })
        .catch(error => {
            console.error('Error fetching complaints:', error);
            alert('Failed to load previous complaints');
        });
}

function submitImage(event) {
    event.preventDefault();

    const imageInput = document.getElementById('image');
    const file = imageInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = async function (e) {
            const imageData = e.target.result; // Encoded image data
            const complaintType = document.getElementById('complaintType').value;

            // Prepare payload with fixed location data
            const data = {
                name: complaintType,
                description: "Sample description", // Update as needed
                status: "Pending",
                createdAt: new Date().toISOString(),
                image: imageData,
                location: "Lat: 19.0673, Lon: 72.9892" // Hardcoded location value
            };

            try {
                const response = await fetch('http://localhost:3000/submitComplaint', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    const result = await response.json();
                    alert('Complaint submitted successfully');
                } else {
                    alert('Failed to submit complaint');
                }
            } catch (error) {
                console.error('Error during submission:', error);
            }
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please upload an image to submit.');
    }
}

// Function to mark complaint as solved (implement as needed)
function markAsSolved(complaintId) {
    fetch(`http://localhost:3000/markAsSolved/${complaintId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Complaint marked as solved') {
            alert('Complaint marked as solved!');

            // Find the button in the document and hide it
            const button = document.querySelector(`button[data-complaint-id="${complaintId}"]`);
            if (button) {
                button.style.display = 'none'; // Hide the button
            }

            // Refresh the municipal dashboard
            loadMunicipalDashboard();
        } else {
            alert(`Failed to mark as solved: ${data.message}`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while marking the complaint as solved.');
    });
}


// Show image upload option after marking as solved
function showSolvedImageUpload(complaintId) {
    const uploadSection = document.createElement('div');
    uploadSection.innerHTML = `
        <label for="solved-image-${complaintId}">Upload Solved Complaint Image:</label><br>
        <input type="file" id="solved-image-${complaintId}" accept="image/*" onchange="handleSolvedImageUpload(event, ${complaintId})"><br><br>
    `;
    document.getElementById('municipal-dashboard').appendChild(uploadSection);
}

// Handle image upload for solved complaints
function handleSolvedImageUpload(event, complaintId) {
    const file = event.target.files[0];
    if (file) {
        alert(`Image uploaded for complaint ID ${complaintId}`);
        // Here, you could send the image to a server or store it as needed
    } else {
        alert('No image selected.');
    }
}

// Show Higher Authority Notifications
function showHigherAuthorityNotifications() {
    document.getElementById('higher-authority-section').classList.toggle('hidden');
}

// Update the status of a complaint
function updateStatus(id, status) {
    const complaint = complaints.find(c => c.id === id);
    if (complaint) {
        complaint.status = status;
        alert(`Complaint ID ${id} marked as ${status}`);
        loadMunicipalDashboard(); // Reload the dashboard to reflect changes
    }
}

// Call this function on page load
document.addEventListener('DOMContentLoaded', () => {
    populateStates();
    document.getElementById('state').addEventListener('change', populateDistricts);
});

document.getElementById('role').addEventListener('change', function () {
  const selectedRole = this.value;
  updateFormVisibility(selectedRole);
});

document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chat-container");
    const toggleButton = document.getElementById("toggle-chatbot");
    const closeButton = document.getElementById("close-chatbot");

    toggleButton.addEventListener("click", function () {
        chatContainer.style.display = "block"; // Show chatbot
    });

    closeButton.addEventListener("click", function () {
        chatContainer.style.display = "none"; // Hide chatbot
    });
});
