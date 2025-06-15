import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import OrderItems from './OrderItems';
import { updateorder } from '../redux/orderSlice';
import Swal from 'sweetalert2';

function AdminOrders() {
  const orders = useSelector((state) => state.order?.order);
  const isAuth = localStorage.getItem('token');
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();

  const [filterStatus, setFilterStatus] = useState('all');

  const handleFilterChange = (status) => setFilterStatus(status);

  const handleUpdateStatus = (id, status) => {
    dispatch(updateorder({ id, status }))
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: `Commande ${status}`,
          showConfirmButton: false,
          timer: 1200
        });
      });
  };

  const filteredOrders = orders?.filter((el) =>
    filterStatus === 'all' ? true : el?.orderStatus === filterStatus
  );

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-blue-700 text-center">
            📦 Liste des commandes
          </h1>
        </div>
      </header>

      {isAuth && user?.role === "admin" ? (
        <div className='container py-6'>

          {/* Filtres de statut */}
          <div className="mb-5 flex flex-wrap justify-center gap-2">
            {["all", "en cours de traitement", "acceptée", "refusée"].map((status, idx) => {
              const btnColor = {
                all: "secondary",
                "en cours de traitement": "info",
                acceptée: "success",
                refusée: "danger"
              };
              return (
                <Button
                  key={idx}
                  variant={filterStatus === status ? btnColor[status] : `outline-${btnColor[status]}`}
                  onClick={() => handleFilterChange(status)}
                >
                  {status === "all" ? "Toutes" : status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              );
            })}
          </div>

          {/* Tableau des commandes */}
          <div className="overflow-auto">
            <Table bordered hover responsive className="shadow rounded">
              <thead className="bg-blue-50 text-center">
                <tr>
                  <th>#</th>
                  <th>Nom Client</th>
                  <th>Téléphone</th>
                  <th>Adresse</th>
                  <th>Articles</th>
                  <th>Total</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders?.toReversed().map((el, i) => (
                  <tr key={el._id} className="align-middle text-center">
                    <td><span className="font-bold text-blue-800">#{i + 1}</span></td>
                    <td>{el.user_fullname}</td>
                    <td>{el.user_gsm}</td>
                    <td>{el.user_adress}</td>
                    <td><OrderItems el={el} /></td>
                    <td className="text-orange-600 font-semibold">{el.orderTotal} DT</td>
                    <td>
                      <span className={
                        el.orderStatus === "acceptée"
                          ? "badge bg-success"
                          : el.orderStatus === "refusée"
                          ? "badge bg-danger"
                          : "badge bg-warning text-dark"
                      }>
                        {el.orderStatus}
                      </span>
                    </td>
                    <td className="d-flex gap-2 justify-center">
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => handleUpdateStatus(el._id, "acceptée")}
                      >
                        ✅
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleUpdateStatus(el._id, "refusée")}
                      >
                        ❌
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '5%' }}>
          <img
            src="https://drudesk.com/sites/default/files/2018-02/404-error-page-not-found.jpg"
            alt="Not found"
            style={{ width: "80%", height: "auto" }}
          />
        </div>
      )}
    </>
  );
}

export default AdminOrders;
