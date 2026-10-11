import React, { useState } from 'react';
import { useApp } from '../context/AppContext'; // ייבוא הקונטקסט

export function Exercises() {
  // שליפת הכל ישירות מהענן (Context) במקום לקבל מבחוץ
  const { 
    allQuestions, 
    selectedExId, 
    setSelectedExId, 
    currentExercise, 
    handleExamination 
  } = useApp();
  
  // --- ניהול הזיכרון המקומי (State) של הרכיב ---
  const [selectedSubject, setSelectedSubject] = useState('הכל');
  const [studentAnswer, setStudentAnswer] = useState('');
  const [fileName, setFileName] = useState('');

  // --- סינון שאלות ומקצועות (עם הגנה למקרה שהרכש עוד ריק) ---
  const subjects = ['הכל', ...new Set(allQuestions?.map(q => q.subject) || [])];
  const filteredQuestions = selectedSubject === 'הכל' 
    ? (allQuestions || [])
    : (allQuestions || []).filter(q => q.subject === selectedSubject);

  // --- טיפול בהעלאת קובץ ובשמירת שם הקובץ ---
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  // --- בדיקה והגשת התרגיל למורה ---
  const onSubmitTask = () => {
    if (!studentAnswer.trim() && !fileName) {
      alert("⚠️ אנא כתבי את הפתרון שלך או העלי קובץ לפני ההגשה.");
      return;
    }
    const finalContent = `טקסט/קוד: ${studentAnswer || "לא הוזן טקסט"} | קובץ: ${fileName || "לא צורף קובץ"}`;
    
    handleExamination(finalContent);
    setStudentAnswer('');
    setFileName('');
  };

  return (
    <section id="exercises" className="page-section">
      <h2>💻 מרכז התרגילים והסינון</h2>

      {/* --- אזור כפתורי הסינון לפי מקצוע --- */}
      <div style={{ marginBottom: '25px' }}>
        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>סנן לפי מקצוע:</label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {subjects.map((sub, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedSubject(sub)}
              style={{
                background: selectedSubject === sub ? '#db2777' : '#131322',
                color: 'white',
                border: '2px solid #db2777',
                padding: '8px 15px',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                width: 'auto'
              }}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* --- תפריט בחירת תרגיל מתוך הרשימה המסוננת --- */}
      <div className="form-group">
        <label>בחרי תרגיל מהרשימה:</label>
        <select 
          value={selectedExId} 
          onChange={(e) => setSelectedExId(e.target.value)}
        >
          {filteredQuestions.map((q) => (
            <option key={q.id} value={q.id} style={{ background: '#0d0d18', color: '#fff' }}>
              {q.title} ({q.subject})
            </option>
          ))}
        </select>
      </div>
      
      {/* --- הצגת פרטי התרגיל הנבחר ואזור כתיבת/העלאת הפתרון --- */}
      <div className="card" style={{ marginTop: '20px' }}>
        <h3 style={{ color: '#06b6d4', marginTop: 0 }}>{currentExercise?.title}</h3>
        <p><strong>נושא:</strong> {currentExercise?.subject}</p>
        <p>{currentExercise?.desc}</p>
        <p><small>📅 תאריך הגשה אחרון: {currentExercise?.dueDate}</small></p>
        
        {/* שדה כתיבת פתרון טקסטואלי / קוד */}
        <label style={{ display: 'block', marginTop: '15px', fontWeight: 'bold', color: '#cffafe' }}>כתיבת קוד / פתרון טקסטואלי:</label>
        <textarea 
          placeholder="כתבי כאן את הפתרון שלך..."
          value={studentAnswer}
          onChange={(e) => setStudentAnswer(e.target.value)}
        ></textarea>

        {/* שדה העלאת קובץ */}
        <div style={{ margin: '15px 0' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#06b6d4' }}>או העלאת קובץ פתרון:</label>
          <input 
            type="file" 
            onChange={handleFileChange}
            style={{ padding: '8px', background: '#05050a', border: '1px solid rgba(6, 182, 212, 0.4)' }}
          />
          {fileName && <p style={{ color: '#06b6d4', fontSize: '0.9rem' }}>📁 קובץ נבחר: {fileName}</p>}
        </div>
        
        {/* כפתור הגשה סופי */}
        <button onClick={onSubmitTask}>🎯 שלחי את התרגיל למורה</button>
      </div>
    </section>
  );
}