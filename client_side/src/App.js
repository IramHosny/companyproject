
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
import AdminPromotions from './components/AdminPromotions';
import { getPromotions } from './redux/promotionSlice';
import PublicPromotions from './components/PublicPromotions';
import ServicePage from './components/ServicePage';
import DemandeDevis from './components/DemandeDevis';
import AdminDevis from './components/AdminDevis';
import HistoriqueDevis from './components/HistoriqueDevis';
import DemandePersonnalisee from './components/DemandePersonnalisee';
import MesDemandesPerso from './components/MesDemandesPerso';
import AdminDemandesPerso from './components/AdminDemandesPerso';
import TousLesArticles from './components/TousLesArticles';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import MesNotifications from './components/MesNotifications';
import {getNotifications } from './redux/notificationSlice';

function App() {
 const dispatch = useDispatch();
const [ping, setping] = useState(false);
const { user } = useSelector((state) => state.user);

useEffect(() => {
  dispatch(getusers());
  dispatch(userCurrent());
  dispatch(getarticle());
  dispatch(getorders());
  dispatch(getPromotions());
}, [ping]);

useEffect(() => {
  if (user && user.email) {
    dispatch(getNotifications(encodeURIComponent(user.email)));
  }
}, [user]);

  return (
    <div className="App">
      <Navbarr/>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="about" element={ <About/>} />
    <Route path="contact" element={<Contact/>}/> 
    <Route path="/chat" element={<ChatBott/>}/> 
     <Route path="/:cat/articles" element={<ArticleList ping={ping} setping={setping} />} />
     <Route path="/promotions" element={<PublicPromotions />} />
  <Route path="/login" element={<Login />} />
   <Route path="/subscribe" element={<Subscribe />} />
   <Route path="/service" element={<ServicePage />} />
   <Route path="/userprofile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
    <Route path="/artiadmin" element={<PrivateRoute><ArticleListAdmin  ping={ping} setping={setping} /></PrivateRoute>} />
     <Route path="dashboard/userslist" element={ <PrivateRoute><UsersList/></PrivateRoute>}/>
     <Route path="/panier" element={<PrivateRoute><Panier /></PrivateRoute>} />
    <Route path="/clientorders" element={<PrivateRoute><ClientOrders /></PrivateRoute>} />
      <Route path="/adminorders" element={<PrivateRoute><AdminOrders /></PrivateRoute>} />
      <Route path="/admin/promotions" element={
  <PrivateRoute>
    <AdminPromotions />
  </PrivateRoute>
} />
<Route
  path="/demande-devis"
  element={
    <PrivateRoute>
      <DemandeDevis />
    </PrivateRoute>
  }
/>
<Route
  path="/admin/devis"
  element={
    <PrivateRoute allowedRoles={["admin"]}>
      <AdminDevis />
    </PrivateRoute>
  }
/>
<Route
  path="/mesnotifications"
  element={
    <PrivateRoute >
      <MesNotifications email={user?.email} />
    </PrivateRoute>
  }
/>
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password/:token" element={<ResetPassword />} />
<Route
  path="/demande-personnalisee"
  element={
    <PrivateRoute>
      <DemandePersonnalisee />
    </PrivateRoute>
  }
/>
<Route
  path="/admin/demandes-personnalisees"
  element={
    <PrivateRoute>
      <AdminDemandesPerso />
    </PrivateRoute>
  }
/>
<Route path="/articles" element={<TousLesArticles />} />

<Route path="/mes-demandes" element={<MesDemandesPerso />} />
<Route path="/mesdevis" element={<HistoriqueDevis />} />
      <Route path="/article/:id" element={<DetailArticle />} />
<Route path="/categorie" element={<CategorieSection />} />
     </Routes>
      <Footer/>
    </div>
  );
}

export default App;
