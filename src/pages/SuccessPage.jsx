import React from 'react';
import { useNavigate } from 'react-router-dom';

const Connected = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/designPage');
  };

  return (
    <div style={styles.container}>
      <h1>✅ Canva Successfully connected!</h1>
      <button style={styles.button} onClick={handleClick}>
        Go to Design Page
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  }
};

export default Connected;
