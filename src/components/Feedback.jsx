import React from 'react';
import { useApp } from '../context/AppContext';

export function Feedback() {
  // שליפת הנתונים ישירות מהקונטקסט המרכזי
  const { studentMarks, currentUserRole } = useApp();
  
  // --- סינון המשובים והציונים בהתאם לתפקיד המשתמשת ---
  const myFeedbackList = (currentUserRole !== 'teacher' && currentUserRole !== 'none')
    ? studentMarks.filter(item => item.studentName === currentUserRole.name && item.mark > 0)
    : studentMarks.filter(item => item.mark > 0);

  return (
    <section className="page-section">
      <h2>🌟 המשובים והציונים שלי</h2>
      
      {/* תיבת הסבר קצרה למשתמשת על העמוד */}
      <div className="about-box">
        <p>כאן תוכלו לראות את כל ריבועי המשוב והתוצאות עבור התרגילים שהגשתם ונבדקו על ידי המורה.</p>
      </div>

      {/* --- אזור הצגת רשימת המשובים --- */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        {myFeedbackList.length > 0 ? (
          myFeedbackList.map((item, index) => (
            <div 
              key={index}
              className="card"
              style={{
                background: '#131322',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '18px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                borderRight: '6px solid #db2777'
              }}
            >
              {/* שורה עליונה: שם התרגיל בצד אחד, ותגית הציון בצד השני */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ margin: 0, color: '#06b6d4', fontSize: '1.1rem' }}>
                  📚 {item.taskName}
                </h4>
                <span style={{ 
                  background: '#05050a', 
                  color: '#db2777', 
                  padding: '5px 12px', 
                  borderRadius: '20px', 
                  fontWeight: 'bold',
                  border: '1px solid rgba(219, 39, 119, 0.4)'
                }}>
                  ציון: {item.mark}
                </span>
              </div>
              
              {/* הצגת טקסט המשוב וההערות שכתבה המורה */}
              <p style={{ margin: '5px 0 0 0', color: '#f3f4f6', fontSize: '0.95rem' }}>
                <strong style={{ color: '#cffafe' }}>חוות דעת ומשוב מהמורה:</strong> {item.desc}
              </p>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
            עדיין אין משובים מאושרים להצגה. נסי לשלוח תרגיל ולהמתין לבדיקת המורה! ✨
          </div>
        )}
      </div>
    </section>
  );
}