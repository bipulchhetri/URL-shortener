import React from "react";
import { NavLink } from "react-router-dom";
import { RiHome6Line } from "react-icons/ri";
import { IoIosLink } from "react-icons/io";

import { FaChartBar, FaCog } from "react-icons/fa"; // Example icons
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <NavLink to="/dashboard" activeClassName={styles.active}>
            <RiHome6Line className={styles.icon} />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/link" activeClassName={styles.active}>
            <IoIosLink className={styles.icon} />
            <span>Links</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/analytics" activeClassName={styles.active}>
            <FaChartBar className={styles.icon} />
            <span>Analytics</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" activeClassName={styles.active}>
            <FaCog className={styles.icon} />
            <span>Settings</span>
          </NavLink>
         
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
