import React, { useEffect } from 'react';
import { Fade } from "react-awesome-reveal";
import $ from 'jquery';
import { Link } from 'react-router-dom';

function Homebody() {
  useEffect(() => {
    return () => {
      $(".hover").mouseleave(function () {
        $(this).removeClass("hover");
      });
    };
  }, []);

  return (
    <div style={{ backgroundColor: '#f5faff', padding: '30px 20px' }}>
      {/* Titre */}
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#0033cc', fontWeight: 'bold', fontSize: '2.2rem' }}>Nos services</h1>
        <p style={{ color: '#444', fontWeight: 'bold', fontSize: '1.1rem' }}>
          Nos services en ligne vous permettent de gagner plus de temps
        </p>
      </header>

      {/* Cartes principales */}
      <Fade triggerOnce cascade direction="up">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '50px'
        }}>
          {/* Carte Produits */}
          <div style={cardStyle('#e6f0ff')}>
            <img src="./c1.png" alt="Produits" style={imageStyle} />
            <div style={cardContentStyle}>
              <h3 style={cardTitle}>Nos Produits Métalliques</h3>
              <p style={cardText}>Portes, tables, abris sur mesure, articles industriels.</p>
              <Link to="/categorie" style={cardLink}>Voir le catalogue →</Link>
            </div>
          </div>

          {/* Carte Commande */}
          <div style={cardStyle('#fff0e6')}>
            <img src="./c2.png" alt="Commande" style={imageStyle} />
            <div style={cardContentStyle}>
              <h3 style={cardTitle}>Commande Simplifiée</h3>
              <p style={cardText}>Commandez vos articles en ligne facilement et rapidement.</p>
              <Link to="/articles" style={cardLink}>Passer une commande →</Link>
            </div>
          </div>

          {/* Carte Devis */}
          <div style={cardStyle('#e6ffe6')}>
            <img src="./c3.png" alt="Devis" style={imageStyle} />
            <div style={cardContentStyle}>
              <h3 style={cardTitle}>Demander un Devis</h3>
              <p style={cardText}>Recevez une estimation claire pour vos projets sous 48h.</p>
              <Link to="/demande-devis" style={cardLink}>Obtenir un devis →</Link>
            </div>
          </div>
        </div>
      </Fade>

      {/* Marquee texte défilant */}
      <div style={{ marginBottom: '30px' }}>
        <marquee scrollAmount="20" behavior="scroll" direction="left">
          <p style={{ color: '#0033cc', fontWeight: 'bold', fontSize: '1.1rem' }}>
            Chez ABDEDAIEM ARTS MÉTALLIQUES MODERNES, vos produits métalliques disponibles sans vous déplacer.
          </p>
        </marquee>
      </div>

      {/* Cartes services animées */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px'
      }}>
        {serviceCards.map((card, index) => (
          <Fade key={index}>
            <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '20px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', transition: '0.3s' }}>
              <div style={{ marginBottom: '10px' }}>{card.icon}</div>
              <h4 style={{ color: '#003366', fontWeight: 'bold' }}>{card.title}</h4>
              <p style={{ fontSize: '0.95rem', color: '#444' }}>{card.text}</p>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
}

const cardStyle = (bgColor) => ({
  backgroundColor: bgColor,
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  transition: '0.3s'
});

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover'
};

const cardContentStyle = {
  padding: '16px',
  color: '#003366'
};

const cardTitle = {
  fontSize: '1.25rem',
  fontWeight: 'bold',
  marginBottom: '10px'
};

const cardText = {
  fontSize: '0.95rem',
  marginBottom: '12px'
};

const cardLink = {
  color: '#ff7f00',
  textDecoration: 'none',
  fontWeight: 'bold'
};

const serviceCards = [
  {
    title: 'Catalogue varié',
    text: 'Cabines, abris, portes, tables, articles décoratifs...',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} fill="#0033cc" viewBox="0 0 24 24"><path d="M4 4h16v2H4zm0 4h10v2H4zm0 4h16v2H4zm0 4h10v2H4z" /></svg>
  },
  {
    title: 'Commande en ligne',
    text: 'Configurez et commandez depuis la plateforme.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} fill="#ff7f00" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10
    0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7.2
    14h10.8l1.1-5H6.1zM18.3 6l-1.3-3H5v2h10.3l1.6 4H6.2l-1.2 6H18v-2H7.5z" /></svg>
  },
  {
    title: 'Obtenez votre devis',
    text: 'Demande en ligne pour une estimation personnalisée.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} fill="#4CAF50" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2
    2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9
    2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-4-6H7v-2h8v2z" /></svg>
  },
  {
    title: 'Accompagnement personnalisé',
    text: 'Notre équipe vous conseille pour vos projets.',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} fill="#1976D2" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4S14.21
    4 12 4 8 5.79 8 8s1.79 4 4
    4zm0 2c-2.67 0-8 1.34-8
    4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
  }
];

export default Homebody;
