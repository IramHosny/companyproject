import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userEdit } from '../redux/userSlice';
import './fcss/UserProfile.css';
import { Zoom } from 'react-awesome-reveal';
import { FaUser, FaMapMarkerAlt, FaPhone, FaBuilding, FaIdCard } from 'react-icons/fa';

function UserProfile() {
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();

  const [edituser, setedituser] = useState({
    name: user?.name || "",
    lastname: user?.lastname || "",
    adress: user?.adress || "",
    phonenumber: user?.phonenumber || "",
    email: user?.email || "",
    password: user?.password || "",
    company: user?.company || "",
    tax_number: user?.tax_number || "",
    role: "user"
  });

  const handleSubmit = () => {
    if (!user?._id) return;
    dispatch(userEdit({ id: user._id, edituser }));
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-10 px-4">
      <Zoom triggerOnce>
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-xl">
          <div className="flex flex-col items-center mb-6">
            <img
              className="w-28 h-28 rounded-full border-4 border-orange-400 shadow-lg mb-3 hover:scale-105 transition-transform"
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="avatar"
            />
            <h3 className="text-xl font-bold text-blue-800">
              Bonjour {user?.lastname} {user?.name}
            </h3>
          </div>

          <form className="space-y-4">
            <div className="flex items-center gap-3 bg-orange-50 p-3 rounded-lg border border-orange-200 shadow-sm">
              <FaUser className="text-orange-500" />
              <input
                type="text"
                placeholder="Nom"
                defaultValue={user?.lastname}
                onChange={(e) => setedituser({ ...edituser, lastname: e.target.value })}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div className="flex items-center gap-3 bg-orange-50 p-3 rounded-lg border border-orange-200 shadow-sm">
              <FaUser className="text-orange-500" />
              <input
                type="text"
                placeholder="Prénom"
                defaultValue={user?.name}
                onChange={(e) => setedituser({ ...edituser, name: e.target.value })}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div className="flex items-center gap-3 bg-orange-50 p-3 rounded-lg border border-orange-200 shadow-sm">
              <FaMapMarkerAlt className="text-orange-500" />
              <input
                type="text"
                placeholder="Adresse"
                defaultValue={user?.adress}
                onChange={(e) => setedituser({ ...edituser, adress: e.target.value })}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div className="flex items-center gap-3 bg-orange-50 p-3 rounded-lg border border-orange-200 shadow-sm">
              <FaPhone className="text-orange-500" />
              <input
                type="text"
                placeholder="Téléphone"
                defaultValue={user?.phonenumber}
                onChange={(e) => setedituser({ ...edituser, phonenumber: e.target.value })}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div className="flex items-center gap-3 bg-orange-50 p-3 rounded-lg border border-orange-200 shadow-sm">
              <FaBuilding className="text-orange-500" />
              <input
                type="text"
                placeholder="Entreprise"
                defaultValue={user?.company}
                onChange={(e) => setedituser({ ...edituser, company: e.target.value })}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div className="flex items-center gap-3 bg-orange-50 p-3 rounded-lg border border-orange-200 shadow-sm">
              <FaIdCard className="text-orange-500" />
              <input
                type="text"
                placeholder="Matricule fiscale"
                defaultValue={user?.tax_number}
                onChange={(e) => setedituser({ ...edituser, tax_number: e.target.value })}
                className="w-full p-2 rounded border border-gray-300"
              />
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full shadow"
              >
                Modifier
              </button>
            </div>
          </form>
        </div>
      </Zoom>
    </div>
  );
}

export default UserProfile;