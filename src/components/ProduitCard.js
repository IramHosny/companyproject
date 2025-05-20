import { Link } from "react-router-dom";

const ProduitCard = () => {
  const produits = [
    {
      nom: "Chaise métallique design",
      image:
        "https://images-cdn.ubuy.com.sa/65f64d2d621585594e023799-modern-velvet-lazy-accent-chair.jpg",
      description: "Chaise robuste en métal, idéale pour intérieur et extérieur.",
      prix: "199.000 TND",
    },
    {
      nom: "Chaise métallique design 2",
      image:
        "https://image.made-in-china.com/202f0j00pvGhKePabjcl/Modern-Metal-Frame-Leather-Comfortable-Rocking-Chairs-for-Bedroom.webp",
      description: "Chaise élégante et solide avec finition haut de gamme.",
      prix: "249.000 TND",
    },
      {
      nom: "Chaise métallique design 2",
      image:
        "https://m.media-amazon.com/images/I/71qwMZrkL4L._AC_UF1000,1000_QL80_.jpg",
      description: "Chaise élégante et solide avec finition haut de gamme.",
      prix: "160.000 TND",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 py-10">
      {produits.map((produit, index) => (
        <div
          key={index}
          className="max-w-md bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
        >
          <img
            src={produit.image}
            alt={produit.nom}
            className="w-full h-64 object-cover rounded-xl mb-4"
          />
          <h2 className="text-xl font-bold text-[rgb(0,44,253)] mb-2">{produit.nom}</h2>
          <p className="text-gray-700 mb-2">{produit.description}</p>
          <p className="text-lg font-semibold text-gray-900 mb-4">Prix : {produit.prix}</p>

          <div className="flex gap-4">
            <Link to="/détail_prod">
              <button className="bg-[rgb(0,44,253)] text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition duration-300">
                Plus de détails
              </button>
            </Link>
            <button className="border border-[rgb(0,44,253)] text-[rgb(0,44,253)] px-4 py-2 rounded-lg hover:bg-[rgb(0,44,253)] hover:text-white transition duration-300">
              Passer commande
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProduitCard;
