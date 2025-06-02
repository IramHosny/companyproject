import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userEdit } from '../redux/userSlice';
import './fcss/UserProfile.css';
import Button from 'react-bootstrap/Button';

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
    <div className="profile-container">
      <div className="profile-avatar-container">
        <img
          className="profile-avatar"
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="avatar"
        />
        <h3 className="text-center mt-2">Bonjour {user?.lastname} {user?.name}</h3>
      </div>

      <form className="profile-form">
        <div className="form-group">
          <label>Nom</label>
          <input type="text" defaultValue={user?.lastname} onChange={(e) => setedituser({ ...edituser, lastname: e.target.value })} />
        </div>

        <div className="form-group">
          <label>Prénom</label>
          <input type="text" defaultValue={user?.name} onChange={(e) => setedituser({ ...edituser, name: e.target.value })} />
        </div>

        <div className="form-group">
          <label>Adresse</label>
          <input type="text" defaultValue={user?.adress} onChange={(e) => setedituser({ ...edituser, adress: e.target.value })} />
        </div>

        <div className="form-group">
          <label>Téléphone</label>
          <input type="text" defaultValue={user?.phonenumber} onChange={(e) => setedituser({ ...edituser, phonenumber: e.target.value })} />
        </div>

        <div className="form-group">
          <label>Entreprise</label>
          <input type="text" defaultValue={user?.company} onChange={(e) => setedituser({ ...edituser, company: e.target.value })} />
        </div>

        <div className="form-group">
          <label>Matricule fiscale</label>
          <input type="text" defaultValue={user?.tax_number} onChange={(e) => setedituser({ ...edituser, tax_number: e.target.value })} />
        </div>

        <div className="text-center mt-4">
          <Button variant="primary" onClick={handleSubmit}>Modifier</Button>
        </div>
      </form>
    </div>
  );
}

export default UserProfile;
