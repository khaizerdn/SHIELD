import React, { useState } from 'react';
import '../../css/access/access.css';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './signup-validation'; // Assuming you have a validation file
import axios from '../../backend/node_modules/axios';

// Utility function to generate access-dropdown options
const generateOptions = (count, isTwoDigit = false) => {
  return [...Array(count).keys()].map(i => {
    const value = i + 1;
    const label = isTwoDigit ? String(value).padStart(2, '0') : String(value);
    return { value, label };
  });
};

function Signup() {
  // State management for form values and errors
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    gender: "",
    programYearAndSection: "",
    role: "",
    month: "",
    day: "",
    year: "",
    address: "",
    studentNumber: "",
    contactNumber: "",
    guardiansFullName: "",
    guardiansNumber: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Input handler
  const handleInput = (event) => {
    const { name, value } = event.target;
  
    // If the input is for the username, convert the value to lowercase
    if (name === 'username') {
      setValues(prev => ({ ...prev, [name]: value.toLowerCase() }));
    } else {
      setValues(prev => ({ ...prev, [name]: value }));
    }
  };

  // Check if fields should be hidden
  const shouldHideFields = values.role === 'adviser' || values.role === 'other';

  // Form submission handler with validation
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Run validation and update errors state (client-side validation)
    const validationErrors = Validation(values);

    // Simultaneously, check if the username and email are available on the server
    try {
        const availabilityCheck = await axios.post('http://localhost:8081/check-availability', {
            email: values.email
        });
        console.log("Availability check response:", availabilityCheck.data);
    } catch (availabilityError) {
        if (availabilityError.response && availabilityError.response.data.errors) {
            // Merge server-side availability errors with client-side validation errors
            Object.assign(validationErrors, availabilityError.response.data.errors);
        } else {
            validationErrors.general = "An error occurred while checking availability.";
        }
    }

    // If there are validation or availability errors, update the errors state
    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        console.log("Errors found:", validationErrors);
        return; // Stop the submission process if there are errors
    }

    // Decide the route based on user role (student or adviser/other)
    const signupRoute =
        values.role === "student"
            ? "http://localhost:8081/signup/student"
            : "http://localhost:8081/signup/adviserorother";

    // If no errors, proceed to account creation
    try {
        const accountRes = await axios.post(signupRoute, values);
        console.log("Account creation response:", accountRes.data);

        // Navigate to the verification page
        navigate('/verification');
    } catch (accountCreationError) {
        console.error("Error during account creation:", accountCreationError);
        setErrors({ general: "An error occurred during account creation. Please try again." });
    }
};


  // Dropdown data
  const months = generateOptions(12, true);
  const days = generateOptions(31, true);
  const years = generateOptions(121).map(i => ({
    value: new Date().getFullYear() - i.value,
    label: new Date().getFullYear() - i.value
  }));

  return (
    <div className="container-access">
      <div className="access">
        <form onSubmit={handleSubmit} noValidate>
        <div className="title">Sign Up</div>
          {/* First Name */}
          <div className="input-section-one">
            <div className='input-section-one-group'>
              <label htmlFor="firstName">First Name</label>
              <div className='users-input'>
                <input 
                  type="text" 
                  placeholder="" 
                  name="firstName" 
                  value={values.firstName}
                  onChange={handleInput} 
                />
              </div>
            </div>
            {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
          </div>

          {/* Last Name */}
          <div className="input-section-one">
          <div className='input-section-one-group'>
            <label htmlFor="lastName">Last Name</label>
            <div className='users-input'>
            <input 
              type="text" 
              placeholder="" 
              name="lastName" 
              value={values.lastName} 
              onChange={handleInput} 
            />
            </div>
            </div>
            {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
          </div>

          {/* Middle Name */}
          <div className="input-section-one">
          <div className='input-section-one-group'>
            <label htmlFor="middleName">Middle Name</label>
            <div className='users-input'>
            <input 
              type="text" 
              placeholder="" 
              name="middleName" 
              value={values.middleName} 
              onChange={handleInput} 
            />
            </div>
            </div>
            {errors.middleName && <div className="text-danger">{errors.middleName}</div>}
          </div>


          {/* Gender */}
          <div className="input-section-one">
            <div className='input-section-one-group'>
            <label htmlFor="access">Gender</label>
            <div className='users-input'>
            <div className="access-dropdown">
            <select 
              name="gender" 
              value={values.gender} 
              onChange={handleInput} 
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            </div>
            </div>
            </div>
            {errors.gender && <div className="text-danger">{errors.gender}</div>}
          </div>

          {/* Role */}
          <div className="input-section-one">
            <div className='input-section-one-group'>
            <label htmlFor="access">Role</label>
            <div className='users-input'>
            <div className="access-dropdown">
            <select 
              name="role" 
              value={values.role} 
              onChange={handleInput} 
            >
              <option value="">Select Role</option>
              <option value="adviser">Adviser</option>
              <option value="student">Student</option>
              <option value="other">Other</option>
            </select>
            </div>
            </div>
            </div>
            {errors.role && <div className="text-danger">{errors.role}</div>}
          </div>

          {/* Birthdate (Month/Day/Year) */}
          <div className="input-section-one">
          <div className='input-section-one-group'>
            <label htmlFor="birthdate">Birthdate</label>
            <div className='users-input'>
            <div className="access-dropdown">
              {/* Month */}
              <select 
                name="month" 
                value={values.month} 
                onChange={handleInput}
              >
                <option value="">MM</option>
                {months.map(month => (
                  <option key={month.value} value={month.value}>{month.label}</option>
                ))}
              </select>
              <div>/</div>
              {/* Day */}
              <select 
                name="day" 
                value={values.day} 
                onChange={handleInput}
              >
                <option value="">DD</option>
                {days.map(day => (
                  <option key={day.value} value={day.value}>{day.label}</option>
                ))}
              </select>
              <div>/</div>
              {/* Year */}
              <select 
                name="year" 
                value={values.year} 
                onChange={handleInput}
              >
                <option value="">YYYY</option>
                {years.map(year => (
                  <option key={year.value} value={year.value}>{year.label}</option>
                ))}
              </select>
            </div>
            </div>
            </div>
            {errors.birthdate && <div className="text-danger">{errors.birthdate}</div>}
          </div>

          {/* Address */}
          <div className="input-section-one">
          <div className='input-section-one-group'>
            <label htmlFor="address">Address</label>
            <div className='users-input'>
            <input 
              type="text" 
              placeholder="" 
              name="address" 
              value={values.address} 
              onChange={handleInput} 
            />
            </div>
            </div>
            {errors.address && <div className="text-danger">{errors.address}</div>}
          </div>

          {/* Student Number (conditionally render) */}
          {!shouldHideFields && (
            <div className="input-section-one">
              <div className='input-section-one-group'>
                <label htmlFor="studentNumber">Student Number</label>
                <div className='users-input'>
                  <input
                    type="text"
                    placeholder=""
                    name="studentNumber"
                    value={values.studentNumber}
                    onChange={handleInput}
                  />
                </div>
              </div>
              {errors.studentNumber && <div className="text-danger">{errors.studentNumber}</div>}
            </div>
          )}

          {/* Program Year & Section (conditionally render) */}
          {!shouldHideFields && (
            <div className="input-section-one">
              <div className='input-section-one-group'>
                <label htmlFor="programYearAndSection">Program Year&Section</label>
                <div className='users-input'>
                  <input
                    type="text"
                    placeholder=""
                    name="programYearAndSection"
                    value={values.programYearAndSection}
                    onChange={handleInput}
                  />
                </div>
              </div>
              {errors.programYearAndSection && <div className="text-danger">{errors.programYearAndSection}</div>}
            </div>
          )}

          {/* Contact Number */}
          <div className="input-section-one">
          <div className='input-section-one-group'>
            <label htmlFor="contactNumber">Contact Number</label>
            <div className='users-input'>
            <input 
              type="text" 
              placeholder="" 
              name="contactNumber" 
              value={values.contactNumber} 
              onChange={handleInput} 
            />
            </div>
            </div>
            {errors.contactNumber && <div className="text-danger">{errors.contactNumber}</div>}
          </div>

          {/* Guardian's Name (conditionally render) */}
          {!shouldHideFields && (
            <div className="input-section-one">
              <div className='input-section-one-group'>
                <label htmlFor="guardiansFullName">Guardian's Name</label>
                <div className='users-input'>
                  <input
                    type="text"
                    placeholder=""
                    name="guardiansFullName"
                    value={values.guardiansFullName}
                    onChange={handleInput}
                  />
                </div>
              </div>
              {errors.guardiansFullName && <div className="text-danger">{errors.guardiansFullName}</div>}
            </div>
          )}

          {/* Guardian's Number (conditionally render) */}
          {!shouldHideFields && (
            <div className="input-section-one">
              <div className='input-section-one-group'>
                <label htmlFor="guardiansNumber">Guardian's Number</label>
                <div className='users-input'>
                  <input
                    type="text"
                    placeholder=""
                    name="guardiansNumber"
                    value={values.guardiansNumber}
                    onChange={handleInput}
                  />
                </div>
              </div>
              {errors.guardiansNumber && <div className="text-danger">{errors.guardiansNumber}</div>}
            </div>
          )}

          {/* Email */}
          <div className="input-section-one">
          <div className='input-section-one-group'>
            <label htmlFor="email">Email</label>
            <div className='users-input'>
            <input 
              type="email" 
              placeholder="" 
              name="email" 
              value={values.email} 
              onChange={handleInput}
            />
            </div>
            </div>
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          {/* Password */}
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
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>

          {/* Confirm Password */}
          <div className="input-section-one">
            <div className="input-section-one-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="users-input">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleInput}
                />
              </div>
            </div>
            {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
          </div>

          {/* Submit Button */}
          <div className='input-section-one'>
          <button className="button-loginsignup">Confirm</button>
          </div>
          {/* Terms and Agreement */}
            <div className="agreement">
            By creating an account, you agree to the{' '}
            <Link to="/terms-of-service" className="link">Terms of Service</Link>,{' '}
            <Link to="/privacy-policy" className="link">Privacy Policy</Link>, including{' '}
            <Link to="/cookies-policy" className="link">Cookie Policy</Link>.
          
          </div>
          <div className='hr-horizontal-login' />
          <div className="button-register">
            <Link to="/" className="button-register-text">Already have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
