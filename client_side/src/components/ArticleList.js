import React from 'react';
import { useSelector } from 'react-redux';
import ArticleCard from './ArticleCard';
import { useParams } from 'react-router-dom';

function ArticleList({ ping, setping }) {
  const { cat } = useParams(); // catégorie depuis l'URL
  const articles = useSelector((state) => state.article?.articlelist || []);

  // 🔎 Normalisation de la catégorie (insensible à la casse)
  const filteredArticles = cat && cat !== "all"
    ? articles.filter(
        (el) =>
          el?.categorie?.toLowerCase().trim() === cat?.toLowerCase().trim()
      )
    : articles;

  return (
    <div>
      {filteredArticles.length > 0 ? (
        <div
          className="article_list"
          style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}
        >
          {filteredArticles.map((el) => (
            <ArticleCard key={el._id} article={el} />
          ))}
        </div>
      ) : (
        <p style={{ padding: '10%', textAlign: 'center', fontWeight: 'bold' }}>
          Aucun produit disponible pour le moment !
        </p>
      )}
    </div>
  );
}

export default ArticleList;
