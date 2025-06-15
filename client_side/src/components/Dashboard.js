import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { motion } from "framer-motion";

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
      title: "Gestion des demandes personnalisées",
      description: "Valider ou refuser les demandes personnalisées.",
      path: "/admin/demandes-personnalisees",
      icon: "📨"
    },
    {
      title: "Demandes de devis",
      description: "Consulter les demandes envoyées par les clients et répondre avec un fichier PDF.",
      path: "/admin/devis",
      icon: "📄"
    },
    {
      title: "Gestion des promotions",
      description: "Ajouter, modifier et supprimer des promotions.",
      path: "/admin/promotions",
      icon: "💸"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-orange-50 py-10 px-6">
      <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-12 tracking-wide">
        🎛️ Tableau de bord administrateur
      </h1>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-blue-700">{card.title}</h2>
              <span className="text-3xl">{card.icon}</span>
            </div>
            <p className="text-gray-600 mb-6 text-sm">{card.description}</p>
            <Link
              to={card.path}
              className="inline-block w-full text-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold shadow hover:from-blue-700 hover:to-orange-600 transition"
            >
              Accéder
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
