import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logo from '../assets/logo.svg'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      {/* Left Section - Logo */}
      <div className={styles.logo}>
        <Link to="/" className={styles.link}>
          <img src={Logo} alt="" />
        </Link>
      </div>

      {/* Hamburger Icon */}
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>

      {/* Right Section - Buttons */}
      <div
        className={`${styles.buttons} ${menuOpen ? styles.active : ""}`}
        onClick={() => setMenuOpen(false)} /* Close menu on click */
      >
        <Link to="/" className={styles.link}>
          <button className={styles.signupButton}>Signup</button>
        </Link>
        <Link to="/login" className={styles.link}>
          <button className={styles.loginButton}>Login</button>
        </Link>
        <Link to="/dashboard" className={styles.link}>
          <button className={styles.loginButton}>Dashboard</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
