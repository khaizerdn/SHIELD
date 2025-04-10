import React, { useState } from 'react';
import axios from '../../backend/node_modules/axios';
import { useNavigate } from 'react-router-dom';

const Verification = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setVerificationCode(event.target.value);
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!verificationCode || isNaN(verificationCode)) {
      setError('Please enter a valid numeric verification code.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:8081/ca-verifycode', {
        verificationCode,
        email: 'user@example.com', // Replace with the correct email (or username)
      });
      navigate('/success'); // Redirect on success
    } catch (err) {
      setError(err.response?.data || 'Verification failed.');
    }
  };
  

  return (
    <div className="container-access">
      <div className="access">
      
        <form onSubmit={handleSubmit}>
        <span>A verification code has been sent to your email.</span>
          <div className="input-section-one">
            <div className='input-section-one-group'>
              <label htmlFor="verificationCode">Enter your verification code:</label>
              <input
                type="text"
                id="verificationCode"
                value={verificationCode}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          {error && <div className="text-danger">{error}</div>}
          <button className="button-loginsignup">Verify</button>
        </form>
      </div>
    </div>
  );
};

export default Verification;
