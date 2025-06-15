import React from "react";
import { useNavigate } from "react-router-dom";
import { Zoom } from "react-awesome-reveal";

function ServicePage() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "🧾 Demande de devis",
      desc: "Demandez un devis pour les produits de notre catalogue.",
      action: () => navigate("/demande-devis"),
    },
    {
      title: "🛠️ Demande personnalisée",
      desc: "Soumettez une demande sur mesure avec dimensions, couleurs, etc.",
      action: () => navigate("/demande-personnalisee"),
    },
    {
      title: "📜 Historique devis",
      desc: "Consultez vos anciennes demandes de devis.",
      action: () => navigate("/mesdevis"),
    },
    {
      title: "📬 Historique personnalisées",
      desc: "Consultez vos demandes personnalisées passées.",
      action: () => navigate("/mes-demandes"),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto p-8 mt-10">
      <Zoom triggerOnce>
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
          📌 Centre de service
        </h1>
      </Zoom>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card, i) => (
          <Zoom triggerOnce key={i}>
            <div
              onClick={card.action}
              className="cursor-pointer bg-gradient-to-br from-orange-50 to-white hover:shadow-xl transition shadow-md rounded-2xl p-6 border border-orange-200 hover:border-blue-600 hover:scale-105 duration-300"
              style={{ transform: "scale(1)", transition: "transform 0.3s ease-in-out" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h2 className="text-xl font-bold text-orange-600 mb-2">{card.title}</h2>
              <p className="text-gray-700 text-sm">{card.desc}</p>
            </div>
          </Zoom>
        ))}
      </div>
    </div>
  );
}

export default ServicePage;