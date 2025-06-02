import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './fcss/CategorieSection.css';

const categories = [
  { name: 'portes', label: 'Portes', image: '/images/cat_portes.jpg' },
  { name: 'articles_décoratifs', label: 'Articles décoratifs', image: '/images/cat_decor.jpg' },
  { name: 'cabine', label: 'Cabines', image: '/images/cat_cabines.jpg' },
  { name: 'tables et chaises', label: 'Tables & Chaises', image: '/images/cat_tables.jpg' }
];

function CategorieSection() {
  const articles = useSelector(state => state.article?.articlelist);

  return (
    <div className="categories-wrapper">
      {categories.map((cat) => {
        const catArticles = (articles
          ?.filter(a => a.catégorie === cat.name)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) || [])
          .slice(0, 3);

        return (
          <div className="category-card" key={cat.name}>
            <img src={cat.image} alt={cat.label} className="category-image" />
            <h3>{cat.label}</h3>
            <div className="articles-preview">
              {catArticles.length > 0 ? catArticles.map((a) => (
                <div className="mini-article-card" key={a._id}>
                  <img src={a.image} alt={a.name} />
                  <p className="mini-name">{a.name}</p>
                  <span className="mini-price">{a.prix} DT</span>
                </div>
              )) : (
                <p className="no-data">Aucun article</p>
              )}
            </div>
            <Link to={`/${cat.name}/articles`} className="voir-plus-btn">Voir plus</Link>
          </div>
        );
      })}
    </div>
  );
}

export default CategorieSection;
