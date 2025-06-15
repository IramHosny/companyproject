import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { editarticle } from '../redux/articleSlice';

function EditArticle({ ping, setping, article }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [edited, setEdited] = useState({
    name: article?.name,
    categorie: article?.categorie,
    description: article?.description,
    prix: article?.prix,
  });

  const [newImages, setNewImages] = useState([]);
  const [newImages360, setNewImages360] = useState([]);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    Swal.fire({
      title: 'Voulez-vous enregistrer les modifications ?',
      showDenyButton: true,
      confirmButtonText: 'Enregistrer',
      denyButtonText: 'Annuler',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        Object.entries(edited).forEach(([key, value]) => {
          formData.append(key, value);
        });

        // Si l’utilisateur a choisi de nouvelles images, on les ajoute
        newImages.forEach((file) => formData.append('images', file));
        newImages360.forEach((file) => formData.append('images360', file));

        await dispatch(editarticle({ id: article._id, edited: formData }));

        Swal.fire('Modifications enregistrées !', '', 'success');
        setping(!ping);
        handleClose();
      } else if (result.isDenied) {
        Swal.fire('Les modifications sont annulées', '', 'info');
      }
    });
  };

  return (
    <>
      <button
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        onClick={handleShow}
      >
        ✏️
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier l'article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                type="text"
                value={edited.name}
                onChange={(e) => setEdited({ ...edited, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control
                type="text"
                value={edited.categorie}
                onChange={(e) => setEdited({ ...edited, categorie: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={edited.description}
                onChange={(e) => setEdited({ ...edited, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="text"
                value={edited.prix}
                onChange={(e) => setEdited({ ...edited, prix: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Remplacer images normales (max 4)</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  if (files.length > 4) {
                    alert("Max 4 images");
                    return;
                  }
                  setNewImages(files);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Remplacer images 360° (max 36)</Form.Label>
              <Form.Control
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  if (files.length > 36) {
                    alert("Max 36 images");
                    return;
                  }
                  setNewImages360(files);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button
            variant="primary"
            style={{ background: '#f15d00', border: 'none' }}
            onClick={handleUpdate}
          >
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditArticle;
