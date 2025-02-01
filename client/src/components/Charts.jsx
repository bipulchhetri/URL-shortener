import React, { useState, useEffect } from "react";
import styles from "./Charts.module.css";

const Charts = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the JSON file
    fetch("/data.json")
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  if (!data) {
    return <p>Loading data...</p>; // Render a loading state while fetching
  }

  return (
    <div className={styles.charts}>
      <div className={styles.chart}>
        <h4>Date-wise Clicks</h4>
        <ul>
          {data.dateWiseClicks.map((click, index) => (
            <li key={index}>
              {click.date}: {click.count}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.chart}>
        <h4>Click Devices</h4>
        <ul>
          {data.deviceClicks.map((device, index) => (
            <li key={index}>
              {device.type}: {device.count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Charts;
