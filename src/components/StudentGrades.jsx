import React from 'react';
import { useApp } from '../context/AppContext';

export function StudentGrades() {
  // שליפת הנתונים ישירות מהקונטקסט
  const { studentMarks, currentUserRole } = useApp();
  
  const isTeacher = currentUserRole === 'teacher';
  
  // מסננים רק תרגילים שכבר קיבלו ציון (מעל 0)
  const gradedMarks = studentMarks.filter(item => item.mark > 0);

  const filteredMarks = isTeacher 
    ? gradedMarks 
    : gradedMarks.filter(item => item.studentName === currentUserRole?.name);

  // חישוב הממוצע המדויק
  const totalScore = filteredMarks.reduce((sum, item) => sum + item.mark, 0);
  const averageScore = filteredMarks.length > 0 ? (totalScore / filteredMarks.length).toFixed(1) : 0;

  return (
    <section className="page-section">
      <h2>📈 {isTeacher ? 'דוח ציונים כללי לכל התלמידים (מורה)' : `הציונים של ${currentUserRole?.name}`}</h2>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px', textAlign: 'right' }}>
          <thead>
            <tr style={{ background: '#131322', borderBottom: '2px solid rgba(6, 182, 212, 0.4)' }}>
              {isTeacher && <th style={{ padding: '12px', color: '#06b6d4' }}>שם התלמיד</th>}
              <th style={{ padding: '12px', color: '#06b6d4' }}>שם התרגיל</th>
              <th style={{ padding: '12px', color: '#06b6d4' }}>ציון</th>
              <th style={{ padding: '12px', color: '#06b6d4' }}>משוב / הערה מהמורה</th>
            </tr>
          </thead>
          <tbody>
            {filteredMarks.length > 0 ? (
              filteredMarks.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  {isTeacher && <td style={{ padding: '12px', fontWeight: 'bold', color: '#fff' }}>{item.studentName || 'אורח'}</td>}
                  <td style={{ padding: '12px', color: '#f3f4f6' }}>{item.taskName}</td>
                  <td style={{ padding: '12px', color: '#db2777', fontWeight: 'bold' }}>{item.mark}</td>
                  <td style={{ padding: '12px', color: '#cbd5e1' }}>{item.desc}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isTeacher ? 4 : 3} style={{ padding: '25px', textAlign: 'center', color: '#94a3b8' }}>
                  עדיין אין ציונים סופיים להצגה.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* שורה תחתונה שמציגה את הממוצע המעודכן */}
      <div className="card" style={{ marginTop: '25px', padding: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#131322', border: '1px solid rgba(219, 39, 119, 0.4)' }}>
        <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#cffafe' }}>
          {isTeacher ? '📊 ממוצע כללי לכלל התלמידים במערכת:' : '⭐ הממוצע האישי שלך:'}
        </span>
        <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#db2777', textShadow: '0 0 10px rgba(219, 39, 119, 0.5)' }}>
          {averageScore}
        </span>
      </div>
    </section>
  );
}