import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgot = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/user/forgot-password', { email });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Erreur lors de l'envoi de l'email.");
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2>🔐 Réinitialisation du mot de passe</h2>
        <form onSubmit={handleForgot}>
          <input
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Envoyer</button>
        </form>
        {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;
