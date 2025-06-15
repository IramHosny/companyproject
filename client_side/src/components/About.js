import React, { useEffect } from 'react';
import { Zoom } from 'react-awesome-reveal';
import Team from './Team';

function About() {
  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    // animation de flottement
    styleSheet.insertRule(`
      @keyframes float {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
      }
    `, styleSheet.cssRules.length);
  }, []);

  return (
    <div style={{ background: 'linear-gradient(135deg, #f0f8ff, #fff5f0)', fontFamily: 'sans-serif' }}>
      {/* 🎥 Vidéo intro */}
      <div style={{ overflow: 'hidden', maxHeight: '600px' }}>
        <video autoPlay loop muted style={{ width: '100%', objectFit: 'cover' }}>
          <source src="./couv.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 🌟 Logo agrandi animé */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '60px 20px' }}>
        <img
          src="./slogo.png"
          alt="Logo de l'entreprise"
          style={{
            width: '350px',
            height: 'auto',
            borderRadius: '20px',
            backgroundColor: '#fff',
            padding: '12px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255,127,0, 0.3)',
            animation: 'float 3s ease-in-out infinite'
          }}
        />
      </div>

      {/* 🔹 Cartes infos */}
      <div style={{ padding: '60px 20px', maxWidth: '1100px', margin: 'auto' }}>
        <h2 style={{
          textAlign: 'center',
          color: '#0033cc',
          fontSize: '2.8rem',
          fontWeight: 'bold',
          marginBottom: '50px',
          letterSpacing: '1px',
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
        }}>
          Qui sommes-nous ?
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {/* Carte 1 - Société */}
          <Zoom triggerOnce>
            <div style={cardStyle}>
              <div style={sticker3D}>⚙️</div>
              <h3 style={cardTitle}>Notre société</h3>
              <p style={cardText}>
                <strong style={{ color: '#ff7f00' }}>ABDEDAIEM ARTS MÉTALLIQUES MODERNES</strong> est spécialisée dans la conception, la fabrication et la vente de produits métalliques de haute qualité. Fondée pour allier savoir-faire artisanal et innovation industrielle.
              </p>
            </div>
          </Zoom>

          {/* Carte 2 - Mission */}
          <Zoom triggerOnce>
            <div style={cardStyle}>
              <div style={sticker3DOrange}>🎯</div>
              <h3 style={cardTitle}>Notre mission</h3>
              <p style={cardText}>
                Offrir des solutions métalliques durables, esthétiques et personnalisées. Nous visons l'excellence, la rapidité de service et l'accessibilité en ligne pour tous les projets.
              </p>
            </div>
          </Zoom>

          {/* Carte 3 - Activité */}
          <Zoom triggerOnce>
            <div style={cardStyle}>
              <div style={sticker3DBlue}>🏭</div>
              <h3 style={cardTitle}>Notre activité</h3>
              <p style={cardText}>
                Cabines, abris, portes, tables, rayonnages, articles décoratifs... Nous assurons la conception sur mesure, la fabrication locale, la commande en ligne et la livraison rapide.
              </p>
            </div>
          </Zoom>
        </div>
      </div>

      {/* 👥 Équipe */}
      <Zoom triggerOnce>
        <Team />
      </Zoom>
    </div>
  );
}

// ✅ Styles communs
const cardStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '20px',
  padding: '30px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
  textAlign: 'center',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  border: '1px solid #eee',
};

const cardTitle = {
  fontSize: '1.6rem',
  fontWeight: 'bold',
  color: '#002855',
  margin: '20px 0 10px',
  letterSpacing: '0.5px'
};

const cardText = {
  fontSize: '1.05rem',
  color: '#333',
  lineHeight: '1.75',
  fontWeight: '500'
};

const stickerBase = {
  fontSize: '2.8rem',
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto',
  boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
  marginBottom: '15px',
  transform: 'scale(1)',
  transition: 'transform 0.3s ease-in-out'
};

const sticker3D = { ...stickerBase, backgroundColor: '#ffffff', color: '#003366' };
const sticker3DOrange = { ...stickerBase, backgroundColor: '#ff7f00', color: '#fff' };
const sticker3DBlue = { ...stickerBase, backgroundColor: '#0033cc', color: '#fff' };

export default About;
