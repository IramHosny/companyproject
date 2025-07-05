import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import Navbarr from './components/Navbarr';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import ChatBott from './components/ChattBott';
import Panier from './components/Panier';
import ClientOrders from './components/ClientOrders';
import AdminOrders from './components/AdminOrders';
import ArticleList from './components/ArticleList';
import ArticleListAdmin from './components/ArticleListAdmin';
import UsersList from './components/UsersList';
import Login from './components/Login';
import Subscribe from './components/Subscribe';
import UserProfile from './components/UserProfile';
import Dashboard from './components/Dashboard';
import PrivateRoute from './routes/PrivateRoute';
import DetailArticle from './components/DetailArticle';
import CategorieSection from './components/CategorieSection';
import AdminPromotions from './components/AdminPromotions';
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
import Unauthorized from './components/Unauthorized';

import { getorders } from './redux/orderSlice';
import { getarticle } from './redux/articleSlice';
import { getusers } from './redux/usersSlice';
import { userCurrent } from './redux/userSlice';
import { getPromotions } from './redux/promotionSlice';
import { getNotifications } from './redux/notificationSlice';
import Loading from './components/Loading';

function App() {
  const dispatch = useDispatch();
  const [ping, setping] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  // ⏳ 1. Temps de chargement simulé (ex: 2 secondes)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // 📦 2. Récupération des données
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

  // ✅ 3. Affiche Loading avant tout
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Navbarr />
      <Routes>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chat" element={<ChatBott />} />
        <Route path="/:cat/articles" element={<ArticleList ping={ping} setping={setping} />} />
        <Route path="/promotions" element={<PublicPromotions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/articles" element={<TousLesArticles />} />
        <Route path="/article/:id" element={<DetailArticle />} />
        <Route path="/categorie" element={<CategorieSection />} />

        {/* Routes protégées - utilisateur */}
        <Route
          path="/userprofile"
          element={<PrivateRoute allowedRoles={['user']}><UserProfile /></PrivateRoute>}
        />
        <Route
          path="/panier"
          element={<PrivateRoute allowedRoles={['user']}><Panier /></PrivateRoute>}
        />
        <Route
          path="/clientorders"
          element={<PrivateRoute allowedRoles={['user']}><ClientOrders /></PrivateRoute>}
        />
        <Route
          path="/mesnotifications"
          element={<PrivateRoute allowedRoles={['user']}><MesNotifications email={user?.email} /></PrivateRoute>}
        />
        <Route
          path="/demande-personnalisee"
          element={<PrivateRoute allowedRoles={['user']}><DemandePersonnalisee /></PrivateRoute>}
        />
        <Route
          path="/mes-demandes"
          element={<PrivateRoute allowedRoles={['user']}><MesDemandesPerso /></PrivateRoute>}
        />
        <Route
          path="/mesdevis"
          element={<PrivateRoute allowedRoles={['user']}><HistoriqueDevis /></PrivateRoute>}
        />

        {/* Routes protégées - admin */}
        <Route
          path="/dashboard"
          element={<PrivateRoute allowedRoles={['admin']}><Dashboard /></PrivateRoute>}
        />
        <Route
          path="/artiadmin"
          element={<PrivateRoute allowedRoles={['admin']}><ArticleListAdmin ping={ping} setping={setping} /></PrivateRoute>}
        />
        <Route
          path="/dashboard/userslist"
          element={<PrivateRoute allowedRoles={['admin']}><UsersList /></PrivateRoute>}
        />
        <Route
          path="/adminorders"
          element={<PrivateRoute allowedRoles={['admin']}><AdminOrders /></PrivateRoute>}
        />
        <Route
          path="/admin/promotions"
          element={<PrivateRoute allowedRoles={['admin']}><AdminPromotions /></PrivateRoute>}
        />
        <Route
          path="/demande-devis"
          element={<PrivateRoute allowedRoles={['admin']}><DemandeDevis /></PrivateRoute>}
        />
        <Route
          path="/admin/devis"
          element={<PrivateRoute allowedRoles={['admin']}><AdminDevis /></PrivateRoute>}
        />
        <Route
          path="/admin/demandes-personnalisees"
          element={<PrivateRoute allowedRoles={['admin']}><AdminDemandesPerso /></PrivateRoute>}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
