import { Link } from "react-router-dom";

const CatalogueProduits = () => {
  const categories = [
    {
      title: "Portes",
      image:
        "https://plus.unsplash.com/premium_photo-1661286705410-edb4c9bde72a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Portes métalliques de haute sécurité et design sur mesure.",
      path: "/catalogue/portes",
    },
    {
      title: "Chaises & Tables",
      image:
        "https://images.unsplash.com/photo-1617850951519-5782e929bfe0?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Mobilier robuste et élégant pour intérieur ou extérieur.",
      path: "/table_chaise",
    },
    {
      title: "Articles Décoratifs",
      image:
        "https://images.unsplash.com/photo-1669338288125-c3aef5d3996a?q=80&w=1477&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Éléments métalliques pour embellir vos espaces.",
      path: "/catalogue/decoratifs",
    },
    {
      title: "Cabines",
      image:
        "https://www.zehanaservices.dz/wp-content/uploads/2016/01/cabine-de-6m-1-310x205.jpg",
      description: "Cabines métalliques pratiques et personnalisables.",
      path: "/catalogue/cabines",
    },
  ];

  return (
    <div className="bg-white min-h-screen py-12 px-6 md:px-16">
      <h2 className="text-3xl font-bold text-center text-[rgb(0,44,253)] mb-10">
        Catalogue de Produits
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="relative bg-blue-50 rounded-xl shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out overflow-hidden group"
          >
            {/* Autocollant style métallique */}
            <div className="absolute top-2 right-2 bg-gradient-to-br from-gray-200 to-gray-500 text-xs text-white px-2 py-1 rounded-full shadow-md z-10 font-bold tracking-wide">
              Métal+
            </div>

            <img
              src={cat.image}
              alt={cat.title}
              className="w-full h-48 object-cover rounded-t-xl group-hover:brightness-90 transition duration-300"
            />
            <div className="p-4 text-blue-900">
              <h3 className="text-xl font-bold text-[rgb(0,44,253)] mb-2">
                {cat.title}
              </h3>
              <p className="text-sm mb-4">{cat.description}</p>
              <Link
                to={cat.path}
                className="inline-block mt-2 text-[rgb(0,44,253)] font-semibold hover:underline"
              >
                Voir les produits →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CatalogueProduits;
