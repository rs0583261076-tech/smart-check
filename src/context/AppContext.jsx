import React, { createContext, useContext, useState } from 'react';

// 1. יצירת הקונטקסט (הישות המרכזית שמרכזת את המידע הגלובלי של האתר)
const AppContext = createContext();

// 2. יצירת רכיב ה-Provider שעוטף את האפליקציה ומספק את הנתונים לכל קומפוננטה שדורשת זאת
export function AppProvider({ children }) {
  
  // --- ניהול ה-State הגלובלי של האתר ---

  // מאגר המשתמשים והתלמידות שנרשמו למערכת
  const [allUsers, setAllUsers] = useState([]);

  // רשימת התרגילים שהוגשו, כולל הציונים והסטטוס שלהם
  const [studentMarks, setStudentMarks] = useState([]);

  // מאגר השאלות והתרגילים הזמינים במערכת
  const [allQuestions, setAllQuestions] = useState([
    // כאן אפשר להכניס שאלות התחלתיות במידת הצורך
  ]);

  // הגדרת תפקיד המשתמש המחובר כרגע ('none' במקום null כדי להתאים לבדיקות ב-App.jsx)
  const [currentUserRole, setCurrentUserRole] = useState('none');

  // שדות נוספים לרישום/משתמש מחובר
  const [username, setUsername] = useState('');
  const [eimel, setEimel] = useState('');
  const [pon, setPon] = useState('');
  const [id, setId] = useState('');

  // --- פונקציות גלובליות נדרשות ---

  // פונקציית התחברות למערכת (מטפלת בכניסה של מורה או תלמיד)
  const handleSystemLogin = (user, pass) => {
    if (user === "מורה" || user === "teacher") {
      setCurrentUserRole('teacher');
      return true;
    } else if (user && pass) {
      setCurrentUserRole('student');
      return true;
    }
    return false;
  };

  // פונקציית התחברות מהירה (למשל מסוף טופס הרשמה)
  const login = () => {
    setCurrentUserRole('student');
  };

  // פונקציית התנתקות (מאפסת את התפקיד ואת פרטי המשתמש)
  const handleLogout = () => {
    setCurrentUserRole('none');
    setUsername('');
    setEimel('');
    setPon('');
    setId('');
  };

  // פונקציה לניהול או בדיקת מבחנים ותרגילים
  const handleExamination = (questionId, answer) => {
    console.log("בודק מבחן עבור שאלה:", questionId);
  };

  // 3. ריכוז כל המשתנים והפונקציות באובייקט אחד שיועבר הלאה
  const value = {
    allUsers,
    setAllUsers,
    studentMarks,
    setStudentMarks,
    allQuestions,
    setAllQuestions,
    currentUserRole,
    setCurrentUserRole,
    username,
    setUsername,
    eimel,
    setEimel,
    pon,
    setPon,
    id,
    setId,
    handleSystemLogin,
    handleLogout,
    login,
    handleExamination
  };

  // החזרת ה-Provider שעוטף את כל הילדים (children) ומנגיש אליהם את הנתונים
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// 4. Custom Hook מותאם אישי שמאפשר לשלוף את הנתונים בקלות מכל קומפוננטה
export function useApp() {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error('useApp חייב להיות בשימוש בתוך AppProvider!');
  }
  
  return context;
}
