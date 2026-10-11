import React from 'react';
import { useApp } from '../context/AppContext';

export function ExerciseDetail() {
  const { allQuestions, studentMarks, currentUserRole } = useApp();
  
  // מוצאים את שמות התרגילים שהתלמיד הנוכחי כבר הגיש
  const myDoneTaskNames = studentMarks
    .filter(m => m.studentName === currentUserRole?.name)
    .map(m => m.taskName);

  return (
    <section className="page-section">
      <h2>📁 התרגילים שעשיתי (המעקב שלי)</h2>
      <div className="about-box">
        <p>שלום <strong>{currentUserRole?.name}</strong>! כאן תוכל לראות אילו מטלות כבר השלמת ואילו עדיין ממתינות לך.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        {allQuestions.map((q) => {
          // בודקים האם התרגיל הזה נמצא ברשימת התרגילים שהתלמיד הגיש
          const isDone = myDoneTaskNames.includes(q.title);

          return (
            <div 
              key={q.id} 
              style={{ 
                padding: '15px 20px', 
                borderRadius: '15px', 
                border: `2px solid ${isDone ? '#86efac' : '#fbcfe8'}`,
                background: isDone ? '#f0fdf4' : '#fff5f5',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <h4 style={{ margin: '0 0 5px 0', color: '#1f2937' }}>{q.title} ({q.subject})</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#4b5563' }}>{q.desc}</p>
                <small style={{ color: '#6b7280' }}>📅 תאריך הגשה: {q.dueDate}</small>
              </div>

              <div>
                {isDone ? (
                  <span style={{ background: '#22c55e', color: 'white', padding: '6px 12px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.85rem' }}>
                    ✅ בוצע והוגש
                  </span>
                ) : (
                  <span style={{ background: '#ef4444', color: 'white', padding: '6px 12px', borderRadius: '20px', fontWeight: 'bold', fontSize: '0.85rem' }}>
                    ❌ טרם נעשה
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}