import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import Fuse from "fuse.js";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

function highlight(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, i) =>
    regex.test(part) ? <mark key={i} style={{ backgroundColor: '#ffe08a' }}>{part}</mark> : part
  );
}

function TousLesArticles() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const articles = useSelector((state) => state.article?.articlelist || []);
  const user = useSelector((state) => state.user?.user);
  const isAuth = localStorage.getItem("token");

  const [query, setQuery] = useState("");
  const [prixMax, setPrixMax] = useState(10000);
  const [selectedCouleur, setSelectedCouleur] = useState("");

  const couleurs = [...new Set(articles.map((a) => a.couleur).filter(Boolean))];
  const knownCategories = ["portes", "articles_décoratifs", "cabine", "tables et chaises"];

  const fuse = useMemo(() => new Fuse(articles, {
    keys: ["name", "description", "categorie", "couleur"],
    threshold: 0.3,
    includeMatches: true,
  }), [articles]);

  const filteredByText = useMemo(() => {
    const lowerQuery = query.toLowerCase();
    if (!query) return articles;
    if (knownCategories.includes(lowerQuery)) {
      return articles.filter(a => a.categorie.toLowerCase() === lowerQuery);
    }
    return fuse.search(query).map(r => r.item);
  }, [query, fuse, articles]);

  const finalFiltered = filteredByText.filter(a => {
    const prix = parseFloat(a.prix);
    return (
      prix <= prixMax &&
      (selectedCouleur ? a.couleur === selectedCouleur : true)
    );
  });

  const handleAddToCart = (article) => {
    if (isAuth) {
      dispatch(addToCart(article));
      navigate("/panier");
    } else {
      alert("Vous devez vous connecter !");
    }
  };

  return (
    <div style={{ backgroundColor: '#fefefe', minHeight: '100vh', padding: '50px 20px' }}>
      <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0033cc', textAlign: 'center', marginBottom: '40px' }}>
        🎯 Explorer nos articles
      </h2>

      {/* Barre de recherche */}
      <div style={{ maxWidth: '600px', margin: '0 auto 30px auto' }}>
        <input
          type="text"
          placeholder="Rechercher : porte, métal, moderne..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '1px solid #ccc',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
      </div>

      {/* Filtre prix */}
      <div style={{ maxWidth: '600px', margin: '0 auto 40px auto' }}>
        <label style={{ display: 'block', fontWeight: '600', color: '#555', marginBottom: '8px' }}>
          Prix maximum : <span style={{ color: '#ff7f00', fontWeight: 'bold' }}>{prixMax} DT</span>
        </label>
        <input
          type="range"
          min={0}
          max={10000}
          step={100}
          value={prixMax}
          onChange={(e) => setPrixMax(e.target.value)}
          style={{ width: '100%', accentColor: '#ff7f00' }}
        />
      </div>

      {/* Résultats filtrés */}
      {finalFiltered.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          {finalFiltered.map((article) => (
            <div
              key={article._id}
              style={{
                background: 'linear-gradient(145deg, #fff5f0, #ffffff)',
                borderRadius: '12px',
                boxShadow: '0 6px 12px rgba(0,0,0,0.08)',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease',
              }}
            >
              <img
                src={article.images?.[0] || "/default.jpg"}
                alt={article.name}
                style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
              />
              <h3 style={{ color: '#0033cc', fontWeight: 'bold', fontSize: '1rem', marginBottom: '4px' }}>
                {highlight(article.name, query)}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#444', marginBottom: '4px' }}>
                {highlight(article.description, query)}
              </p>
              <p style={{ fontSize: '0.75rem', color: '#888', fontStyle: 'italic', marginBottom: '6px' }}>{article.categorie}</p>
              <p style={{ fontWeight: 'bold', color: '#ff7f00', fontSize: '0.95rem' }}>{article.prix} DT</p>

              <div style={btnGroupStyle}>
                {(!isAuth || user?.role === "user") && (
                  <button style={btnCartStyle} onClick={() => handleAddToCart(article)}>
                    🛒 Ajouter au panier
                  </button>
                )}
                <button style={btnDetailsStyle} onClick={() => navigate(`/article/${article._id}`)}>
                  🔍 Voir les détails
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: '#666', fontSize: '1.1rem', marginTop: '40px' }}>
          Aucun résultat trouvé.
        </p>
      )}
    </div>
  );
}

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

const btnGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
};

export default TousLesArticles;
