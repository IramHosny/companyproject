import React from 'react';
import { useSelector } from 'react-redux';
import './fcss/ClientOrders.css';
import { FaReceipt, FaCheckCircle, FaShoppingCart } from 'react-icons/fa';
import { Zoom } from 'react-awesome-reveal';

function ClientOrders() {
  const user = useSelector((state) => state.user?.user);
  const orders = useSelector((state) => state.order?.order);
  const client_orders = orders?.filter((el) => el?.current_user === user?.email);
  const count = client_orders?.length || 0;

  return (
    <div className='orders px-4 py-8 min-h-screen bg-gradient-to-br from-blue-50 to-orange-50'>
      <div className='text-center mb-10'>
        
        <h2 className='text-3xl font-bold text-blue-800 mt-4'>Mes Commandes</h2>
        <p className='text-gray-600'>Voici l'historique de vos commandes passées sur notre plateforme.</p>
      </div>

      {count > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {client_orders?.toReversed().map((el) => (
            <Zoom key={el?._id} triggerOnce>
              <div className='bg-white rounded-xl shadow-md p-5 border-l-4 border-orange-400 hover:shadow-xl transition'>
                <div className='flex items-center gap-3 mb-3'>
                  <FaReceipt className='text-orange-500 text-xl' />
                  <span className='text-sm text-gray-700 font-medium'>Commande n° {el?._id}</span>
                </div>
                <div className='flex items-center gap-3 mb-2'>
                  <FaCheckCircle className='text-green-500' />
                  <span className='text-gray-800 font-semibold'>État : {el?.orderStatus}</span>
                </div>
                <div className='flex items-center gap-3'>
                  <FaShoppingCart className='text-blue-600' />
                  <span className='text-gray-700'>Total à payer : <strong>{el?.orderTotal} DT</strong></span>
                </div>
              </div>
            </Zoom>
          ))}
        </div>
      ) : (
        <div className='text-center mt-20'>
          <h3 className='text-xl text-gray-500'>Vous n'avez aucune commande passée.</h3>
        </div>
      )}
    </div>
  );
}

export default ClientOrders;
