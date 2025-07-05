import React, { useState, useRef } from 'react';
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

  const [isZoomed, setIsZoomed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [startOffset, setStartOffset] = useState({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });

  const handleAddToCart = () => {
    if (isAuth && user?.role === 'user') {
      dispatch(addToCart(article));
      navigate("/panier");
    } else {
      alert("Seuls les utilisateurs connectés peuvent ajouter au panier.");
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
    <div style={{ backgroundColor: '#f6f8fc', padding: '40px' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        maxWidth: '1100px',
        margin: 'auto',
        background: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
        overflow: 'hidden',
        transition: 'transform 0.3s ease',
      }}>
        {/* 🖼️ Zone image à gauche */}
        <div style={{ flex: 1, padding: '20px', textAlign: 'center', backgroundColor: '#fdfdfd' }}>
          {image360Files.length > 0 ? (
            <Article360 images={image360Files} speed={0.8} />
          ) : (
            <div
              onClick={() => setIsZoomed(true)}
              onDoubleClick={() => {
                setIsZoomed(false);
                setOffset({ x: 0, y: 0 });
              }}
              onMouseDown={(e) => {
                if (!isZoomed) return;
                setIsDragging(true);
                startPos.current = { x: e.clientX, y: e.clientY };
                setStartOffset(offset);
              }}
              onMouseMove={(e) => {
                if (isDragging && isZoomed) {
                  const dx = e.clientX - startPos.current.x;
                  const dy = e.clientY - startPos.current.y;
                  setOffset({ x: startOffset.x + dx, y: startOffset.y + dy });
                }
              }}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              style={{
                width: '100%',
                maxWidth: '450px',
                margin: 'auto',
                cursor: isZoomed ? 'grab' : 'zoom-in',
                overflow: 'hidden',
                borderRadius: '12px',
                transition: 'all 0.3s ease-in-out',
              }}
            >
              <img
                src={article.images?.[current]}
                alt={`Article-${current}`}
                style={{
                  width: '100%',
                  transform: isZoomed
                    ? `scale(2.5) translate(${offset.x}px, ${offset.y}px)`
                    : 'scale(1)',
                  transition: isDragging ? 'none' : 'transform 0.3s ease',
                  pointerEvents: 'none',
                  userSelect: 'none',
                  borderRadius: '10px',
                }}
              />
              {isZoomed && (
                <div style={{
                  position: 'absolute',
                  bottom: 10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#00000088',
                  color: '#fff',
                  padding: '5px 10px',
                  borderRadius: 4,
                  fontSize: '0.8rem'
                }}>
                  🖱️ Glissez pour déplacer — Double clic pour réinitialiser
                </div>
              )}
            </div>
          )}

          {/* miniatures */}
          {image360Files.length === 0 && article.images?.length > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '15px' }}>
              {article.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`thumb-${index}`}
                  style={{
                    width: '50px',
                    height: '50px',
                    objectFit: 'cover',
                    border: index === current ? '2px solid #007bff' : '1px solid #ccc',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setCurrent(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* 📝 Zone texte à droite */}
        <div style={{ flex: 1, padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0033cc', marginBottom: '15px' }}>
            {article.name}
          </h2>
          <p style={{ fontSize: '1rem', color: '#444', lineHeight: '1.6', marginBottom: '20px' }}>
            {article.description}
          </p>
          <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#e67e22', marginBottom: '20px' }}>
            {article.prix} DT
          </div>

          {(!isAuth || user?.role === "user") && (
            <button
              onClick={handleAddToCart}
              style={{
                padding: '12px 24px',
                backgroundColor: '#ff7f00',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
            >
              🛒 Ajouter au panier
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailArticle;
