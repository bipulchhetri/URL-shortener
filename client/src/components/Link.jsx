// import { useEffect, useState } from 'react';
// import axios from 'axios';

// import styles from "./Link.module.css";
// import Sidebar from "./Sidebar";


// const Link = () => {
//   // Dummy data
//   // const linksData = [
//   //   {
//   //     date: "Jan 14, 2025 16:30",
//   //     originalLink: "https://www.travelwiththejoneses",
//   //     shortLink: "https://cuvette.io/Bn41aCOlnxj",
//   //     remarks: "campaign1",
//   //     clicks: 5,
//   //     status: "Active",
//   //   },
//   //   {
//   //     date: "Jan 14, 2025 05:45",
//   //     originalLink: "https://www.travelwiththejoneses",
//   //     shortLink: "https://cuvette.io/Bn41aCOlnxj",
//   //     remarks: "campaign2",
//   //     clicks: 5,
//   //     status: "Inactive",
//   //   },
//   //   {
//   //     date: "Jan 14, 2025 07:43",
//   //     originalLink: "https://www.travelwiththejoneses",
//   //     shortLink: "https://cuvette.io/Bn41aCOlnxj",
//   //     remarks: "campaign3",
//   //     clicks: 5,
//   //     status: "Inactive",
//   //   },
//   // ];
//   const [links, setLinks] = useState([]);

//   useEffect(() => {
//     // Fetch links on component mount
//     const fetchLinks = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/links');
//         setLinks(response.data);
//       } catch (error) {
//         console.error('Error fetching links:', error);
//       }
//     };

//     fetchLinks();
//   }, []);
//   return (
    
//   <>
// <div className={styles.fulllink}>
//   <Sidebar/>
//     <div className={styles.main}>
//     <div className={styles.links}>
       
//        <div className={styles.header}>
    
//          <h2>Links</h2>
//          <div className={styles.headerActions}>
//            <button className={styles.createNew}>+ Create New</button>
//            <input
//              type="text"
//              placeholder="Search by remarks"
//              className={styles.search}
//            />
//          </div>
//        </div>
//        <table className={styles.table}>
//          <thead>
//            <tr>
//              <th>Date</th>
//              <th>Original Link</th>
//              <th>Short Link</th>
//              <th>Remarks</th>
//              <th>Clicks</th>
//              <th>Status</th>
//              <th>Action</th>
//            </tr>
//          </thead>
//          <tbody>
//            {links.map((link, index) => (
//              <tr key={index}>
//                <td>{link.date}</td>
//                <td>{link.originalLink}</td>
//                <td>
//                <a href={`http://localhost:4000/${link.shortUrl}`} target="_blank" rel="noopener noreferrer">
//                {link.shortUrl}
//                  </a>
//                </td>
//                <td>{link.remarks}</td>
//                <td>{link.clicks}</td>
//                <td
//                  className={
//                    link.status === "Active"
//                      ? styles.statusActive
//                      : styles.statusInactive
//                  }
//                >
//                  {link.status}
//                </td>
//                <td>
//                  <button className={styles.actionButton}>✏️</button>
//                  <button className={styles.actionButton}>🗑️</button>
//                </td>
//              </tr>
//            ))}
//          </tbody>
//        </table>
//      </div>
//     </div>
// </div>
  
//   </>
//   );
// };

// export default Link;




import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Link.module.css";
import Sidebar from "./Sidebar";
import PopupForm from "./PopupForm";
const LinkTable = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    // Fetch links from the API
    axios.get("http://localhost:5001/api/links")
      .then((response) => setLinks(response.data))
      .catch((error) => console.error("Error fetching links:", error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5001/api/links/${id}`)
      .then(() => setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id)))
      .catch((error) => console.error("Error deleting link:", error));
  };

  const handleEdit = (id) => {
    // Implement edit functionality (e.g., open a popup form pre-filled with the link details)
    console.log("Edit link with ID:", id);
  };
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleCreateButtonClick = () => {

    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };


  return (

    <>
  
   <div className={styles.fulllink}>
 <div className={styles.linksidebar}>
 <Sidebar/>

 </div>
    <table className={styles.linkTable}>
      <thead>
        <tr>
     
          <th>Creation Date</th>
          <th>Original URL</th>
          <th>Short URL</th>
          <th>Remarks</th>
          <th>Clicks</th>
          <th>Status</th>
          <th>Actions</th>
          <th>  <button onClick={handleCreateButtonClick} className={styles.createButton}>Create New</button>
          {isFormVisible && <PopupForm closeForm={closeForm} />}</th>
        </tr>
      </thead>
      <tbody>
   
        {links.map((link) => (
          <tr key={link.id}>
            <td>{new Date(link.createdAt).toLocaleDateString()}</td>
            <td>
              <a href={link.originalUrl} target="_blank" rel="noopener noreferrer">
                {link.originalUrl}
              </a>
            </td>
            <td>
              <a href={`https://url-shortener-sgf1.onrender.com/${link.shortUrl}`} target="_blank" rel="noopener noreferrer">
                {link.shortUrl}
              </a>
            </td>
            <td>{link.remarks}</td>
            <td>{link.clicks}</td>
            <td className={link.status === "Active" ? styles.active : styles.inactive}>
              {link.status}
            </td>
            <td>
              <button onClick={() => handleEdit(link.id)} className={styles.editButton}>Edit</button>
              <button onClick={() => handleDelete(link.id)} className={styles.deleteButton}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
   </div>
    </>
  );
};

export default LinkTable;
