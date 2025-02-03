const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer"); // Import nodemailer

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const tempUserData = {};

// Create MySQL connection pool for better scalability
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "shieldsociety",
});

// Function to handle common database queries with error handling
const dbQuery = (query, values) => {
  return new Promise((resolve, reject) => {
    db.query(query, values, (error, results) => {
      if (error) {
        console.error("Database query error:", error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// Function to generate a random verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit code
};

// Function to send verification email
const sendVerificationEmail = async (email, code) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, // Add your email here
      pass: process.env.EMAIL_PASS, // Add your email password here
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Verification Code",
    html: `<p>Your verification code is: <strong>${code}</strong></p>`,
  };

  return transporter.sendMail(mailOptions);
};

// Route for student signup
app.post("/signup/student", async (req, res) => {
  const {
    firstName,
    lastName,
    middleName,
    gender,
    role,
    programYearAndSection,
    month,
    day,
    year,
    address,
    studentNumber,
    contactNumber,
    guardiansFullName,
    guardiansNumber,
    email,
    password,
  } = req.body;

  try {
    // Validate required fields for students
    if (
      !firstName ||
      !lastName ||
      !gender ||
      !role ||
      !programYearAndSection ||
      !month ||
      !day ||
      !year ||
      !address ||
      !studentNumber ||
      !contactNumber ||
      !guardiansFullName ||
      !guardiansNumber ||
      !email ||
      !password
    ) {
      return res.status(400).send("All fields are required for student signup.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a birthdate string
    const birthdate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

    // Generate and hash the verification code
    const verificationCode = generateVerificationCode();
    const hashedVerificationCode = await bcrypt.hash(verificationCode, 10);

    // Store the user's info temporarily
    tempUserData[email] = {
      firstName,
      lastName,
      middleName,
      gender,
      role,
      programYearAndSection,
      birthdate,
      address,
      studentNumber,
      contactNumber,
      guardiansFullName,
      guardiansNumber,
      email,
      hashedPassword,
      verificationCode: hashedVerificationCode,
    };

    console.log("Temporary user data stored (student):", tempUserData[email]);

    // Send verification email
    sendVerificationEmail(email, verificationCode)
      .then(() => console.log("Verification email sent to:", email))
      .catch((err) => console.error("Error sending email:", err));

    res.status(200).send("Verification email sent, please check your inbox!");
  } catch (error) {
    console.error("Error during student signup:", error);
    res.status(500).send("Error creating student account");
  }
});

// Route for adviser/other signup
app.post("/signup/adviserorother", async (req, res) => {
  const {
    firstName,
    lastName,
    middleName,
    gender,
    role,
    month,
    day,
    year,
    address,
    contactNumber,
    email,
    password,
  } = req.body;

  try {
    // Validate required fields for advisers/others
    if (
      !firstName ||
      !lastName ||
      !gender ||
      !role ||
      !month ||
      !day ||
      !year ||
      !address ||
      !contactNumber ||
      !email ||
      !password
    ) {
      return res.status(400).send("All fields are required for adviser/other signup.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a birthdate string
    const birthdate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

    // Generate and hash the verification code
    const verificationCode = generateVerificationCode();
    const hashedVerificationCode = await bcrypt.hash(verificationCode, 10);

    // Store the user's info temporarily
    tempUserData[email] = {
      firstName,
      lastName,
      middleName,
      gender,
      role,
      birthdate,
      address,
      contactNumber,
      email,
      hashedPassword,
      verificationCode: hashedVerificationCode,
    };

    console.log("Temporary user data stored (adviser/other):", tempUserData[email]);

    // Send verification email
    sendVerificationEmail(email, verificationCode)
      .then(() => console.log("Verification email sent to:", email))
      .catch((err) => console.error("Error sending email:", err));

    res.status(200).send("Verification email sent, please check your inbox!");
  } catch (error) {
    console.error("Error during adviser/other signup:", error);
    res.status(500).send("Error creating adviser/other account");
  }
});




// POST route to check availability of username and email
app.post("/check-availability", async (req, res) => {
  const { email } = req.body;

  try {
    // Query to check if the email already exists
    const userCheckQuery = "SELECT * FROM users WHERE email = ?";
    const userCheckValues = [email];

    console.time("Email Check");
    const existingUsers = await dbQuery(userCheckQuery, userCheckValues);
    console.timeEnd("Email Check");

    // Prepare an errors object to store potential error messages
    const errors = {};

    // Check if email exists
    if (existingUsers.some(user => user.email === email)) {
      errors.email = "Email is already taken.";
    }

    // If there are any errors, return them to the client
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    // If no errors, send a success response
    res.status(200).send("Email is available.");
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).send("Error checking email");
  }
});



// POST route to verify the verification code
app.post("/ca-verifycode", async (req, res) => {
  const { verificationCode } = req.body;

  try {
    // Check if any user in temporary storage has the provided verification code
    const foundUserKey = Object.keys(tempUserData).find(async (email) => {
      const user = tempUserData[email];
      return await bcrypt.compare(verificationCode, user.verificationCode);
    });

    if (!foundUserKey) {
      return res
        .status(400)
        .send("No account found with this verification code or invalid code.");
    }

    const foundUser = tempUserData[foundUserKey];

    // Prepare query and values depending on the role
    let insertUserQuery;
    let userValues;

    if (foundUser.role === "student") {
      insertUserQuery = `
        INSERT INTO users (
          first_name, middle_name, last_name, gender, role, programYearAndSection, birthdate, 
          address, student_number, contact_number, guardians_full_name, guardians_number, 
          email, password
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      userValues = [
        foundUser.firstName,
        foundUser.middleName,
        foundUser.lastName,
        foundUser.gender,
        foundUser.role,
        foundUser.programYearAndSection,
        foundUser.birthdate,
        foundUser.address,
        foundUser.studentNumber,
        foundUser.contactNumber,
        foundUser.guardiansFullName,
        foundUser.guardiansNumber,
        foundUser.email,
        foundUser.hashedPassword,
      ];
    } else {
      // Handle adviser/other
      insertUserQuery = `
        INSERT INTO users (
          first_name, middle_name, last_name, gender, role, birthdate, 
          address, contact_number, email, password
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      userValues = [
        foundUser.firstName,
        foundUser.middleName,
        foundUser.lastName,
        foundUser.gender,
        foundUser.role,
        foundUser.birthdate,
        foundUser.address,
        foundUser.contactNumber,
        foundUser.email,
        foundUser.hashedPassword,
      ];
    }

    // Insert the user into the database
    await dbQuery(insertUserQuery, userValues);

    // Remove the user data from temporary storage
    delete tempUserData[foundUser.email];

    console.log("Account created successfully for:", foundUser.email);
    res.status(201).send("Account created successfully!");
  } catch (error) {
    console.error("Error during account creation:", error);
    res.status(500).send("Error creating account");
  }
});



// POST route for user login
app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    // Clean up input
    email = Array.isArray(email) ? email[0] : email;
    password = Array.isArray(password) ? password[0] : password;

    const sql = "SELECT * FROM users WHERE email = ?";
    const userResults = await dbQuery(sql, [email]);

    if (userResults.length > 0) {
      const user = userResults[0];

      // Compare the entered password with the hashed password
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        // Send user details including role and is_member on successful login
        return res.status(200).json({
          message: "Success",
          role: user.role,      // Send role
          is_member: user.is_member,  // Send is_member
        });
      }
    }

    // If user not found or password mismatch, return generic response
    return res.status(401).json("Incorrect email or password.");
  } catch (error) {
    // Handle error
    return res.status(500).json("Internal server error");
  }
});


app.post("/check-email", async (req, res) => {
  const { email } = req.body;

  try {
    const emailCheckQuery = "SELECT * FROM users WHERE email = ?";
    const [existingUsers] = await dbQuery(emailCheckQuery, [email]);

    // Check if result is properly returned and is an array
    if (!existingUsers || existingUsers.length === 0) {
      return res.status(400).json({ error: "This email is not registered." });
    }

    // Respond to the client immediately
    res.status(200).json({ success: true, message: 'Verification process started.' });

    // Generate and send the verification code asynchronously
    const verificationCode = generateVerificationCode();
    tempUserData[email] = { verificationCode }; // Store the code temporarily
    await sendVerificationEmail(email, verificationCode);
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).send("Error checking email");
  }
});



app.post("/fp-verifycode", async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = tempUserData[email];

    if (!user || user.verificationCode !== code) {
      return res.status(400).send("The verification code is incorrect.");
    }

    res.status(200).json({ success: true, message: 'Code verified successfully.' });
  } catch (error) {
    console.error("Error verifying code:", error);
    res.status(500).send("Error verifying the code.");
  }
});

app.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  if (!newPassword) {
    return res.status(400).json({ success: false, error: 'Password is required.' });
  }

  try {
    // Generate salt and hash the password
    const saltRounds = 10; // Adjust rounds as needed for security vs. performance
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the password in the database
    const query = 'UPDATE users SET password = ? WHERE email = ?';
    db.query(query, [hashedPassword, email], (err, result) => {
      if (err) {
        return res.status(500).json({ success: false, error: 'Database error.' });
      }

      if (result.affectedRows > 0) {
        return res.status(200).json({ success: true, message: 'Password reset successfully.' });
      } else {
        return res.status(400).json({ success: false, error: 'Email not found.' });
      }
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ success: false, error: 'Error resetting password.' });
  }
});

// POST route to search for members by name, section, or student number
// POST route to search for members by name, section, or student number
app.post("/search", async (req, res) => {
  const { searchQuery } = req.body;

  try {
    const searchQueryEscaped = `%${searchQuery}%`;
    const sql = `
      SELECT id, first_name, middle_name, last_name, gender, birthdate, 
             programYearAndSection, role, is_member, address, student_number, 
             contact_number, guardians_full_name, guardians_number, email
      FROM users
      WHERE first_name LIKE ? 
      OR middle_name LIKE ?
      OR last_name LIKE ?
      OR student_number LIKE ?
      OR gender LIKE ?
      OR role LIKE ?
      OR programYearAndSection LIKE ?
    `;
    const values = [
      searchQueryEscaped, 
      searchQueryEscaped, 
      searchQueryEscaped, 
      searchQueryEscaped,
      searchQueryEscaped, // gender search
      searchQueryEscaped, // role search
      searchQueryEscaped  // programYearAndSection search
    ];

    const results = await dbQuery(sql, values);

    if (results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).send("No members found.");
    }
  } catch (error) {
    console.error("Error searching members:", error);
    res.status(500).send("Error searching members.");
  }
});



app.post('/verifyStudent', async (req, res) => {
  const { studentId } = req.body;

  try {
    const sql = `UPDATE users SET is_member = true WHERE id = ?`;  // Update `is_member`
    const values = [studentId];

    const result = await dbQuery(sql, values);

    if (result.affectedRows > 0) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false, message: "Student not found" });
    }
  } catch (error) {
    console.error("Error verifying student:", error);
    res.status(500).json({ success: false, message: "Error verifying student" });
  }
});

app.post('/unverifyStudent', async (req, res) => {
  const { studentId } = req.body;

  try {
    const sql = `UPDATE users SET is_member = false WHERE id = ?`;  // Update `is_member`
    const values = [studentId];

    const result = await dbQuery(sql, values);

    if (result.affectedRows > 0) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false, message: "Student not found" });
    }
  } catch (error) {
    console.error("Error unverifying student:", error);
    res.status(500).json({ success: false, message: "Error unverifying student" });
  }
});

app.delete("/deleteUser", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, error: "Email is required." });
  }

  try {
    // Check if the user exists in the database
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    const userResults = await dbQuery(checkUserQuery, [email]);

    if (userResults.length === 0) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Proceed to delete the user from the database
    const deleteUserQuery = "DELETE FROM users WHERE email = ?";
    const result = await dbQuery(deleteUserQuery, [email]);

    if (result.affectedRows > 0) {
      return res.status(200).json({ success: true, message: "User deleted successfully." });
    } else {
      return res.status(500).json({ success: false, message: "Failed to delete user." });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ success: false, error: "Error deleting user." });
  }
});






// Start the server
const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
