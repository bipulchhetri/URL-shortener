// import React from 'react';
// import styles from './Analytics.module.css';
// import Sidebar from './Sidebar';
// import PopupForm from "./PopupForm";


// import { useState, useEffect } from "react";

// const Table = () => {
//   const data = [
//     { timestamp: 'Jan 14, 2025 16:30', original: 'https://www.travelwiththejoneses', short: 'https://cuvette.io/Bn41aCOlnxj', ip: '192.158.1.38', device: 'Android' },
//     { timestamp: 'Jan 14, 2025 6:30', original: 'https://www.travelwiththejoneses', short: 'https://cuvette.io/Bn41aCOlnxj', ip: '192.158.1.38', device: 'Chrome' },
//     { timestamp: 'Jan 14, 2025 8:30', original: 'https://www.travelwiththejoneses', short: 'https://cuvette.io/Bn41aCOlnxj', ip: '192.158.1.38', device: 'iOS' },
//   ];

//   // const [isFormVisible, setIsFormVisible] = useState(false);
// const [isFormVisible,setIsFormVisible] = useState(false)
//   const handleCreateButtonClick = () => {

//     setIsFormVisible(true);
//   };

//   const closeForm = () => {
//     setIsFormVisible(false);
//   };
//   return (
//    <div className={styles.main}>
//         <Sidebar/>
//    {/* <div className={styles.analytics}> */}
//    <div className={styles.tableContainer}>
  
//    <button onClick={handleCreateButtonClick} className={styles.createButton}>Create New</button>
//    {isFormVisible && <PopupForm closeForm={closeForm} />}
//   <table className={styles.table}>
//     <thead>
//       <tr>
//         <th>Timestamp</th>
//         <th>Original Link</th>
//         <th>Short Link</th>
//         <th>IP Address</th>
//         <th>User Device</th>
//       </tr>
//     </thead>
//     <tbody>
//       {data.map((row, index) => (
//         <tr key={index}>
//           <td>{row.timestamp}</td>
//           <td>{row.original}</td>
//           <td>{row.short}</td>
//           <td>{row.ip}</td>
//           <td>{row.device}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>
//    </div>
//   //  </div>
//   );
// };

// export default Table;




import React, { useEffect, useState } from "react";
import { fetchAnalytics } from "../services/api";
import styles from "./Analytics.module.css";

const Analytics = ({ shortUrl }) => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const getAnalyticsData = async () => {
      try {
        const data = await fetchAnalytics(shortUrl);
        setAnalyticsData(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    getAnalyticsData();
  }, [shortUrl]);

  if (!analyticsData) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className={styles.analyticsContainer}>
      <h2>Analytics for {analyticsData.shortUrl}</h2>
      <p><strong>Original URL:</strong> {analyticsData.originalUrl}</p>
      <table className={styles.analyticsTable}>
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>IP Address</th>
            <th>User Device</th>
          </tr>
        </thead>
        <tbody>
          {analyticsData.analytics.map((entry, index) => (
            <tr key={index}>
              <td>{new Date(entry.timestamp).toLocaleString()}</td>
              <td>{entry.ipAddress || "Unknown"}</td>
              <td>{entry.userAgent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Analytics;
