import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Charts from "./Charts";
import styles from "./Dashboard.module.css";
import PopupForm from "./PopupForm";

const Dashboard = () => {
  const [data, setData] = useState({
    totalClicks: 0,
    dateWiseClicks: [],
    deviceClicks: [],
  });

  // Fetch data from backend
  useEffect(() => {
    fetch("http://localhost:5001/dashboard")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.error(err));
  }, []);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleCreateButtonClick = () => {

    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };
  return (
    <div className={styles.dashboard}>
 <Sidebar/>
      <div className={styles.main}>
        <header className={styles.header}>
          <h2>Good morning, Bipul</h2>
          <button onClick={handleCreateButtonClick} className={styles.createButton}>Create New</button>
          {isFormVisible && <PopupForm closeForm={closeForm} />}

        </header>
        <div className={styles.content}>
          <div className={styles.summary}>
            <h3>Total Clicks</h3>
            <h1>{data.totalClicks}</h1>
          </div>
          <div className={styles.charts}>
            <Charts data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
