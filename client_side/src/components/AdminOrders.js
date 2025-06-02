import React from 'react'
import {  useDispatch,useSelector} from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import OrderItems from './OrderItems';
import { removeorder, updateorder } from '../redux/orderSlice';

function AdminOrders() {
    const orders = useSelector((state)=>state.order?.order);
    const isAuth = localStorage.getItem('token');
    const user = useSelector((state)=>state.user?.user);
    const dispatch = useDispatch();


  return (
        <>
        <header className="bg-white shadow">
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900"> Liste des commandes </h1>
    </div>
  </header>
            {isAuth && user?.role === "admin" ? (
                <div className='user-list-container' style={{ marginTop: '5%' }}>
                   
                    <div className="table-container">
                        <Table striped className='user-table'>
                            <thead>
                                <tr>
                                    <th>Commande Numero</th>
                                    <th>Client</th>
                                    <th>adresse client</th>
                                    <th>articles </th>
                                    <th>total a payer</th>
                                    <th>statut</th>
                                    <th></th>
                                    <th></th>
                                   
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.toReversed().map((el) => (
                                    <tr >
                                        <td>{el?._id}</td>
                                        <td>{el?.current_user}</td>
                                        <td>{el?.user_adress}</td>
                                        <td><OrderItems el={el}/></td>
                                        <td>{el?.orderTotal + " DT"}</td>
                                        <td>{el?.orderStatus}</td>
                                        <td><Button variant="success" onClick={()=>{dispatch(updateorder({id:el?._id})); window.location.reload();}} width={20} height={30} ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={'15px'} height={'15'}><path  d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg></Button></td>
                                        <td><Button variant="danger" onClick={()=>{dispatch(removeorder(el?._id)); window.location.reload();}} width={20} height={20}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={'15px'} height={'15px'}><path fill="#ffffff" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></Button>{' '}
</td>
                                        </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            ) : (
                <div><center><img src="https://drudesk.com/sites/default/files/2018-02/404-error-page-not-found.jpg" alt="" width={'80%'} height={'auto'} style={{ width: "80%", height: "auto" }} /></center></div>
            )}
        </>
  )
}

export default AdminOrders