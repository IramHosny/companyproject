import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // contient le rôle

  if (!token || !user) return <Navigate to="/login" />;

  // Vérifie si le rôle de l'utilisateur est autorisé
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />; // ou page d’accueil
  }

  return children;
};

export default PrivateRoute;