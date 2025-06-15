import React from 'react';
import { Zoom, Bounce } from 'react-awesome-reveal';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Homebody from './Homebody';
import ChattBott from './ChattBott';

function Home() {
  return (
    <>
      <div style={{
        marginTop: '5%',
        padding: '20px',
        backgroundColor: '#f0f7ff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>

        {/* 🟠 Carousel TEXTUEL (sans image) */}
        <div style={{ width: '90%', maxWidth: '800px', marginBottom: '30px' }}>
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={3500}
            showArrows={false}
            stopOnHover={false}
          >
            <div style={{
              backgroundColor: '#003366',
              padding: '30px',
              borderRadius: '12px',
              color: 'white',
              textAlign: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              🛠️ 10% sur tous les abris métalliques jusqu'à fin juin !
            </div>
            <div style={{
              backgroundColor: '#004080',
              padding: '30px',
              borderRadius: '12px',
              color: 'white',
              textAlign: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              🚪 Portes & cabines prêtes à l’installation – Livraison rapide
            </div>
            <div style={{
              backgroundColor: '#0059b3',
              padding: '30px',
              borderRadius: '12px',
              color: 'white',
              textAlign: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              🎯 Fabrication 100% sur mesure selon vos besoins
            </div>
          </Carousel>
        </div>

        {/* 🎯 Texte principal */}
        <div style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '30px' }}>
          <Zoom triggerOnce>
            <h2 style={{
              fontSize: '2.3rem',
              color: '#003366',
              fontWeight: 'bold',
              marginBottom: '15px'
            }}>
              Vos structures métalliques, <span style={{ color: '#ff7f00' }}>sur mesure</span> et prêtes partout en un clic
            </h2>
          </Zoom>

          <Bounce triggerOnce delay={1500}>
            <h5 style={{ color: '#444', fontSize: '1.5rem', marginBottom: '10px' }}>
              Avec <span style={{ color: '#003366', fontWeight: 'bold', fontSize: '1.7rem' }}>ABDEDAIEM ARTS MÉTALLIQUES MODERNES</span>, optez pour la qualité professionnelle
            </h5>
            <h6 style={{ color: '#666', fontSize: '1.2rem' }}>
              Commandez vos produits en ligne, sans vous déplacer : cabines, abris, portes, tables, articles décoratifs et plus encore.
            </h6>

            <button style={{
              marginTop: '25px',
              backgroundColor: '#ff7f00',
              color: 'white',
              padding: '12px 24px',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background 0.3s ease'
            }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#e66e00'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#ff7f00'}
            >
              Voir nos produits
            </button>
          </Bounce>
        </div>

        {/* 🖼 Image illustrative EN BAS */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <img
            src="./compta.png"
            alt="Illustration"
            style={{
              width: '90%',
              maxWidth: '600px',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
          />
        </div>
      </div>

      {/* 🧩 Sections suivantes */}
      <Homebody />
      <ChattBott />
    </>
  );
}

export default Home;
