import React, { useState } from 'react';
import '../../css/access/access.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../backend/node_modules/axios';


function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Verify Email, Step 2: Verify Code, Step 3: Reset Password
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    try {
      // Check if email exists
      const response = await axios.post('http://localhost:8081/check-email', { email });
      if (response.data.success) {
        setStep(2); // Move to the next step immediately
        
        // Optionally handle response details, e.g., showing a message
      } else {
        setErrors({ email: response.data.error || 'This email is not registered.' });
      }
    } catch (error) {
      setErrors({ email: 'An error occurred while verifying the email.' });
    }
  };
  

  const handleCodeSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    try {
      // Verify the code
      const response = await axios.post('http://localhost:8081/fp-verifycode', { email, code });
      if (response.data.success) {
        setStep(3); // Move to the reset password step
      } else {
        setErrors({ code: response.data.error || 'The verification code is incorrect.' });
      }
    } catch (error) {
      setErrors({ code: 'An error occurred while verifying the code.' });
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    if (newPassword !== confirmPassword) {
      setErrors({ password: 'Passwords do not match.' });
      return;
    }
    try {
      // Change the password in the database
      const response = await axios.post('http://localhost:8081/reset-password', { email, newPassword });
      if (response.data.success) {
        navigate('/login'); // Redirect to the login page after password reset
      } else {
        setErrors({ password: response.data.error || 'Failed to reset the password.' });
      }
    } catch (error) {
      setErrors({ password: 'An error occurred while resetting the password.' });
    }
  };

  return (
    <div className="container-access">
      <div className="access">
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} noValidate>
            <div className="title">Forgot Password</div>
            <div className="input-section-one">
            <div className='note'>Please enter your email to search for your account.</div>
            <div className="input-section-one-group">
              <label htmlFor="email">Email</label>
                <div className="users-input">
                  <input
                    type="email"
                    placeholder=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            <button className="button-loginsignup" type="submit">
              Search Account
            </button>
            <div className='hr-horizontal-login' />
          <div className="button-register">
            <Link to="/" className="button-register-text">Remember Password?</Link>
          </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleCodeSubmit} noValidate>
            <div className="title">Forgot Password</div>
            <div className="input-section-one">
            <div className='note'>Please check your email for verification code.</div>
            <div className="input-section-one-group">
                <label htmlFor="code">Verification Code</label>
                <div className="users-input">
                  <input
                    type="text"
                    placeholder=""
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              {errors.code && <div className="text-danger">{errors.code}</div>}
            </div>
            <button className="button-loginsignup" type="submit">
              Verify Code
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordSubmit} noValidate>
            <div className="title">Forgot Password</div>
            <div className="input-section-one">
            <div className='note'>Please create your new password.</div>
            <div className="input-section-one-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="users-input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <div className="toggle-password-icon" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="m12,8.67c-1.84,0-3.33,1.49-3.33,3.33s1.49,3.33,3.33,3.33,3.33-1.49,3.33-3.33-1.49-3.33-3.33-3.33Zm0,0c-1.84,0-3.33,1.49-3.33,3.33s1.49,3.33,3.33,3.33,3.33-1.49,3.33-3.33-1.49-3.33-3.33-3.33Zm0-3.81c-4.47,0-8.33,2.76-10,7.14,1.67,4.38,5.53,7.14,10,7.14s8.33-2.76,10-7.14c-1.67-4.38-5.53-7.14-10-7.14Zm0,12.38c-2.89,0-5.24-2.35-5.24-5.24s2.35-5.24,5.24-5.24,5.24,2.35,5.24,5.24-2.35,5.24-5.24,5.24Zm0-8.57c-1.84,0-3.33,1.49-3.33,3.33s1.49,3.33,3.33,3.33,3.33-1.49,3.33-3.33-1.49-3.33-3.33-3.33Z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="m12,4.86c-4.47,0-8.33,2.76-10,7.14,1.67,4.38,5.53,7.14,10,7.14s8.33-2.76,10-7.14c-1.67-4.38-5.53-7.14-10-7.14Zm0,12.38c-2.89,0-5.24-2.35-5.24-5.24s2.35-5.24,5.24-5.24,5.24,2.35,5.24,5.24-2.35,5.24-5.24,5.24Z"/>

                  </svg>
                )}
              </div>
                </div>
              </div>
            </div>
            <div className="input-section-one">
            <div className="input-section-one-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="users-input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                
                </div>
              </div>
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>
            <button className="button-loginsignup" type="submit">
              Confirm
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
