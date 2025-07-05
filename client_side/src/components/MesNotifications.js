import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications, deleteNotification } from "../redux/notificationSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MesNotifications({ email }) {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.notification?.list || []);
  const loading = useSelector((state) => state.notification?.loading || false);
  const error = useSelector((state) => state.notification?.error || null);

  useEffect(() => {
    if (email) {
      dispatch(getNotifications(encodeURIComponent(email)));
    }
  }, [dispatch, email]);

  const handleDelete = (id) => {
    if (window.confirm("Voulez-vous supprimer cette notification ?")) {
      dispatch(deleteNotification(id))
        .then(() => toast.success("🗑️ Notification supprimée"))
        .catch(() => toast.error("❌ Échec de suppression"));
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-bold text-blue-700 mb-3">🔔 Vos Notifications</h2>

      <ToastContainer position="top-right" autoClose={2500} />

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
              className="relative border-l-4 border-blue-500 bg-blue-50 p-3 rounded shadow hover:shadow-md transition"
            >
              {/* 🗑️ Bouton Supprimer */}
              <button
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-lg"
                onClick={() => handleDelete(notif._id)}
                title="Supprimer"
              >
                🗑️
              </button>

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
