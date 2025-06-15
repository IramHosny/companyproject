import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/user/reset-password/${token}`, { password });
      alert("Mot de passe mis à jour !");
      navigate('/login');
    } catch (error) {
      alert("Lien invalide ou expiré.");
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2>🔁 Nouveau mot de passe</h2>
        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Mettre à jour</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
