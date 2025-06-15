import React, { useState } from 'react';
import './fcss/Subscribe.css';
import { userRegister } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Zoom } from 'react-awesome-reveal';

function Subscribe() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, setregister] = useState({
    name: "",
    lastname: "",
    adress: "",
    phonenumber: "",
    email: "",
    password: "",
    role: "user"
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-100 py-12 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center items-center">
          <img
  src="/./slogo.png"
  alt="logo"
  className="w-100 h-auto mb-6 rounded-xl shadow-lg border border-gray-200 backdrop-blur-sm bg-white/60 p-2"
/>

          
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <Zoom triggerOnce>
            <div className="text-center mb-4">
              <h1 className="text-3xl font-bold text-orange-600">Devenir notre client</h1>
              <p className="text-sm text-gray-600">Créer un nouveau compte :</p>
            </div>
          </Zoom>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-sm">Nom</label>
              <input type="text" placeholder="Entrer votre nom" onChange={(e) => setregister({ ...register, lastname: e.target.value })} className="w-full border border-orange-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400" required />
            </div>
            <div>
              <label className="block font-semibold text-sm">Prénom</label>
              <input type="text" placeholder="Entrer votre prénom" onChange={(e) => setregister({ ...register, name: e.target.value })} className="w-full border border-orange-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400" required />
            </div>
          </div>

          <label className="block font-semibold text-sm">Adresse</label>
          <input type="text" placeholder="Entrer votre adresse" onChange={(e) => setregister({ ...register, adress: e.target.value })} className="w-full border border-orange-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400" required />

          <label className="block font-semibold text-sm">Email</label>
          <input type="email" placeholder="Entrer votre email" onChange={(e) => setregister({ ...register, email: e.target.value })} className="w-full border border-orange-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400" required />

          <label className="block font-semibold text-sm">Mot de passe</label>
          <input type="password" placeholder="Entrer votre mot de passe" onChange={(e) => setregister({ ...register, password: e.target.value })} className="w-full border border-orange-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400" required />

          <label className="block font-semibold text-sm">Numéro de téléphone</label>
          <input type="tel" placeholder="12345678" onChange={(e) => setregister({ ...register, phonenumber: e.target.value })} className="w-full border border-orange-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400" required />

          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-300"
              onClick={() => {
                dispatch(userRegister(register));
                setTimeout(() => {
                  navigate("/userProfile");
                }, 1000);
              }}
            >
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Subscribe;