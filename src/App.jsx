import React from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import './App.css';

// ייבוא הקונטקסט המרכזי
import { AppProvider, useApp } from './context/AppContext.jsx';

import { Home } from './components/Home.jsx';
import { Stats } from './components/Stats.jsx';
import { StudentsTable } from './components/StudentsTable.jsx';
import { Enrollment } from './components/Enrollment.jsx';
import { Exercises } from './components/Exercises.jsx';
import { Feedback } from './components/Feedback.jsx';
import { ExerciseDetail } from './components/ExerciseDetail.jsx';
import { StudentGrades } from './components/StudentGrades.jsx';
import { CreateExercise } from './components/CreateExercise.jsx';
import { PendingSubmissions } from './components/PendingSubmissions.jsx';

function AppContent() {
  const navigate = useNavigate();
  
  // שליפת הנתונים והפונקציות מהקונטקסט המרכזי (כולל handleLogout המתוקן)
  const {
    currentUserRole,
    setUsername, setEimel, setPon, setId,
    handleSystemLogin, handleLogout, login
  } = useApp();

  return (
    <div className="app">
      <header>
        <h1 className="brand">🦄 אתר התלמידים והמורים</h1>
        <nav>
          <Link to="/"><button>🏠 דף הבית</button></Link>

          {currentUserRole === 'teacher' && (
            <>
              <Link to="/stats"><button>📊 נתונים</button></Link>
              <Link to="/students"><button>👥 טבלת תלמידים</button></Link>
              <Link to="/create-exercise"><button>➕ צור תרגיל</button></Link>
              <Link to="/grades"><button>📈 ציוני כל התלמידים</button></Link>
              <Link to="/pending-tasks"><button>📥 תרגילים לבדיקה</button></Link>
            </>
          )}

          {currentUserRole !== 'teacher' && currentUserRole !== 'none' && (
            <>
              <Link to="/exercises"><button>💻 התרגילים שלי</button></Link>
              <Link to="/my-done-tasks"><button>📁 התרגילים שעשיתי</button></Link>
              <Link to="/grades"><button>📈 הציון שלי</button></Link>
              <Link to="/feedback"><button>🌟 משוב</button></Link>
            </>
          )}

          {currentUserRole !== 'none' && (
            <button 
              onClick={() => { 
                handleLogout(); 
                navigate('/'); 
              }} 
              style={{ backgroundColor: '#ff4d4d', color: 'white', fontWeight: 'bold' }}
            >
              🚪 התנתק
            </button>
          )}
        </nav>
      </header>

      <main>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                onLoginAttempt={(user, pass) => {
                  const success = handleSystemLogin(user, pass);
                  if (success) {
                    navigate(user === "מורה" ? '/stats' : '/exercises');
                  }
                }} 
                onGoToRegister={() => navigate('/enroll')} 
              />
            } 
          />

          <Route 
            path="/enroll" 
            element={
              <Enrollment 
                setUsername={setUsername} setEimel={setEimel} setPon={setPon} setId={setId} 
                login={() => { login(); navigate('/exercises'); }} 
              />
            } 
          />

          <Route 
            path="/exercises" 
            element={currentUserRole !== 'none' ? <Exercises /> : <Navigate to="/" replace />} 
          />

          <Route 
            path="/my-done-tasks" 
            element={currentUserRole !== 'none' ? <ExerciseDetail /> : <Navigate to="/" replace />} 
          />

          <Route 
            path="/grades" 
            element={currentUserRole !== 'none' ? <StudentGrades /> : <Navigate to="/" replace />} 
          />

          <Route 
            path="/stats" 
            element={currentUserRole === 'teacher' ? <Stats /> : <Navigate to="/" replace />} 
          />

          <Route 
            path="/students" 
            element={currentUserRole === 'teacher' ? <StudentsTable /> : <Navigate to="/" replace />} 
          />

          <Route 
            path="/create-exercise" 
            element={currentUserRole === 'teacher' ? <CreateExercise /> : <Navigate to="/" replace />} 
          />

          <Route 
            path="/pending-tasks" 
            element={currentUserRole === 'teacher' ? <PendingSubmissions /> : <Navigate to="/" replace />} 
          />

          <Route 
            path="/feedback" 
            element={currentUserRole !== 'none' ? <Feedback /> : <Navigate to="/" replace />} 
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

// עטיפת האפליקציה כולה בתוך ה-AppProvider
export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}