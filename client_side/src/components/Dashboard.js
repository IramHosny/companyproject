import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  const cards = [
    {
      title: "Gestion des utilisateurs",
      description: "Afficher et gérer les clients inscrits.",
      path: "/dashboard/userslist",
      icon: "👤"
    },
    {
      title: "Gestion des commandes",
      description: "Suivre et contrôler les commandes clients.",
      path: "/adminorders",
      icon: "📦"
    },
    {
      title: "Gestion des articles",
      description: "Ajouter, modifier et supprimer des articles.",
      path: "/artiadmin",
      icon: "🛠️"
    },
    {
      title: "Gestion des demandes",
      description: "Valider ou refuser les demandes d'inscription.",
      path: "/dashboard/demands",
      icon: "📨"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-10">Tableau de bord administrateur</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-blue-700">{card.title}</h2>
              <span className="text-3xl">{card.icon}</span>
            </div>
            <p className="text-gray-600 mb-4">{card.description}</p>
            <Link
              to={card.path}
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Accéder
            </Link>
          </div>
        ))}
      </div>

      
    </div>
  );
}
