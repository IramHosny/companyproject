
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Home from './components/Home';
import Navbarr from './components/Navbarr';
import ChatBott from './components/ChattBott';
import Panier from './components/Panier';
import { getorders } from './redux/orderSlice';
import ClientOrders from './components/ClientOrders';
import AdminOrders from './components/AdminOrders';
import ArticleList from './components/ArticleList';
import { getarticle } from './redux/articleSlice';
import ArticleListAdmin from './components/ArticleListAdmin';
import UsersList from './components/UsersList';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import PrivateRoute from './routes/PrivateRoute';
import Dashboard from './components/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getusers } from './redux/usersSlice';
import { userCurrent } from './redux/userSlice';
import Subscribe from './components/Subscribe';
import DetailArticle from './components/DetailArticle';
   import CategorieSection from './components/CategorieSection';

function App() {
  const dispatch = useDispatch();
  const [ping, setping] = useState(false);

  useEffect(() => {
    dispatch(getusers());
    dispatch(userCurrent());
    dispatch(getarticle());
    dispatch(getorders());

  }, [ping]);
  return (
    <div className="App">
      <Navbarr/>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="about" element={ <About/>} />
    <Route path="contact" element={<Contact/>}/> 
    <Route path="/chat" element={<ChatBott/>}/> 
     <Route path="/:cat/articles" element={<ArticleList ping={ping} setping={setping} />} />
  <Route path="/login" element={<Login />} />
   <Route path="/subscribe" element={<Subscribe />} />
   <Route path="/userprofile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
    <Route path="/artiadmin" element={<PrivateRoute><ArticleListAdmin /></PrivateRoute>} />
     <Route path="dashboard/userslist" element={ <PrivateRoute><UsersList/></PrivateRoute>}/>
     <Route path="/panier" element={<PrivateRoute><Panier /></PrivateRoute>} />
    <Route path="/clientorders" element={<PrivateRoute><ClientOrders /></PrivateRoute>} />
      <Route path="/adminorders" element={<PrivateRoute><AdminOrders /></PrivateRoute>} />
      <Route path="/article/:id" element={<DetailArticle />} />
<Route path="/categorie" element={<CategorieSection />} />
     </Routes>
      <Footer/>
    </div>
  );
}

export default App;
