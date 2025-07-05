import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDemandePerso } from "../redux/demandePersoSlice";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function DemandePersonnalisee() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);

  const [form, setForm] = useState({
    piece: "",
    couleur: "",
    dimensions: "",
    quantite: 1,
    dateLimite: "",
  });

  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    formData.append("emailClient", user?.email);
    if (image) formData.append("image", image);

    try {
      await dispatch(addDemandePerso(formData));
      setMessage("✅ Demande bien reçue ! Nous vous répondrons dans les plus brefs délais après examen.");

      // ✅ Réinitialiser les champs après envoi
      setForm({
        piece: "",
        couleur: "",
        dimensions: "",
        quantite: 1,
        dateLimite: "",
      });
      setImage(null);

      setTimeout(() => setMessage(""), 5000);
    } catch (err) {
      setMessage("❌ Une erreur est survenue lors de l'envoi de la demande.");
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 rounded-xl shadow-xl bg-gradient-to-br from-blue-50 to-orange-50">
      <h2 className="text-3xl font-extrabold text-center text-blue-700 mb-8">
        🛠️ Soumettez votre demande personnalisée
      </h2>

      <AnimatePresence>
        {message && (
          <motion.div
            className={`mb-4 px-4 py-3 rounded text-white ${
              message.startsWith("✅") ? "bg-green-600" : "bg-red-600"
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="font-semibold text-blue-700">Nom de la pièce</label>
          <input
            type="text"
            name="piece"
            required
            placeholder="Ex : Portail, étagère, etc."
            className="w-full p-3 mt-1 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.piece}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="font-semibold text-orange-600">Couleur souhaitée</label>
          <input
            type="text"
            name="couleur"
            placeholder="Ex : gris métal, noir mat..."
            className="w-full p-3 mt-1 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={form.couleur}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="font-semibold text-blue-700">Dimensions</label>
          <input
            type="text"
            name="dimensions"
            placeholder="Ex : 120x60x40 cm"
            className="w-full p-3 mt-1 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.dimensions}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="font-semibold text-orange-600">Quantité</label>
          <input
            type="number"
            name="quantite"
            min="1"
            required
            placeholder="Nombre d’unités"
            className="w-full p-3 mt-1 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={form.quantite}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="font-semibold text-blue-700">Date limite souhaitée</label>
          <input
            type="date"
            name="dateLimite"
            required
            className="w-full p-3 mt-1 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={form.dateLimite}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="font-semibold text-orange-600">Joindre une image (facultatif)</label>
          <input
            type="file"
            accept="image/*"
            className="w-full p-3 mt-1 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={handleFileChange}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg"
          >
            ➕ Envoyer la demande
          </button>
        </div>
      </form>

      <div className="mt-12 bg-white p-4 rounded-xl shadow-inner border text-center">
        <h4 className="text-lg font-bold text-blue-600 mb-2">
          💡 Articles similaires ou inspirants :
        </h4>
        <p className="text-sm text-gray-700">
          Pensez à consulter notre catalogue pour découvrir les réalisations proches de votre besoin.
        </p>
      </div>
    </div>
  );
}

export default DemandePersonnalisee;
