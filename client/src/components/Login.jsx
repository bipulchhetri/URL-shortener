import React, { useState } from "react";
import styles from "./Register.module.css";
import Headerimg from '../assets/h-img.svg'
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Form submitted successfully:", formData);
    // Add API call logic here
  };

  return (
    <div className={styles.container}>
      {/* Left Section with Image */}
      <div className={styles.imageSection}>
        <img
          src={Headerimg}// Replace with your image URL
          alt="Scenic view"
          className={styles.image}
        />
      </div>

      {/* Right Section with Form */}
      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <h2>Join us Today!</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Id"
              className={styles.inputField}
            />
    
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={styles.inputField}
            />
    
            <button type="submit" className={styles.registerButton}>
            Login
            </button>
          </form>
          <p>
           Don't have an account?{" "}
            <a href="/register" className={styles.loginLink}>
            Singup
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;



