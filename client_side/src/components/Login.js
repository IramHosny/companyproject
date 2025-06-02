import React, {useState} from 'react'
import './fcss/Login.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../redux/userSlice';


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //state login 
  const [login, setlogin] = useState({
    email : "" ,
    password :"" , 
  })
  const isAuth = localStorage.getItem('token');

  return (
    <>
    {!isAuth?(
      <div className='login'>
<div className="login-container">
        <div className="login-content">
          <div className="login-content_header">
            <span className="logo">
              <box-icon type="solid" name="landscape" color="#87A922" /> Bon retour ! 
            </span>
            <h2>Se connecter</h2>
          </div>
          <div>
            <form className="login-form" onSubmit={(e)=> e.preventDefault()}>
              <input type="email" placeholder="email" onChange={(e)=> setlogin({...login,email : e.target.value})}/>
              <input type="password" placeholder="mot de passe" onChange={(e)=> setlogin({...login,password : e.target.value})}/>

              <input type="submit"  onClick={() => {dispatch(userLogin(login)); 
               setTimeout(() => {
                navigate("/")
              }, 1000); } }/>
            </form>
            <div className="login-netoworks">
              <p>Vous n'avez pas un compte? <Link to="/subscribe"><span>S'inscrire</span></Link></p>
              <div className="login-or"><hr /></div>
              
            </div>
          </div>
        </div>
        
      </div>
    </div>
    ):
    (login?.email === 'admin@gmail.com' ? (
        navigate('/dashboard')
      ) : (
        navigate('/')
    ))}
    
    </>
  )
}

export default Login