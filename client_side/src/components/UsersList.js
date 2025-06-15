import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { removeuser } from '../redux/userSlice';
import UserEditModal from './UserEditModal';

function UsersList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users?.users || []);
  const user = useSelector((state) => state.user?.user);
  const isAuth = localStorage.getItem('token');

  const filteredUsers = users.filter((u) => u.email !== "admin@gmail.com");

  const handleDelete = (id) => {
    Swal.fire({
      title: "Supprimer ce client ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f15d00",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer",
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(removeuser(id));
        Swal.fire("Supprimé", "Le client a été supprimé.", "success");
      }
    });
  };

  return isAuth && user?.role === "admin" ? (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-8">👥 Liste des clients</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Nom & Prénom</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Téléphone</th>
              <th className="py-3 px-4 text-left">Adresse</th>
              <th className="py-3 px-4 text-left">Société</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u._id} className="border-b hover:bg-gray-50 transition">
                <td className="py-3 px-4 flex items-center gap-2">
                  <img
                    src="/logo512.png" // tu peux changer cette image ou mettre une icône fine
                    alt="icon"
                    className="w-5 h-5 object-contain"
                  />
                  {u.name} {u.lastname}
                </td>
                <td className="py-3 px-4 text-gray-700">{u.email}</td>
                <td className="py-3 px-4 text-gray-700">{u.gsm || "Non fourni"}</td>
                <td className="py-3 px-4 text-gray-700">{u.adress || "Non précisée"}</td>
                <td className="py-3 px-4 text-orange-600 font-semibold">{u.company || "Aucune"}</td>
                <td className="py-3 px-4 flex gap-2 justify-center">
                  <UserEditModal client={u} />
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className="text-center py-20 text-gray-600">🔒 Accès refusé</div>
  );
}

export default UsersList;
