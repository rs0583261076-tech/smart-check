import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export function PendingSubmissions() {
  const { studentMarks, setStudentMarks } = useApp();
  
  // --- 1. ניהול ה-State המקומי ---
  const [gradesInput, setGradesInput] = useState({});
  const [feedbackInput, setFeedbackInput] = useState({});

  // --- 2. טיפול בשינויים בשדות הקלט של המורה ---
  const handleGradeChange = (index, value) => {
    setGradesInput({ ...gradesInput, [index]: value });
  };

  const handleFeedbackChange = (index, value) => {
    setFeedbackInput({ ...feedbackInput, [index]: value });
  };

  // --- 3. שמירת הציון ושליחתו לתלמידה ---
  const saveAndSendToStudent = (index) => {
    const finalGrade = gradesInput[index];
    const customFeedback = feedbackInput[index] || "נבדק ואושר על ידי המורה 🌟";

    if (!finalGrade) {
      alert("⚠️ נא להזין ציון מספרי לפני השמירה והשליחה.");
      return;
    }

    const updatedMarks = studentMarks.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          mark: Number(finalGrade),
          desc: customFeedback
        };
      }
      return item;
    });
    // מעדכן זכרון גלובלי 
    setStudentMarks(updatedMarks);

    setGradesInput({ ...gradesInput, [index]: '' });
    setFeedbackInput({ ...feedbackInput, [index]: '' });

    alert(`✅ הציון והמשוב נשלחו בהצלחה לתלמידה והוסרו מרשימת ההמתנה!`);
  };

  // --- 4. תצוגת הממשק (JSX) ---
  return (
    <div className="page-section" style={{ background: '#0d0d18', padding: '20px', borderRadius: '15px' }}>
      <h2 style={{ color: '#06b6d4' }}>📋 תרגילים שהוגשו וממתינים לבדיקת מורה</h2>
      
      {studentMarks.filter(item => item.mark === 0).length === 0 ? (
        <p style={{ color: '#cbd5e1', marginTop: '15px' }}>אין כרגע תרגילים ממתינים לבדיקה. הכל נקי ומסודר! 🎉</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          {studentMarks.map((item, index) => (
            item.mark === 0 && (
              <div key={index} className="card" style={{ padding: '20px', background: '#131322' }}>
                <p><strong>שם התלמידה:</strong> {item.studentName}</p>
                <p><strong>שם המטלה:</strong> {item.taskName}</p>
                <p><strong>תוכן הפתרון / הקובץ שהועלה:</strong></p>
                
                <div style={{ background: '#05050a', padding: '12px', borderRadius: '8px', border: '1px solid rgba(6, 182, 212, 0.3)', whiteSpace: 'pre-wrap', color: '#cffafe' }}>
                  {item.desc || "לא צורף פירוט"}
                </div>

                <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
                    
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', color: '#cbd5e1' }}>ציון מספרי:</label>
                      <input 
                        type="number" 
                        placeholder="למשל 95..." 
                        style={{ width: '100%', padding: '8px', borderRadius: '6px' }}
                        value={gradesInput[index] || ''}
                        onChange={(e) => handleGradeChange(index, e.target.value)}
                      />
                    </div>

                    <div style={{ flex: 2 }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '4px', color: '#cbd5e1' }}>משוב מהמורה:</label>
                      <input 
                        type="text" 
                        placeholder="הקלידי משוב אישי..." 
                        style={{ width: '100%', padding: '8px', borderRadius: '6px' }}
                        value={feedbackInput[index] || ''}
                        onChange={(e) => handleFeedbackChange(index, e.target.value)}
                      />
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={() => saveAndSendToStudent(index)}
                    style={{ marginTop: '5px', width: 'fit-content' }}
                  >
                    שלח לתלמידה ✨
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
}