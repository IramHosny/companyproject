import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDemandesPerso,
  updateStatutDemande,
  deleteDemandePerso,
} from "../redux/demandePersoSlice";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminDemandesPerso() {
  const dispatch = useDispatch();
  const { demandes, loading } = useSelector((state) => state.demandePerso);
  const [selectedStatuts, setSelectedStatuts] = useState({});

  useEffect(() => {
    dispatch(getAllDemandesPerso());
  }, [dispatch]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("fr-FR");

  const handleStatutChange = (id, newStatut) => {
    setSelectedStatuts({ ...selectedStatuts, [id]: newStatut });
  };

  const handleUpdate = (id) => {
    const statut = selectedStatuts[id];
    if (statut) {
      dispatch(updateStatutDemande({ id, statut }))
        .then(() => {
          toast.success(`✅ Demande ${statut} !`);
          dispatch(getAllDemandesPerso()); // 🔄 Rafraîchir la liste
        })
        .catch(() => {
          toast.error("❌ Erreur de mise à jour.");
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("❗ Supprimer cette demande ?")) {
      dispatch(deleteDemandePerso(id))
        .then(() => {
          toast.success("🗑️ Demande supprimée");
          dispatch(getAllDemandesPerso()); // ✅ Rafraîchir après suppression
        })
        .catch(() => toast.error("❌ Échec de suppression"));
    }
  };

  const getStatutBadge = (statut) => {
    const style = "px-2 py-0.5 rounded-full text-xs font-bold";
    switch (statut) {
      case "acceptée":
        return (
          <span className={`${style} bg-green-100 text-green-700`}>
            Acceptée
          </span>
        );
      case "refusée":
        return (
          <span className={`${style} bg-red-100 text-red-700`}>Refusée</span>
        );
      default:
        return (
          <span className={`${style} bg-yellow-100 text-yellow-700`}>
            En attente
          </span>
        );
    }
  };

  return (
    <div className="p-4 bg-gradient-to-br from-blue-50 to-orange-50 min-h-screen">
      <h2 className="text-xl md:text-2xl font-bold text-center text-blue-800 mb-8">
        📥 Demandes personnalisées
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Chargement...</p>
      ) : demandes.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {demandes
            .slice() // Pour ne pas muter l’original
            .reverse()
            .map((demande, index) => (
              <motion.div
                key={demande._id}
                className="bg-white border-l-4 border-blue-500 shadow rounded-lg p-4 text-sm relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <button
                  onClick={() => handleDelete(demande._id)}
                  className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-lg"
                  title="Supprimer"
                >
                  🗑️
                </button>

                <div className="font-semibold text-blue-800 mb-1">
                  📧 {demande.emailClient}
                </div>
                <div className="text-gray-600 mb-2">
                  🗓️ {formatDate(demande.dateCreation)}
                </div>
                <ul className="space-y-1 mb-2 text-gray-700">
                  <li>
                    🔩 <strong>Pièce :</strong> {demande.piece}
                  </li>
                  <li>
                    🎨 <strong>Couleur :</strong> {demande.couleur || "—"}
                  </li>
                  <li>
                    📐 <strong>Dimensions :</strong>{" "}
                    {demande.dimensions || "—"}
                  </li>
                  <li>
                    🔢 <strong>Qté :</strong> {demande.quantite}
                  </li>
                  <li>
                    📅 <strong>Limite :</strong>{" "}
                    {formatDate(demande.dateLimite)}
                  </li>
                  <li>
                    📌 <strong>Statut :</strong>{" "}
                    {getStatutBadge(demande.statut)}
                  </li>
                </ul>

                {demande.image && (
                  <img
                    src={`http://localhost:5000/uploads/demandesPerso/${demande.image}`}
                    alt="Visuel"
                    className="rounded shadow w-full h-32 object-cover mb-2"
                  />
                )}

                <div className="flex flex-col gap-2 mt-2">
                  <select
                    className="border border-orange-400 rounded px-2 py-1 text-sm"
                    value={
                      selectedStatuts[demande._id] || demande.statut || ""
                    }
                    onChange={(e) =>
                      handleStatutChange(demande._id, e.target.value)
                    }
                  >
                    <option value="">Changer le statut</option>
                    <option value="en attente">En attente</option>
                    <option value="acceptée">Acceptée</option>
                    <option value="refusée">Refusée</option>
                  </select>
                  <button
                    className="bg-gradient-to-r from-blue-600 to-orange-500 text-white font-bold py-1 rounded text-sm hover:opacity-90 transition"
                    onClick={() => handleUpdate(demande._id)}
                  >
                    💾 Enregistrer
                  </button>
                </div>
              </motion.div>
            ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Aucune demande.</p>
      )}
      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
}

export default AdminDemandesPerso;
