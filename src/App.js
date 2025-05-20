
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Home from './components/Home';
import Navbarr from './components/Navbarr';
import ChatBott from './components/ChattBott';
import CatalogueProduits from './components/CatalogueProduits';
import ProduitCard from './components/ProduitCard';
import ProduitDetail from './components/ProduitDetail';

function App() {
  return (
    <div className="App">
      <Navbarr/>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="about" element={ <About/>} />
    <Route path="contact" element={<Contact/>}/> 
    <Route path="/chat" element={<ChatBott/>}/> 
     <Route path="/catalogue" element={<CatalogueProduits/>}/> 
      <Route path="/table_chaise" element={<ProduitCard/>}/> 
       <Route path="/détail_prod" element={<ProduitDetail/>}/> 
     </Routes>
      <Footer/>
    </div>
  );
}

export default App;
