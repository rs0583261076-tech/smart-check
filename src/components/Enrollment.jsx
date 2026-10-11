import React from 'react';
import { useApp } from '../context/AppContext';

export function Enrollment() {
  // שולפים את פונקציות העדכון וההתחברות ישירות מהקונטקסט
  const { setUsername, setEimel, setPon, setId, login } = useApp();

  return (
    <section id="enroll" className="page-section">
      <h2>✨ הרשמה למערכת ✨</h2>
      <form className="enrollmentForm" onSubmit={(e) => e.preventDefault()}>
        <label>שם מלא: <input type="text" placeholder="הקלדי שם מלא..." onChange={(e) => setUsername(e.target.value)} /></label>
        <label>אימייל: <input type="email" placeholder="name@example.com" onChange={(e) => setEimel(e.target.value)} /></label>
        <label>פלאפון: <input type="tel" placeholder="050-0000000" onChange={(e) => setPon(e.target.value)} /></label>
        <label>סיסמה: <input type="password" placeholder="בחר סיסמה..." onChange={(e) => setId(e.target.value)} /></label>
        <button type="button" onClick={login}>🚀 הירשמי עכשיו</button>
      </form>
    </section>
  );
}