import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPromotions, deletePromotion } from '../redux/promotionSlice';
import AddPromotion from './AddPromotion';
import EditPromotions from './EditPromotions';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

function AdminPromotions() {
  const dispatch = useDispatch();
  const promotions = useSelector((state) => state.promotion.promotions || []);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [promoToEdit, setPromoToEdit] = useState(null);

  useEffect(() => {
    dispatch(getPromotions());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Supprimer cette promotion ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePromotion(id));
        Swal.fire('Supprimé !', 'La promotion a été supprimée.', 'success');
      }
    });
  };

  const handleEdit = (promo) => {
    setPromoToEdit(promo);
    setEditMode(true);
    setShowForm(false);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setPromoToEdit(null);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-orange-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-blue-700">🎯 Gestion des Promotions</h2>
        {!editMode && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-blue-600 to-orange-500 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
          >
            {showForm ? 'Fermer' : 'Ajouter une promotion'}
          </button>
        )}
      </div>

      {showForm && !editMode && <AddPromotion />}
      {editMode && promoToEdit && (
        <EditPromotions promo={promoToEdit} onCancel={handleCancelEdit} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {promotions.map((promo, index) => (
          <motion.div
            key={promo._id}
            className="bg-white border-l-4 border-blue-500 rounded-xl p-4 shadow-sm hover:shadow-lg transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <h3 className="text-lg font-bold text-blue-800 mb-2">{promo.title}</h3>
            <p className="text-gray-700 text-sm">{promo.description}</p>
            <div className="mt-3 text-orange-600 font-bold text-sm">
              🔥 -{promo.pourcentage}%
            </div>
            <div className="mt-4 flex justify-end gap-3 text-sm">
              <button
                onClick={() => handleEdit(promo)}
                className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded hover:bg-yellow-200"
              >
                ✏️ Modifier
              </button>
              <button
                onClick={() => handleDelete(promo._id)}
                className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
              >
                🗑️ Supprimer
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AdminPromotions;
