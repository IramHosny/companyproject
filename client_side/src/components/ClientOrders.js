import React from 'react'
import { useSelector } from 'react-redux'
import './fcss/ClientOrders.css'

function ClientOrders() {
    const user = useSelector((state)=>state.user?.user);
    const orders = useSelector((state)=>state.order?.order);
    console.log("orders:",orders)
    const client_orders= orders?.filter((el)=>el?.current_user ===user?.email);
    const count = client_orders?.length || 0 ;
    console.log("count", count)
    console.log(client_orders);
  return (
    <div className='orders'>
      {count>0?(
        client_orders?.toReversed().map((el)=>(
          <div className='orderItem'>
            <span>{"Commande numero : "+ el?._id} </span>
           <span>{"Etat de la commande: "+ el?.orderStatus}</span>
           <span>{"Total à payer: "+ el?.orderTotal + " DT"}</span>
        
          </div>
        ))
      ):(<h3>Vous n'avez aucune commande passé ! </h3>)
      }
       
        
    </div>
  )
}

export default ClientOrders