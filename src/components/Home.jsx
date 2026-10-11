import React, { useState } from 'react';

export function Home({ onLoginAttempt, onGoToRegister }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLoginAttempt(usernameInput, passwordInput);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* --- אזור האודות והרעיון של האתר --- */}
      <section className="page-section">
        <h2>✨ ברוכים הבאים למערכת הפיתוח והתרגילים</h2>
        
        <div className="about-box">
          <h3 style={{ color: '#06b6d4', marginTop: 0 }}>למה אנחנו כאן?</h3>
          <p>
            החזון שלנו הוא לא סתם לכתוב קוד, אלא ליצור חוויית למידה אמיתית, חלקה ומתקדמת. 
            המערכת משלבת עולמות תוכן טכנולוגיים עמוקים – החל מבסיסי נתונים, דרך פיתוח ממשקים ב-React 
            ועעד לפתרון תרגילים מורכבים ברמת קצה.
          </p>
        </div>

        <div className="card" style={{ padding: '25px' }}>
          <h3 style={{ color: '#db2777', marginTop: 0 }}>השילוב המנצח של טכניקה וחזון</h3>
          <p style={{ lineHeight: '1.7', color: '#cbd5e1', margin: 0 }}>
            האתר הזה נבנה כדי לתת מענה אמיתי ומדויק לצרכים של מתכנתות שלומדות לעומק. אנחנו מאמינים 
            שבעזרת שילוב נכון של מבנה נקי, עיצוב אפלולי ויוקרתי (בלי שום רקע לבן מציק!), ולוגיקה חכמה – 
            הלמידה הופכת להרפתקה טכנולוגית אמיתית ומספקת.
          </p>
        </div>

        {/* כפתור שפותח את החלון הקופץ */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{ fontSize: '1.2rem', padding: '15px 35px' }}
          >
            כניסה למערכת 🔐
          </button>
        </div>
      </section>

      {/* --- חלון קופץ (Popup / Modal) להתחברות --- */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(2, 2, 5, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.3s ease'
        }}>
          <div className="card" style={{ 
            width: '100%', 
            maxWidth: '420px', 
            padding: '35px', 
            position: 'relative',
            boxShadow: '0 25px 60px rgba(0,0,0,0.9)'
          }}>
            {/* כפתור סגירה */}
            <button 
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '15px',
                left: '15px',
                background: 'transparent',
                border: 'none',
                color: '#cbd5e1',
                fontSize: '1.2rem',
                cursor: 'pointer',
                padding: '5px 10px'
              }}
            >
              ✕
            </button>

            <h3 style={{ color: '#06b6d4', marginTop: 0, textAlign: 'center', marginBottom: '25px' }}>
              🔐 התחברות למערכת
            </h3>

            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#cffafe' }}>
                  שם משתמש:
                </label>
                <input 
                  type="text" 
                  placeholder="הקלידי שם משתמש..." 
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  required
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.95rem', color: '#cffafe' }}>
                  סיסמה:
                </label>
                <input 
                  type="password" 
                  placeholder="הקלידי סיסמה ..." 
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" style={{ flex: 1 }}>
                  התחברי 🚀
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  style={{ background: '#131322', border: '1px solid rgba(255,255,255,0.2)', flex: 1 }}
                >
                  ביטול
                </button>
              </div>

              {/* כפתור מעבר להרשמה למי שאין קוד */}
              <div style={{ textAlign: 'center', marginTop: '15px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
                <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#94a3b8' }}>אין לך עדיין חשבון?</p>
                <button 
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    onGoToRegister();
                  }}
                  style={{ 
                    background: 'transparent', 
                    border: '1px solid #db2777', 
                    color: '#f472b6',
                    width: '100%',
                    padding: '10px',
                    borderRadius: '12px',
                    fontWeight: 'bold'
                  }}
                >
                  הירשמי עכשיו ✨
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}