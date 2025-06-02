import React, { useEffect } from 'react'
import './fcss/Homebody.css'
import { Fade } from "react-awesome-reveal";
import $ from 'jquery'
import { Link } from 'react-router-dom';

function Homebody() {
      useEffect(() => {
      
        return () => {
          $(".hover").mouseleave(
            function() {
              $(this).removeClass("hover");
            }
          );
        }
      }, [])
      
  return (
    <div className='homebody'>
        <header className="header">
          <h1 style={{color:'rgb(0 44 253)',fontWeight:'bold'}}>Nos services</h1>
          <p style={{color:'black', fontWeight:'bold'}}>Nos services en ligne vous permettent de gagner plus de temps</p>
        </header>
        <Fade triggerOnce cascade direction='up'>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white">
  {/* Carte Produits */}
  <div className="rounded-2xl overflow-hidden shadow-lg bg-blue-50 hover:shadow-xl transition duration-300">
    <img src="./c1.png" alt="Produits métalliques" className="w-full h-64 object-cover" />
    <div className="p-5 text-blue-900">
      <h3 className="text-xl font-bold mb-2">Nos Produits Métalliques</h3>
      <p className="text-sm mb-4">
        Découvrez nos créations : portes métalliques, tables robustes, abris sur mesure et bien d’autres fabrications industrielles.
      </p>
      <Link to="/catalogue" className="inline-block text-blue-700 font-semibold hover:underline">
        Voir le catalogue →
      </Link>
    </div>
  </div>

  {/* Carte Commande */}
  <div className="rounded-2xl overflow-hidden shadow-lg bg-blue-50 hover:shadow-xl transition duration-300">
    <img src="./c2.png" alt="Passer commande" className="w-full h-64 object-cover" />
    <div className="p-5 text-blue-900">
      <h3 className="text-xl font-bold mb-2">Commande Simplifiée</h3>
      <p className="text-sm mb-4">
        Commandez vos articles métalliques en ligne facilement et en toute sécurité. Livraison rapide assurée.
      </p>
      <Link to="/commande" className="inline-block text-blue-700 font-semibold hover:underline">
        Passer une commande →
      </Link>
    </div>
  </div>

  {/* Carte Devis */}
  <div className="rounded-2xl overflow-hidden shadow-lg bg-blue-50 hover:shadow-xl transition duration-300">
    <img src="./c3.png" alt="Devis en ligne" className="w-full h-64 object-cover" />
    <div className="p-5 text-blue-900">
      <h3 className="text-xl font-bold mb-2">Demander un Devis</h3>
      <p className="text-sm mb-4">
        Obtenez un devis clair et rapide pour vos projets. Notre équipe vous répond sous 48h avec une offre adaptée.
      </p>
      <Link to="/devis" className="inline-block text-blue-700 font-semibold hover:underline">
        Obtenir un devis →
      </Link>
    </div>
  </div>
</div>

        </Fade>
 <div className="container">
 <marquee scrollamount="20"
  behavior="scroll"
  direction="left">
  <p className="container-title" style={{color:'rgb(0 44 253)',fontWeight:'bold'}}>
    Chez ABDEDAIEM ARTS MÉTALLIQUES MODERNES, vos produits métalliques disponibles sans vous déplacer.
  </p>
</marquee>

<div className="gradient-cards">
  <Fade>
    <div className="card">
      <div className="container-card bg-blue-box">
        {/* Icône catalogue de produits */}
        <svg xmlns="http://www.w3.org/2000/svg" width={80} height={80} viewBox="0 0 24 24" fill="#74C0FC">
          <path d="M4 4h16v2H4zm0 4h10v2H4zm0 4h16v2H4zm0 4h10v2H4z" />
        </svg>
        <p className="card-title">Catalogue varié</p>
        <p className="card-description">
          Découvrez notre large gamme de produits métalliques sur mesure : cabines, abris, portes, tables, articles décoratifs...
        </p>
      </div>
    </div>
  </Fade>

  <Fade>
    <div className="card">
      <div className="container-card bg-blue-box">
        {/* Icône commande en ligne */}
        <svg xmlns="http://www.w3.org/2000/svg" width={80} height={80} viewBox="0 0 24 24" fill="#FFD43B">
          <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 
          0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.2 
          14h10.8l1.1-5H6.1zM18.3 6l-1.3-3H5v2h10.3l1.6 4H6.2l-1.2 6H18v-2H7.5z"/>
        </svg>
        <p className="card-title">Commande en ligne</p>
        <p className="card-description">
          Sélectionnez, configurez et commandez directement depuis notre plateforme. Simple, rapide et efficace.
        </p>
      </div>
    </div>
  </Fade>

  <Fade>
    <div className="card">
      <div className="container-card bg-blue-box">
        {/* Icône devis */}
        <svg xmlns="http://www.w3.org/2000/svg" width={80} height={80} viewBox="0 0 24 24" fill="#4CAF50">
          <path d="M19 3H5c-1.1 0-2 .9-2 
          2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 
          2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-4-6H7v-2h8v2z"/>
        </svg>
        <p className="card-title">Obtenez votre devis</p>
        <p className="card-description">
          Faites une demande de devis en ligne pour obtenir une estimation personnalisée et rapide selon vos besoins.
        </p>
      </div>
    </div>
  </Fade>

  <Fade>
    <div className="card">
      <div className="container-card bg-blue-box">
        {/* Icône service personnalisé */}
        <svg xmlns="http://www.w3.org/2000/svg" width={80} height={80} viewBox="0 0 24 24" fill="#1976D2">
          <path d="M12 12c2.21 0 4-1.79 4-4S14.21 
          4 12 4 8 5.79 8 8s1.79 4 4 
          4zm0 2c-2.67 0-8 1.34-8 
          4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        <p className="card-title">Accompagnement personnalisé</p>
        <p className="card-description">
          Notre équipe reste à votre écoute pour vous conseiller dans la conception de vos produits métalliques.
        </p>
      </div>
    </div>
  </Fade>
</div>



      </div>
    </div>
  )
}

export default Homebody