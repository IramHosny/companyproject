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
    if (isAuth) {
      dispatch(addToCart(article));
      navigate("/panier");
    } else {
      alert("Vous devez vous connecter !");
    }
  };

  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <img
          src={article?.images?.[0] || "/default.jpg"}
          alt={article?.name}
          style={imageStyle}
          onError={(e) => (e.target.src = "/default.jpg")}
        />

        <div style={bodyStyle}>
          <h3 style={titleStyle}>{article?.name}</h3>
          <p style={refStyle}>Réf : {article?.reference}</p>
          <p style={descStyle}>{article?.description}</p>
          <span style={priceStyle}>{article?.prix} DT</span>

          <div style={btnGroupStyle}>
            {(!isAuth || user?.role === "user") && (
              <button style={btnCartStyle} onClick={handleAddToCart}>
                🛒 Ajouter au panier
              </button>
            )}
            <button style={btnDetailsStyle} onClick={() => navigate(`/article/${article._id}`)}>
              🔍 Voir les détails
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline styles
const wrapperStyle = {
  padding: '15px',
  perspective: '1000px',
  display: 'flex',
  justifyContent: 'center'
};

const cardStyle = {
  background: 'linear-gradient(145deg, #fff5f0, #ffe3d3)',
  borderRadius: '16px',
  boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
  width: '260px',
  transform: 'rotateY(0)',
  transition: 'transform 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden'
};

const imageStyle = {
  width: '100%',
  height: '170px',
  objectFit: 'cover'
};

const bodyStyle = {
  padding: '15px'
};

const titleStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#ff7f00',
  marginBottom: '5px'
};

const refStyle = {
  fontSize: '0.85rem',
  color: '#666',
  marginBottom: '8px'
};

const descStyle = {
  fontSize: '0.9rem',
  color: '#333',
  marginBottom: '10px',
  minHeight: '50px'
};

const priceStyle = {
  fontSize: '1.1rem',
  fontWeight: 'bold',
  color: '#0033cc',
  display: 'block',
  marginBottom: '10px'
};

const btnGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
};

const btnCartStyle = {
  backgroundColor: '#ff7f00',
  color: '#fff',
  padding: '8px 12px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '0.9rem'
};

const btnDetailsStyle = {
  backgroundColor: '#fff',
  border: '2px solid #0033cc',
  color: '#0033cc',
  padding: '8px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: '0.9rem'
};

export default ArticleCard;
