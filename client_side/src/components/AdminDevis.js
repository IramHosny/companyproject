import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteDevis } from "../redux/devisSlice"; // 🧠 Assure-toi d'avoir importé
import axios from "axios";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react"; // 📦 icône poubelle (optionnel)

function AdminDevis() {
  const [devisList, setDevisList] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState({});
  const dispatch = useDispatch();

  const fetchDevis = async () => {
    try {
      const res = await axios.get("http://localhost:5000/devis/all");
      setDevisList(res.data);
    } catch (err) {
      console.error("Erreur récupération devis :", err);
    }
  };

  useEffect(() => {
    fetchDevis();
  }, []);

  const handleFileChange = (e, devisId) => {
    setSelectedFiles({ ...selectedFiles, [devisId]: e.target.files[0] });
  };

  const handleUploadPDF = async (devisId) => {
    const file = selectedFiles[devisId];
    if (!file) return alert("Veuillez sélectionner un fichier PDF.");

    const formData = new FormData();
    formData.append("pdfFile", file);

    try {
      await axios.put(`http://localhost:5000/devis/upload-pdf/${devisId}`, formData);
      alert("📄 PDF envoyé avec succès !");
      fetchDevis();
    } catch (err) {
      console.error("Erreur upload PDF :", err);
      alert("❌ Erreur lors de l’envoi.");
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("❗ Êtes-vous sûr de vouloir supprimer ce devis ?");
    if (!confirm) return;
    try {
      await dispatch(deleteDevis(id));
      setDevisList((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      console.error("Erreur suppression :", err);
      alert("❌ Suppression échouée.");
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-br from-blue-50 to-orange-50">
      <h1 className="text-3xl font-extrabold text-center text-blue-800 mb-10">
        📋 Gestion des devis clients
      </h1>

      {devisList.length === 0 ? (
        <p className="text-center text-gray-600">Aucune demande trouvée.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {devisList.map((devis, index) => (
            <motion.div
              key={devis._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-white rounded-xl shadow-md p-5 border border-blue-100 hover:shadow-lg transition relative"
            >
              {/* 🗑️ Bouton supprimer */}
              <button
                onClick={() => handleDelete(devis._id)}
                className="absolute top-3 right-3 text-red-600 hover:text-red-800"
                title="Supprimer"
              >
                <Trash2 size={20} />
              </button>

              <div className="mb-3">
                <p><span className="font-semibold text-orange-600">Nom :</span> {devis.nom} {devis.prenom}</p>
                <p><span className="font-semibold text-orange-600">Société :</span> {devis.societe || "N/A"}</p>
                <p><span className="font-semibold text-orange-600">Email :</span> {devis.email}</p>
                <p><span className="font-semibold text-orange-600">Téléphone :</span> {devis.telephone}</p>
                <p><span className="font-semibold text-orange-600">Date :</span> {new Date(devis.dateCreation).toLocaleDateString()}</p>
                <p><span className="font-semibold text-orange-600">Statut :</span> {devis.statut}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold text-blue-700 mb-1">🧾 Articles :</h4>
                <ul className="text-sm list-disc list-inside text-gray-700">
                  {devis.articles?.map((a, i) => (
                    <li key={i}>
                      <strong>Réf :</strong> {a.reference} — <strong>Qté :</strong> {a.quantite}
                    </li>
                  ))}
                </ul>
              </div>

              {devis.devisPDF ? (
                <div className="text-green-600 font-semibold">
                  ✅ PDF envoyé —{" "}
                  <a
                    href={`http://localhost:5000/uploads/pdfDevis/${devis.devisPDF}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600"
                  >
                    Voir
                  </a>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => handleFileChange(e, devis._id)}
                    className="text-sm"
                  />
                  <button
                    onClick={() => handleUploadPDF(devis._id)}
                    className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-orange-600"
                  >
                    📤 Envoyer le devis PDF
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminDevis;
