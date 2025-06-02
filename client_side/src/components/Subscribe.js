import React, { useState } from 'react'
import './fcss/Subscribe.css'
import { userRegister } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


function Subscribe() {
  const dispatch = useDispatch();
  //redirection 
  const navigate = useNavigate();
  //state register
  const [register, setregister] = useState({
    name : "",
    lastname : "" , 
    adress: "",
    phonenumber : "",
    email : "" ,
    password :"" ,
    role : "user"
  });
  return (
    <div className='subscribe'>
      <img src="./sub.png" alt="" width={'40%'} height={'auto'} />
        <form onSubmit={(e)=>e.preventDefault()}>
          <div className="container">
            <h1>Devenir notre client</h1>
            <p>Créer un nouveau compte:</p>
            <label htmlFor="email"><b>Nom </b></label>
            <input type="text" name="nom" placeholder="Entrer votre nom" onChange={(e)=> setregister({...register,lastname : e.target.value})} required  />
            <label htmlFor="email"><b>Prénom</b></label>
            <input type="text" name="prenom" placeholder="Entrer votre prénom" onChange={(e)=> setregister({...register,name : e.target.value})} required />
            <label htmlFor="email"><b>Adresse </b></label>
            <input type="text" name="adress" placeholder="Entrer votre adresse" onChange={(e)=> setregister({...register,adress : e.target.value})} required />
            <label htmlFor="email"><b>Email</b></label>
            <input type="text" placeholder="Entrer votre email" name="email" onChange={(e)=> setregister({...register,email : e.target.value})} required/>
            <label htmlFor="psw"><b>Mot de passe</b></label>
            <input type="password" placeholder="Entrer votre mot de passe" name="psw" onChange={(e)=> setregister({...register,password : e.target.value})} required />
            <label htmlFor="email"><b>Numéro de téléphone</b></label>
            <br />
            <input type="phone" name="phone" placeholder={12345678} onChange={(e)=> setregister({...register,phonenumber : e.target.value})} required />
            <div className="clearfix">
              <button type="submit" className="btn" onClick={() => {dispatch(userRegister(register));
              setTimeout(() => {
                navigate("/userProfile")
              }, 1000);
              }}>S'inscrire</button>
            </div>
          </div>
        </form>
      </div>

  )
}

export default Subscribe