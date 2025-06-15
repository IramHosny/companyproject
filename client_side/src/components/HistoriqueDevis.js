import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDevis } from '../redux/devisSlice';
import './fcss/ClientOrders.css';

function HistoriqueDevis() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);
  const devis = useSelector((state) => state.devis?.devisList || []);

  useEffect(() => {
    dispatch(getDevis());
  }, [dispatch]);

  const clientDevis = devis?.filter((d) => d?.email === user?.email);
  const count = clientDevis?.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-10 px-6">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-10 animate-fade-in">
        🧾 Historique de vos devis
      </h2>
      {count > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {clientDevis.toReversed().map((el) => (
            <div
              key={el._id}
              className="flex bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300"
            >
              <div className="flex-1 p-5">
                <h3 className="text-lg font-bold text-blue-700 mb-2">
                  📌 Numéro : {el._id}
                </h3>
                <p className="text-gray-800 mb-1">
                  <strong>Statut :</strong>{" "}
                  <span className={
                    el.statut === "traité"
                      ? "text-green-600 font-semibold"
                      : "text-orange-600 font-semibold"
                  }>
                    {el.statut}
                  </span>
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Date :</strong> {new Date(el.dateCreation).toLocaleDateString()}
                </p>
                {el?.devisPDF && (
                  <a
                    href={`http://localhost:5000/uploads/pdfDevis/${el.devisPDF}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                  >
                    📥 Télécharger PDF
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h3 className="text-center text-gray-600">Vous n'avez encore aucun devis enregistré.</h3>
      )}
    </div>
  );
}

export default HistoriqueDevis;
