import React from 'react';
import { useSelector } from 'react-redux';
import ArticleCard from './ArticleCard';
import { useParams } from 'react-router-dom';

function ArticleList({ ping, setping }) {
  const { cat } = useParams(); // catégorie depuis l'URL
  const articles = useSelector((state) => state.article?.articlelist);

  // Filtrer les articles par catégorie uniquement
  const cat_articles = articles?.filter((el) => el?.catégorie === cat);
  const nb_article = cat_articles?.length || 0;

  return (
    <div>
      {nb_article > 0 ? (
        <div
          className="article_list"
          style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}
        >
          {cat_articles.map((el) => (
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
