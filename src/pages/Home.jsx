import React from 'react'
import { useState } from 'react';

const Home = () => {
  const [authUrl, setAuthUrl] = useState("");

  const connectCanva = async () => {
  const res = await fetch('http://localhost:4000/auth/canva', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer 8820'
    },
  });
    const data = await res.json();
    setAuthUrl(data.authUrl);
    window.location.href = data.authUrl;
  };
  return (

    <div style={{ textAlign: 'center', marginTop: '80px' }}>
      <h1>Canva OAuth Integration</h1>
      <button onClick={connectCanva}>Connect to Canva</button>
    </div>
 
  )
}

export default Home