import React, { useState, useEffect } from 'react';

function BottomCTA({ role, goToLogin, goToEvents }) {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    if (!role) return;

    setLoading(true);
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data.content);
      } 
      catch (error) {
      console.error('Error fetching quote:', error);

      const fallbackQuotes = [
        '"Leadership is the capacity to translate vision into reality."',
        '"The only way to do great work is to love what you do."',
        '"Success is not final, failure is not fatal."',
        '"Believe you can and you\'re halfway there."',
        '"Act as if what you do makes a difference. It does."'
      ];
      const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
      setQuote(fallbackQuotes[randomIndex]);
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, [role]);

  const handleClick = () => {
    if (role) {
      goToEvents();
    } else {
      goToLogin();
    }
  };

  return (
    <section className="bottom-cta">
      <div className="bottom-cta-content" data-aos="zoom-in" data-aos-duration="800">
        <h2>{role ? 'Welcome back to ClubPilot!' : 'Ready to lead your club?'}</h2>
        
        {role && (
          <>
            <p style={{ 
              fontStyle: 'italic', 
              fontSize: '18px', 
              color: '#cbd5e1',
              maxWidth: '600px',
              margin: '0 auto 8px'
            }}>
              {loading ? '⏳ Loading quote...' : `"${quote}"`}
            </p>
            
            <button 
              onClick={fetchQuote} 
              style={{
                background: 'transparent',
                border: '1px solid #f97316',
                color: '#f97316',
                padding: '4px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginBottom: '16px'
              }}
            >
              {loading ? 'Loading...' : 'New Quote'}
            </button>
          </>
        )}

        <p>
          {role 
            ? 'Manage your events, members, and activities all in one place. Your club dashboard is waiting for you!' 
            : 'Empower your club leaders with the right tools. Start managing your club efficiently today.'}
        </p>
        <button className="btn" onClick={handleClick}>
          {role ? 'Go to Events' : 'Get Started Now'}
        </button>
      </div>
    </section>
  );
}

export default BottomCTA;