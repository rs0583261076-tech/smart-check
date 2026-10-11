import React from 'react';
import { useApp } from '../context/AppContext';

export function Stats() {
  const { studentMarks, allUsers } = useApp();
  
  // מסננים רק את התרגילים שכבר קיבלו ציון (גדול מ-0) כדי לחשב ממוצע אמיתי
  const gradedItems = studentMarks ? studentMarks.filter(item => item.mark > 0) : [];
  
  // חישוב הממוצע הכללי במערכת
  const totalSum = gradedItems.reduce((sum, item) => sum + item.mark, 0);
  const generalAverage = gradedItems.length > 0 ? (totalSum / gradedItems.length).toFixed(1) : 0;

  // סך כל התרגילים שהוגשו ונבדקו
  const totalSubmitted = gradedItems.length;

  return (
    <section id="stats" className="page-section">
      <h2>📊 נתוני וסטטיסטיקות האתר</h2>
      
      <div className="statsGrid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
        
        <div className="statCard card" style={{ padding: '25px', textAlign: 'center', background: '#131322' }}>
          <p style={{ color: '#06b6d4', fontSize: '1.1rem', marginBottom: '10px' }}>ציון ממוצע 🏆</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#db2777', margin: 0 }}>
            {generalAverage}
          </p>
        </div>

        <div className="statCard card" style={{ padding: '25px', textAlign: 'center', background: '#131322' }}>
          <p style={{ color: '#06b6d4', fontSize: '1.1rem', marginBottom: '10px' }}>תלמידים רשומים 👩‍🎓</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', margin: 0 }}>
            {allUsers ? allUsers.length : 0}
          </p>
        </div>

        <div className="statCard card" style={{ padding: '25px', textAlign: 'center', background: '#131322' }}>
          <p style={{ color: '#06b6d4', fontSize: '1.1rem', marginBottom: '10px' }}>תרגילים שהוגשו ונבדקו 📚</p>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', margin: 0 }}>
            {totalSubmitted}
          </p>
        </div>

      </div>
    </section>
  );
}