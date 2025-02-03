function VerificationValidation(values) {
  let errors = {};

  const code_pattern = /^\d{6}$/; // 6-digit code validation pattern

  // Verification Code Validation
  if (!values.verificationCode) {
    errors.verificationCode = "Verification code should not be empty.";
  } else if (!code_pattern.test(values.verificationCode)) {
    errors.verificationCode = "Please enter a valid 6-digit code.";
  }

  console.log('Validation Errors:', errors); // Debugging
  return errors; // Return the errors object
}

export default VerificationValidation;
