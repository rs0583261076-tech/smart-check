import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export function CreateExercise() {
  // שליפת הפונקציה להוספת תרגיל ושאר הנתונים מהקונטקסט
  const { addExercise } = useApp();
  
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [desc, setDesc] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !subject) {
      alert('נא למלא לפחות שם תרגיל ומקצוע!');
      return;
    }
    
    // קריאה לפונקציה להוספת התרגיל
    addExercise({ 
      id: Date.now().toString(), 
      title, 
      subject, 
      desc, 
      dueDate: dueDate || '01.07.2026' 
    });

    setTitle('');
    setSubject('');
    setDesc('');
    setDueDate('');
    alert('🎉 התרגיל נוצר בהצלחה ונוסף למערכת!');
  };

  return (
    <section className="page-section">
      <h2>✨ יצירת תרגיל חדש (למורה)</h2>
      <form onSubmit={handleSubmit}>
        <label>שם התרגיל: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="למשל: תרגיל מתקדם ב-React" /></label>
        <label>מקצוע / נושא (Subject): <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="למשל: מדעי המחשב" /></label>
        <label>תיאור התרגיל: <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="כתוב את ההנחיות לתרגיל..." /></label>
        <label>תאריך הגשה אחרון: <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} /></label>
        <button type="submit" className="submitBtn">🚀 פרסם תרגיל חדש</button>
      </form>
    </section>
  );
}