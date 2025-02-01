// import { useState } from 'react';
// import styles from './PopupForm.module.css'; // Import the CSS module

// const PopupForm = ({ closeForm }) => {
//   const [destinationUrl, setDestinationUrl] = useState('');
//   const [remarks, setRemarks] = useState('');
//   const [linkExpiration, setLinkExpiration] = useState(false);  // Toggle for Link Expiration
//   const [expirationDate, setExpirationDate] = useState('');
//   const [expirationTime, setExpirationTime] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Form submitted with:', { destinationUrl, remarks, linkExpiration, expirationDate, expirationTime });
//     closeForm();  // Close the form after submission
//   };

//   const handleLinkExpirationToggle = () => {
//     setLinkExpiration(!linkExpiration);
//     if (!linkExpiration) {
//       // Reset expiration date and time when toggling off
//       setExpirationDate('');
//       setExpirationTime('');
//     }
//   };

//   return (
//     <div className={styles.popupModal}>
//       <div className={styles.popupContent}>
//         {/* Close button */}
//       <div className={styles.popheadbg}>
//       <span className={styles.closeBtn} onClick={closeForm}>&times;</span>
        
//         {/* Title */}
//         <h2 className={styles.modalTitle}>New Link</h2>
//       </div>
        
//         <form onSubmit={handleSubmit}>
//           <div className={styles.formGroup}>
//             <label htmlFor="destinationUrl">Destination URL:</label>
//             <input
//               type="url"
//               id="destinationUrl"
//               value={destinationUrl}
//               onChange={(e) => setDestinationUrl(e.target.value)}
//               required
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="remarks">Remarks:</label>
//             <textarea
//               id="remarks"
//               value={remarks}
//               onChange={(e) => setRemarks(e.target.value)}
//               required
//             />
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="linkExpiration">Link Expiration:</label>
//             <label className={styles.toggleSwitch}>
//               <input
//                 type="checkbox"
//                 id="linkExpiration"
//                 checked={linkExpiration}
//                 onChange={handleLinkExpirationToggle}
//               />
//               <span className={styles.slider}></span>
//             </label>
//           </div>

//           {/* Conditionally render date and time inputs if Link Expiration is toggled on */}
//           {linkExpiration && (
//             <div className={styles.formGroup}>
//               <label htmlFor="expirationDate">Expiration Date:</label>
//               <input
//                 type="date"
//                 id="expirationDate"
//                 value={expirationDate}
//                 onChange={(e) => setExpirationDate(e.target.value)}
//                 required
//               />
//             </div>
//           )}

//           {linkExpiration && (
//             <div className={styles.formGroup}>
//               <label htmlFor="expirationTime">Expiration Time:</label>
//               <input
//                 type="time"
//                 id="expirationTime"
//                 value={expirationTime}
//                 onChange={(e) => setExpirationTime(e.target.value)}
//                 required
//               />
//             </div>
//           )}

//           <button type="submit" className={styles.submitButton}>Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PopupForm;

import { useState } from 'react';
import axios from 'axios';
import styles from './PopupForm.module.css'; // Import the CSS module

const PopupForm = ({ closeForm }) => {
  const [destinationUrl, setDestinationUrl] = useState('');
  const [remarks, setRemarks] = useState('');
  const [linkExpiration, setLinkExpiration] = useState(false);
  const [expirationDate, setExpirationDate] = useState('');
  const [expirationTime, setExpirationTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine expiration date and time if provided
    const expireAt = linkExpiration && expirationDate && expirationTime 
      ? new Date(`${expirationDate}T${expirationTime}`) 
      : null;

    const formData = {
      originalUrl: destinationUrl,
      remarks,
      expireAt,
    };

    try {
      const response = await axios.post('https://url-shortener-sgf1.onrender.com/api/links/create', formData);
      console.log('Link created:', response.data);
      alert('Link created successfully!');
      closeForm(); // Close the form after successful submission
    } catch (error) {
      console.error('Error creating link:', error);
      alert('Failed to create the link. Please try again.');
    }
  };

  const handleLinkExpirationToggle = () => {
    setLinkExpiration(!linkExpiration);
    if (!linkExpiration) {
      setExpirationDate('');
      setExpirationTime('');
    }
  };

  return (
    <div className={styles.popupModal}>
      <div className={styles.popupContent}>
        <div className={styles.popheadbg}>
          <span className={styles.closeBtn} onClick={closeForm}>&times;</span>
          <h2 className={styles.modalTitle}>New Link</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="destinationUrl">Destination URL:</label>
            <input
              type="url"
              id="destinationUrl"
              value={destinationUrl}
              onChange={(e) => setDestinationUrl(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="remarks">Remarks:</label>
            <textarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="linkExpiration">Link Expiration:</label>
            <label className={styles.toggleSwitch}>
              <input
                type="checkbox"
                id="linkExpiration"
                checked={linkExpiration}
                onChange={handleLinkExpirationToggle}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
          {linkExpiration && (
            <div className={styles.formGroup}>
              <label htmlFor="expirationDate">Expiration Date:</label>
              <input
                type="date"
                id="expirationDate"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
                required
              />
            </div>
          )}
          {linkExpiration && (
            <div className={styles.formGroup}>
              <label htmlFor="expirationTime">Expiration Time:</label>
              <input
                type="time"
                id="expirationTime"
                value={expirationTime}
                onChange={(e) => setExpirationTime(e.target.value)}
                required
              />
            </div>
          )}
          <button type="submit" className={styles.submitButton}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;








