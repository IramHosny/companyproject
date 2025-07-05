import React from 'react';

function MiniDetailArticle({ article, onClose }) {
  if (!article) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={onClose} // ✅ clic en dehors ferme
    >
      <div
        className="relative bg-white rounded-xl shadow-2xl p-4 w-[95%] max-w-sm sm:max-w-md overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()} // ❌ empêche fermeture si clic intérieur
      >
        {/* ❌ Fermer */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-600 text-2xl font-bold z-50"
          style={{ zIndex: 1000 }}
        >
          &times;
        </button>

        {/* 🖼️ Image */}
        <img
          src={article.images?.[0]}
          alt={article.name}
          className="w-full max-h-[300px] object-contain rounded-md mb-4"
        />

        {/* 📝 Infos */}
        <h3 className="text-xl font-bold text-blue-800 mb-2 text-center">{article.name}</h3>
        <p className="text-sm text-gray-600"><strong>Référence :</strong> {article.reference}</p>
        <p className="text-sm text-gray-600"><strong>Catégorie :</strong> {article.categorie}</p>
        <p className="text-lg font-semibold text-orange-600 mt-2">{article.prix} DT</p>
        <p className="text-sm text-gray-700 mt-3 line-clamp-3">{article.description}</p>
      </div>
    </div>
  );
}

export default MiniDetailArticle;
