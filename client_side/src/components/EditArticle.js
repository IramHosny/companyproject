import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { editarticle } from '../redux/articleSlice';
import Swal from 'sweetalert2';


function EditArticle({ping, setping, article}) {
const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [edited, setedited] = useState({
    name :article?.name ,
    catégorie:article?.catégorie,
    description:article?.desciption ,
    nom_restaurant:article?.nom_restaurant,
    image:article?.image,
    prix:article?.horaire,
  })
const dispatch= useDispatch();
const Update = (a)=> Swal.fire({
  title: "Voulez vous enregistrer les modifications ?",
  showDenyButton: true,
  showCancelButton: false,
  confirmButtonText: "enregistrer",
  denyButtonText: `annuler`
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
      dispatch(editarticle(a));
    Swal.fire("Enregistré!", "", "succés");
    window.location.reload();
  } else if (result.isDenied) {
    Swal.fire("Les modifications sont annulés", "", "info");
  }
});
  return (
    <>
     <button style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit-2" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M16 3l5 5l-14 14l-5 1l1 -5z" />
                    <line x1="18" y1="7" x2="13.35" y2="11.65" />
                    <line x1="14" y1="4" x2="4" y2="14" />
                </svg>
            </button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> Modifier l'article' </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label> Le nom de l'article </Form.Label>
        <Form.Control type="text" placeholder={article?.name} onChange={(e)=>setedited({...edited, name:e.target.value})} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label> La catégorie de l'article </Form.Label>
        <Form.Control type="text" placeholder={article?.catégorie} onChange={(e)=>setedited({...edited, catégorie:e.target.value})} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label> La description de l'article  </Form.Label>
        <Form.Control type="text" placeholder={article?.description} onChange={(e)=>setedited({...edited, description:e.target.value})} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Le restaurant </Form.Label>
        <Form.Control type="text" placeholder={article?.nom_restaurant} onChange={(e)=>setedited({...edited, nom_restaurant:e.target.value})}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>L'image de l'article </Form.Label>
        <Form.Control type="text" placeholder={article?.image} onChange={(e)=>setedited({...edited, image:e.target.value})}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Le prix de l'article </Form.Label>
        <Form.Control type="text" placeholder={article?.prix} onChange={(e)=>setedited({...edited, prix:e.target.value})}/>
      </Form.Group>
      </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Annuler
        </Button>
        <Button variant="primary" style={{ background: '#f15d00', border: 'none', cursor: 'pointer' }} onClick={() => Update ({id:article?._id,edited})}
        >
          Modifier
        </Button>

      </Modal.Footer>
    </Modal>
  </>
  )
}

export default EditArticle

