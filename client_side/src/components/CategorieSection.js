import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'portes', label: 'Portes', image: '/images/cat_portes.jpg' },
  { name: 'articles_décoratifs', label: 'Articles décoratifs', image: '/images/cat_decor.jpg' },
  { name: 'cabine', label: 'Cabines', image: '/images/cat_cabines.jpg' },
  { name: 'tables et chaises', label: 'Tables & Chaises', image: '/images/cat_tables.jpg' }
];

function CategorieSection() {
  const articles = useSelector(state => state.article?.articlelist);

  return (
    <div className="bg-gradient-to-br from-white via-orange-50 to-blue-50 py-14 px-4 md:px-12 min-h-screen">
      <h2 className="text-4xl font-extrabold text-center text-orange-600 mb-12">
        🛠️ Nos Catégories Populaires
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat) => {
          const catArticles = (articles
            ?.filter(a => a.catégorie === cat.name)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) || [])
            .slice(0, 3);

          return (
            <div
              key={cat.name}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden flex flex-col border-2 border-orange-100 hover:border-orange-400"
            >
              <div className="relative">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  {cat.label}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  {catArticles.length > 0 &&
                    catArticles.map((a) => (
                      <div
                        key={a._id}
                        className="flex items-center gap-3 bg-orange-50 hover:bg-orange-100 p-2 rounded-lg transition"
                      >
                        <img
                          src={a.image}
                          alt={a.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{a.name}</p>
                          <p className="text-xs text-orange-600 font-bold">{a.prix} DT</p>
                        </div>
                      </div>
                    ))
                  }
                </div>

                <Link
                  to={`/${cat.name}/articles`}
                  className="mt-6 inline-block text-center bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
                >
                  Voir plus →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CategorieSection;
