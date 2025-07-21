import React from 'react'
import { useState } from 'react';
import { BASE_URL } from '../../config';

const Home = () => {
  const [authUrl, setAuthUrl] = useState("");

  const connectCanva = async () => {
  const res = await fetch(`${BASE_URL}/auth/canva`, {
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