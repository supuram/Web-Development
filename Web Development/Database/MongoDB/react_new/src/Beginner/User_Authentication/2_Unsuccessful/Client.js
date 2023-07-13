import React, { useEffect, useState } from 'react';

function App() {
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    fetchWelcomeMessage();
  }, []);

  const fetchWelcomeMessage = async () => {
    try {
      const response = await fetch('/api/welcome');
      const data = await response.text();
      setWelcomeMessage(data);
    } catch (error) {
      console.error('Error fetching welcome message:', error);
    }
  };

  return (
    <div>
      <h1>{welcomeMessage}</h1>
    </div>
  );
}

export default App;