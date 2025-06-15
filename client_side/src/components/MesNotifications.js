import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../redux/notificationSlice";

function MesNotifications({ email }) {
  const dispatch = useDispatch();

  // ✅ Sélecteurs sécurisés
  const list = useSelector((state) => state.notification?.list || []);
  const loading = useSelector((state) => state.notification?.loading || false);
  const error = useSelector((state) => state.notification?.error || null);

  // 📥 Chargement des notifications à l'initialisation ou au changement d'email
  useEffect(() => {
    if (email) {
      dispatch(getNotifications(encodeURIComponent(email)));
    }
  }, [dispatch, email]);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-bold text-blue-700 mb-3">🔔 Vos Notifications</h2>

      {loading ? (
        <p className="text-gray-600 italic">Chargement...</p>
      ) : error ? (
        <p className="text-red-500">❌ Erreur : {error}</p>
      ) : list.length === 0 ? (
        <p className="text-gray-500 italic">Aucune notification pour le moment.</p>
      ) : (
        <div className="space-y-3">
          {list.map((notif) => (
            <div
              key={notif._id}
              className="border-l-4 border-blue-500 bg-blue-50 p-3 rounded shadow hover:shadow-md transition"
            >
              <p className="font-medium text-gray-800">{notif.message}</p>
              <small className="text-gray-600">{new Date(notif.date).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MesNotifications;
