import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDemandesByEmail } from "../redux/demandePersoSlice";
import { motion } from "framer-motion";

function MesDemandesPerso() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const { demandes, loading } = useSelector((state) => state.demandePerso);

  useEffect(() => {
    if (user?.email) {
      dispatch(getDemandesByEmail(user.email));
    }
  }, [user, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-10 px-6">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-10">
        📦 Mes demandes personnalisées
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Chargement...</p>
      ) : demandes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {demandes.toReversed().map((demande) => (
            <motion.div
              key={demande._id}
              className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="mb-2">
                <strong className="text-blue-700">Pièce :</strong> {demande.piece}
              </p>
              <p className="mb-2">
                <strong className="text-blue-700">Couleur :</strong> {demande.couleur}
              </p>
              <p className="mb-2">
                <strong className="text-blue-700">Dimensions :</strong> {demande.dimensions}
              </p>
              <p className="mb-2">
                <strong className="text-blue-700">Quantité :</strong> {demande.quantite}
              </p>
              <p className="mb-2">
                <strong className="text-blue-700">Date limite :</strong> {new Date(demande.dateLimite).toLocaleDateString()}
              </p>
              <p className="mb-2">
                <strong className="text-blue-700">Statut :</strong> 
                <span className={
                  demande.statut === "acceptée"
                    ? "text-green-600 font-semibold"
                    : demande.statut === "refusée"
                    ? "text-red-600 font-semibold"
                    : "text-orange-500 font-semibold"
                }>
                  {" " + demande.statut}
                </span>
              </p>
              {demande.image && (
                <div className="mt-4">
                  <img
                    src={`http://localhost:5000/uploads/demandesPerso/${demande.image}`}
                    alt="demandeperso"
                    className="w-40 h-auto rounded-xl shadow-md"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Aucune demande personnalisée trouvée.</p>
      )}
    </div>
  );
}

export default MesDemandesPerso;
