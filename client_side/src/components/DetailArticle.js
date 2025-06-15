import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import Article360 from './Article360';

function DetailArticle() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = localStorage.getItem('token');
  const user = useSelector(state => state.user?.user);
  const articles = useSelector(state => state.article?.articlelist);

  const article = articles?.find(el => el._id === id);
  const [current, setCurrent] = useState(0);
  const image360Files = article?.image360Files || [];

  const handleAddToCart = () => {
    if (isAuth) {
      dispatch(addToCart(article));
      navigate("/panier");
    } else {
      alert("Veuillez vous connecter pour ajouter au panier.");
    }
  };

  const nextImage = () => {
    if (article?.images?.length > 0) {
      setCurrent((current + 1) % article.images.length);
    }
  };

  const prevImage = () => {
    if (article?.images?.length > 0) {
      setCurrent((current - 1 + article.images.length) % article.images.length);
    }
  };

  if (!article) {
    return <p style={{ padding: "10%", textAlign: "center" }}>Article introuvable.</p>;
  }

  return (
    <div style={{ backgroundColor: '#fefefe', padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '1000px',
        margin: 'auto',
        background: '#fff5f0',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>

        {/* Image 360 ou normale */}
        <div style={{ padding: '20px', textAlign: 'center' }}>
          {image360Files.length > 0 ? (
            <Article360 images={image360Files} speed={0.8} />
          ) : (
            <img
              src={article.images?.[current]}
              alt={`Article-${current}`}
              style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '12px' }}
            />
          )}

          {image360Files.length === 0 && article.images?.length > 1 && (
            <div style={{ marginTop: '10px' }}>
              <button onClick={prevImage} style={btnArrow}>◀</button>
              <span style={{ margin: '0 10px' }}>Vue {current + 1} / {article.images.length}</span>
              <button onClick={nextImage} style={btnArrow}>▶</button>
            </div>
          )}

          {image360Files.length === 0 && article.images?.length > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', gap: '10px' }}>
              {article.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    border: index === current ? '2px solid #ff7f00' : '1px solid #ccc',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setCurrent(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Détails texte */}
        <div style={{ padding: '25px', backgroundColor: '#ffffff', borderTop: '1px solid #eee' }}>
          <h2 style={{ color: '#0033cc', fontWeight: 'bold', marginBottom: '10px' }}>{article.name}</h2>
          <p style={{ color: '#555', fontSize: '1rem', marginBottom: '15px' }}>{article.description}</p>
          <span style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#ff7f00' }}>{article.prix} DT</span>

          {(!isAuth || user?.role === "user") && (
            <button
              onClick={handleAddToCart}
              style={{
                display: 'block',
                marginTop: '20px',
                padding: '12px 20px',
                backgroundColor: '#ff7f00',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}>
              🛒 Ajouter au panier
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const btnArrow = {
  backgroundColor: '#0033cc',
  color: '#fff',
  border: 'none',
  borderRadius: '6px',
  padding: '5px 12px',
  cursor: 'pointer'
};

export default DetailArticle;