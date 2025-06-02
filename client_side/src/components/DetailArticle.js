import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import './fcss/DetailArticle.css';

function DetailArticle() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = localStorage.getItem('token');
  const user = useSelector(state => state.user?.user);
  const articles = useSelector(state => state.article?.articlelist);

  const article = articles.find(el => el._id === id);

  const handleAddToCart = () => {
    if (isAuth) {
      dispatch(addToCart(article));
      navigate("/panier");
    } else {
      alert("Veuillez vous connecter pour ajouter au panier.");
    }
  };

  if (!article) return <p style={{ padding: "10%", textAlign: "center" }}>Article introuvable.</p>;

  return (
    <div className="detail-wrapper">
      <div className="detail-card">
        <img className="detail-image" src={article.image} alt="Article" />
        <div className="detail-content">
          <h2>{article.name}</h2>
          <p className="detail-description">{article.description}</p>
          <span className="detail-price">{article.prix} DT</span>
          {(!isAuth || user?.role === "user") && (
            <button className="detail-add-btn" onClick={handleAddToCart}>
              🛒 Ajouter au panier
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailArticle;
