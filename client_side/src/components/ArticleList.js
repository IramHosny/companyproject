import React from 'react';
import { useSelector } from 'react-redux';
import ArticleCard from './ArticleCard';
import { useParams } from 'react-router-dom';

function ArticleList({ ping, setping }) {
  const { cat } = useParams();
  const articles = useSelector((state) => state.article?.articlelist || []);

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
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '20px',
            alignItems: 'stretch',
            padding: '20px',
          }}
        >
          {filteredArticles.map((el) => (
            <div key={el._id} style={{ height: '100%' }}>
              <ArticleCard article={el} />
            </div>
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
