import React from 'react';
import './fcss/ArticleCard.css';
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
    <div className="article-card-wrapper">
      <div className="article-card big">
        <img className="article-image-top" src={article?.image} alt="Article" />
        <div className="article-body">
          <h3 className="article-title">{article?.name}</h3>
          <p className="article-description">{article?.description}</p>
          <span className="price-tag">{article?.prix} DT</span>
          <div className="article-buttons">
            {(!isAuth || user?.role === "user") && (
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                🛒 Ajouter au panier
              </button>
            )}
            <button className="details-btn" onClick={() => navigate(`/article/${article._id}`)}>
  🔍 Voir les détails
</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
