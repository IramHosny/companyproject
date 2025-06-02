import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function OrderItems({el}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
    <Button variant="primary" onClick={handleShow}>
Détails 
    </Button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Détails de la commande</Modal.Title>
      </Modal.Header>
      <Modal.Body>{el?.orderItems.map((item)=>(
        <div style={{border:'1px solid', padding:'1%',margin:'1%'}}>
        <p>{item.name}</p>
        <p>{item.nom_restaurant}</p>
        <p>{item.prix + " DT"}</p>
        <p>{"quantité: "+item.cartQuantity}</p>
       </div>
      ))}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default OrderItems