import { Link } from "react-router-dom";

const ProduitDetail = () => {
  const produit = {
    nom: "Chaise métallique design",
    image:
      "https://images-cdn.ubuy.com.sa/65f64d2d621585594e023799-modern-velvet-lazy-accent-chair.jpg",
    description: `Cette chaise en métal est conçue pour durer. Elle résiste aux intempéries 
    et est parfaite pour un usage intérieur comme extérieur. Son design moderne 
    s’intègre à tout type d’espace : bureau, jardin, salon ou salle d’attente.`,
    prix: "199.000 TND",
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <img
          src={produit.image}
          alt={produit.nom}
          className="w-full h-[400px] object-cover rounded-xl"
        />
        <div>
          <h1 className="text-3xl font-bold text-[rgb(0,44,253)] mb-4">{produit.nom}</h1>
          <p className="text-gray-800 mb-4 leading-relaxed">{produit.description}</p>
          <p className="text-xl font-semibold text-gray-900 mb-6">Prix : {produit.prix}</p>

          <div className="flex gap-4">
            <Link
              to="/table_chaise"
              className="px-4 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
            >
              ← 
            </Link>
            <button className="bg-[rgb(0,44,253)] text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition">
              Passer commande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProduitDetail;
