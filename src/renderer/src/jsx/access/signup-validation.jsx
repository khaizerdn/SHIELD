function Validation(values) {
  let error = {};

  const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[a-zA-Z0-9\W_]{8,}$/;
  const name_pattern = /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/;
  const guardiansFullName_pattern = /^[A-Z][a-z]*(?: [A-Z][a-z]*| [A-Z]\.)*$/;
  const studentNumber_pattern = /^\d+$/;

  // First Name Validation
  if (values.firstName.trim() === "") {
    error.firstName = "First name should not be empty.";
  } else if (!name_pattern.test(values.firstName)) {
    error.firstName = "First name should contain only letters and each part should be capitalized (e.g., John Patrick).";
  }

  // Last Name Validation
  if (values.lastName.trim() === "") {
    error.lastName = "Last name should not be empty.";
  } else if (!name_pattern.test(values.lastName)) {
    error.lastName = "Last name should contain only letters and each part should be capitalized (e.g., De Salit).";
  }

  // Middle Name Validation (if provided)
  if (values.middleName.trim() === "") {
    error.middleName = "Middle name should not be empty.";
  } else if (!name_pattern.test(values.middleName)) {
    error.middleName = "Middle name should contain only letters and each part should be capitalized (e.g., De Salit).";
  }

  // Gender Validation
  if (values.gender === "") {
    error.gender = "Please select your gender.";
  }

  // Birthdate Validation (Month, Day, Year)
  if (values.month === "" || values.day === "" || values.year === "") {
    error.birthdate = "Please select your full birthdate (Month/Day/Year).";
  } else {
    const birthDate = new Date(`${values.year}-${values.month}-${values.day}`);
    if (isNaN(birthDate.getTime())) {
      error.birthdate = "Invalid birthdate.";
    }
  }

  // Address Validation
  if (values.address.trim() === "") {
    error.address = "Address should not be empty.";
  }



  // Role Validation
  if (values.role.trim() === "") {
    error.role = "Role should not be empty.";
  }


  // Contact Number Validation
  if (values.contactNumber.trim() === "") {
    error.contactNumber = "Contact number should not be empty.";
  } else if (!/^09\d{9}$/.test(values.contactNumber)) {
    error.contactNumber = "Contact number should start with 09 and be exactly 11 digits long.";
  }

  // Email Validation
  if (values.email.trim() === "") {
    error.email = "Email should not be empty.";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email should be a valid CVSU email (e.g., user@cvsu.edu.ph).";
  }

  // Password Validation
  if (values.password.trim() === "") {
    error.password = "Password should not be empty.";
  } else if (!password_pattern.test(values.password)) {
    error.password = "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.";
  }

  // Confirm Password Validation
  if (values.confirmPassword.trim() === "") {
    error.confirmPassword = "Please confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    error.confirmPassword = "Passwords do not match.";
  }

  if (values.role !== "adviser" && values.role !== "other") {
  // Guardian's Full Name Validation
  if (values.guardiansFullName.trim() === "") {
    error.guardiansFullName = "Guardian's full name should not be empty.";
  } else if (!guardiansFullName_pattern.test(values.guardiansFullName)) {
    error.guardiansFullName = "Guardian's full name should contain only letters and each part should be capitalized.";
  }
    // Guardian's Contact Number Validation
    if (values.guardiansNumber.trim() === "") {
      error.guardiansNumber = "Guardian's contact number should not be empty.";
    } else if (!/^09\d{9}$/.test(values.guardiansNumber)) {
      error.guardiansNumber = "Guardian's contact number should start with 09 and be exactly 11 digits long.";
    }

      // Student Number Validation
  if (values.studentNumber.trim() === "") {
    error.studentNumber = "Student number should not be empty.";
  } else if (!studentNumber_pattern.test(values.studentNumber)) {
    error.studentNumber = "Student number should contain only numbers.";
  }

  
  // Program Year and Section Validation
  if (values.programYearAndSection.trim() === "") {
    error.programYearAndSection = "Program Year and Section should not be empty.";
  }
  }

  return error;
}

export default Validation;
