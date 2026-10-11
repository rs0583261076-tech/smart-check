import React from 'react';
import { useApp } from '../context/AppContext';

export function StudentsTable() {
  const { allUsers } = useApp();
  
  return (
    <section id="students-table" className="page-section">
      <h2>👥 מאגר התלמידים במערכת</h2>
      <p style={{ textAlign: 'center', color: '#636e72', marginBottom: '20px' }}>
        כאן יופיעו כל פרטי התלמידים שיירשמו למערכת בצורה מסודרת:
      </p>
      <div className="table-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>שם מלא</th>
              <th>אימייל</th>
              <th>פלאפון</th>
              <th>סיסמה / מזהה</th>
            </tr>
          </thead>
          <tbody>
            {!allUsers || allUsers.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty-row">עדיין לא נרשמו תלמידים למערכת... 🌸</td>
              </tr>
            ) : (
              allUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.eimel}</td>
                  <td>{user.phone}</td>
                  <td>{user.id}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}