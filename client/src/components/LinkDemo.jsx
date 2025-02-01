import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './LinkTable.module.css';

const LinkTable = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    // Fetch links on component mount
    const fetchLinks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/links');
        setLinks(response.data);
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    };

    fetchLinks();
  }, []);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.linkTable}>
        <thead>
          <tr>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Remarks</th>
            <th>Clicks</th>
            <th>Expiration</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.shortUrl}>
              <td>{link.originalUrl}</td>
              <td>
                <a href={`http://localhost:5001/${link.shortUrl}`} target="_blank" rel="noopener noreferrer">
                  {link.shortUrl}
                </a>
              </td>
              <td>{link.remarks}</td>
              <td>{link.clickCount}</td>
              <td>{link.expireAt ? new Date(link.expireAt).toLocaleString() : 'No Expiration'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LinkTable;
