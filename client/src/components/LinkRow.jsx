import React from "react";
import styles from "./Link.module.css";
// import row from '../assets/links.json';


const row = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", date: "2025-01-01", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", date: "2025-01-02", status: "Inactive" },
    { id: 3, name: "Bob Johnson", email: "bob.johnson@example.com", date: "2025-01-03", status: "Pending" },
    { id: 4, name: "Alice Brown", email: "alice.brown@example.com", date: "2025-01-04", status: "Active" },
  ];

const LinkRow = ({ row }) => {
  return (
    <tr className={styles.row}>
      <td>{row.date}</td>
      <td>{row.originalLink}</td>
      <td>{row.shortLink}</td>
      <td>{row.remarks}</td>
      <td>{row.clicks}</td>
      <td className={row.status === "Active" ? styles.active : styles.inactive}>
        {row.status}
      </td>
      <td>
        <button className={styles.editButton}>✏️</button>
        <button className={styles.deleteButton}>🗑️</button>
      </td>
    </tr>
  );
};

export default LinkRow;
