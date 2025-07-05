import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';

function ArticleCard({ article }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);
  const isAuth = localStorage.getItem("token");

const handleAddToCart = () => {
  if (user) {
    dispatch(addToCart(article));
    navigate("/panier");
  } else {
    navigate("/unauthorized");
  }
};


  const handleDemandeDevis = () => {
    navigate("/demande-devis", {
      state: {
        preselectedArticles: [
          {
            reference: article.reference,
            quantite: 1,
            description: article.description || ""
          }
        ]
      }
    });
  };

  const isProduitIndustriel = article?.categorie === "produit_industriel";

  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <div style={imageContainer}>
          <img
            src={article?.images?.[0] || "/default.jpg"}
            alt={article?.name}
            style={imageStyle}
            onError={(e) => (e.target.src = "/default.jpg")}
          />
        </div>

        <div style={bodyStyle}>
          <div
            style={{
              flexGrow: 1,
              minHeight: article?.prix ? '150px' : 'auto',
            }}
          >
            <h3 style={titleStyle}>{article?.name}</h3>
            <p style={refStyle}>Réf : {article?.reference || "Aucune"}</p>
            <p style={descStyle}>{article?.description}</p>
            <span style={priceStyle}>
              {article?.prix ? (
                `${article.prix} DT`
              ) : isProduitIndustriel ? (
                <button onClick={handleDemandeDevis} style={btnDetailsStyle}>
                  📄 Demander un devis
                </button>
              ) : (
                <em style={{ color: "#777" }}>Sur demande</em>
              )}
            </span>
          </div>

          <div style={btnGroupStyle}>
          {isAuth !== null && user?.role === "user" && (
  <button style={btnCartStyle} onClick={handleAddToCart}>
    🛒 Ajouter au panier
  </button>
)}
            <button
              style={btnDetailsStyle}
              onClick={() => navigate(`/article/${article._id}`)}
            >
              🔍 Voir les détails
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const wrapperStyle = {
  padding: '15px',
  display: 'flex',
  justifyContent: 'center',
  height: '100%',
};

const cardStyle = {
  width: '260px',
  height: '500px',
  display: 'flex',
  flexDirection: 'column',
  background: 'linear-gradient(145deg, #fff5f0, #ffe3d3)',
  borderRadius: '16px',
  boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
  overflow: 'hidden',
};

const imageContainer = {
  width: '100%',
  height: '160px',
  overflow: 'hidden',
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

const bodyStyle = {
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flexGrow: 1,
};

const titleStyle = {
  fontSize: '1.1rem',
  fontWeight: 'bold',
  color: '#ff7f00',
  marginBottom: '5px',
};

const refStyle = {
  fontSize: '0.85rem',
  color: '#666',
  marginBottom: '8px',
};

const descStyle = {
  fontSize: '0.9rem',
  color: '#333',
  marginBottom: '10px',
  height: '45px',
  overflow: 'hidden',
};

const priceStyle = {
  fontSize: '1.1rem',
  fontWeight: 'bold',
  color: '#0033cc',
  marginBottom: '10px',
};

const btnGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const btnCartStyle = {
  backgroundColor: '#ff7f00',
  color: '#fff',
  padding: '8px 12px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '0.9rem',
};

const btnDetailsStyle = {
  backgroundColor: '#fff',
  border: '2px solid #0033cc',
  color: '#0033cc',
  padding: '8px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '0.9rem',
};

export default ArticleCard;
