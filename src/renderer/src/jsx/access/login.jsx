import React, { useState } from 'react'; 
import '../../css/access/access.css';
import { Link, useNavigate } from 'react-router-dom';
import Validation from "./login-validation";
import axios from '../../backend/node_modules/axios';
import logo from '../../assets/Asset 1.png';

function Login({ setIsLoggedIn }) {
  const [values, setValues] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState(""); 
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Clear previous errors
    setLoginError("");
  
    // Run validation for the form inputs
    const validationErrors = Validation(values);
    setErrors(validationErrors);
  
    // If there are no validation errors, attempt login
    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await axios.post('http://localhost:8081/login', values);
        console.log("Response from server:", res.data);
  
        if (res.data.message === "Success") {
          // Save role and is_member status in localStorage
          localStorage.setItem('email', res.data.email);
          localStorage.setItem('role', res.data.role);
          localStorage.setItem('is_member', res.data.is_member); // Assuming `is_member` is returned in the response
          
          setIsLoggedIn(); // Call setIsLoggedIn directly without parameters
          navigate('/');   // Redirect to the home page after login
        } else {
          setLoginError("Incorrect email or password.");  // Set error for incorrect credentials
        }
      } catch (err) {
        if (err.response) {
          // Server responded with an error
          console.error("Server responded with an error:", err.response.data);
          setLoginError(err.response.data || "An error occurred. Please try again later.");
        } else {
          console.error("Error during submission:", err);
          setLoginError("An error occurred. Please try again later.");  // Set error for any server issues
        }
      }
    } else {
      // Set loginError if there are validation errors
      setLoginError("Incorrect email or password.");
    }
};


  return (
    <div className="container-access">
      <div className="access">
        <form action="" onSubmit={handleSubmit} noValidate>
          <img src={logo} alt="SHIELD Society" className="logo-mainlogo" />
          <div className="input-section-one">
            <div className='input-section-one-group'>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                name="email" 
                onChange={handleInput} 
                className={errors.email ? "input-error" : ""}  // Add class if there's an error
              />
            </div>
          </div>
          <div className="input-section-one">
            <div className='input-section-one-group'>
              <label htmlFor="password">Password</label>
              <div className="password-and-toggle">
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="" 
                  name="password" 
                  value={values.password} 
                  onChange={handleInput}
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
          
          {/* Show the loginError at the top of the form or near the button */}
          <div className='group'>
            <button type="submit" className="button-loginsignup">Log in</button>
            {loginError && <span className="text-danger">{loginError}</span>}
          </div>
          <div className="button-register">
            <Link to="/forgotpassword" className="button-register-text">Forgot Password?</Link>
          </div>
          <div className='hr-horizontal-login' />
          <div className="button-register">
            <Link to="/signup" className="button-register-text">Create Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
