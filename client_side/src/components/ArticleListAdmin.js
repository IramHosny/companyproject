import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddArticle from './AddArticle';
import { deletearticle } from '../redux/articleSlice';
import EditArticle from './EditArticle';
import Swal from 'sweetalert2';

function ArticleListAdmin({ ping, setping }) {
  const user = useSelector(state => state.user?.user);
  const isAuth = localStorage.getItem('token');
  const articles = useSelector(state => state.article?.articlelist || []);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Voulez-vous supprimer cet article ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletearticle(id)).then(() => setping(!ping));
        Swal.fire("Supprimé", "L'article a été supprimé.", "success");
      }
    });
  };

  return (
    <>
      {isAuth && user?.role === "admin" ? (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-orange-50 min-h-screen">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-700">📦 Liste des Articles</h2>
            <AddArticle ping={ping} setping={setping} />
          </div>

          <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-600 text-white text-sm">
                <tr>
                  <th className="px-4 py-2 text-left">Nom</th>
                  <th className="px-4 py-2 text-left">Catégorie</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Prix</th>
                  <th className="px-4 py-2 text-left">Image</th>
                  <th className="px-4 py-2 text-center">Éditer</th>
                  <th className="px-4 py-2 text-center">Supprimer</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {articles.map((el) => (
                  <tr key={el._id} className="hover:bg-orange-50 transition">
                    <td className="px-4 py-2 font-medium">{el.name}</td>
                    <td className="px-4 py-2">{el.categorie}</td>
                    <td className="px-4 py-2">{el.description}</td>
                    <td className="px-4 py-2 text-orange-600 font-semibold">{el.prix} DT</td>
                    <td className="px-4 py-2">
                      <img
                        src={el.images?.[0] || "/default.jpg"}
                        alt="article"
                        className="w-14 h-14 object-cover rounded shadow-md"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <EditArticle article={el} ping={ping} setping={setping} />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleDelete(el._id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '5%' }}>
          <img
            src="https://drudesk.com/sites/default/files/2018-02/404-error-page-not-found.jpg"
            alt="Not found"
            style={{ width: "80%" }}
          />
        </div>
      )}
    </>
  );
}

export default ArticleListAdmin;
