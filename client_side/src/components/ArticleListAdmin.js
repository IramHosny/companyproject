import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddArticle from './AddArticle';
import Table from 'react-bootstrap/Table';
import { deletearticle } from '../redux/articleSlice';
import Swal from 'sweetalert2';
import EditArticle from './EditArticle';

function ArticleListAdmin({ ping, setping }) {
  const user = useSelector(state => state.user?.user);
  const isAuth = localStorage.getItem('token');
  const articles = useSelector(state => state.article?.articlelist);
  const dispatch = useDispatch();

  const alert = (id) => {
    Swal.fire({
      title: "Voulez-vous supprimer cet article ?",
      showCancelButton: true,
      confirmButtonText: "Supprimer",
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletearticle(id))
          .then(() => setping(!ping));
        Swal.fire("Supprimé", "L'article a été supprimé.", "success");
      }
    });
  };

  return (
    <>
      {(isAuth && user?.role === "admin") ? (
        <div className='restaurant-list-container' style={{ marginTop: '5%' }}>
          
          {/* ✅ Ajout d'article */}
          <div className="d-flex justify-content-end mb-3">
            <AddArticle ping={ping} setping={setping} />
          </div>

          {/* ✅ Tableau des articles */}
          <div className="table-container">
            <Table striped className='article-table'>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Catégorie</th>
                  <th>Description</th>
                  <th>Prix</th>
                  <th>Image</th>
                  <th>Éditer</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {articles?.map(el => (
                  <tr key={el._id}>
                    <td>{el.name}</td>
                    <td>{el.catégorie}</td>
                    <td>{el.description}</td>
                    <td>{el.prix}</td>
                    <td>
                      <img src={el.image} alt="article" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                    </td>
                    <td>
                      <EditArticle article={el} ping={ping} setping={setping} />
                    </td>
                    <td>
                      <button className='btn_delete' onClick={() => alert(el._id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="#000000" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" />
                          <line x1="4" y1="7" x2="20" y2="7" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                          <path d="M5 7l1 12a2 2 0 002 2h8a2 2 0 002 -2l1 -12" />
                          <path d="M9 7v-3a1 1 0 011 -1h4a1 1 0 011 1v3" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '5%' }}>
          <img src="https://drudesk.com/sites/default/files/2018-02/404-error-page-not-found.jpg" alt="not found" style={{ width: "80%" }} />
        </div>
      )}
    </>
  );
}

export default ArticleListAdmin;
