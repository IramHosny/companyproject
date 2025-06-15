import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { addarticle } from '../redux/articleSlice';

function AddArticle({ ping, setping }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [article, setArticle] = useState({
    name: "",
    categorie: "",
    description: "",
    prix: ""
  });

  const [images, setImages] = useState([]);
  const [images360, setImages360] = useState([]);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 4) {
      alert("Vous pouvez sélectionner jusqu'à 4 images normales.");
      return;
    }
    setImages(selectedFiles);
  };

  const handleImage360Change = (e) => {
    const selected360 = Array.from(e.target.files);
    if (selected360.length > 36) {
      alert("Maximum 36 images 360° autorisées.");
      return;
    }
    setImages360(selected360);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    Object.entries(article).forEach(([key, value]) => {
      formData.append(key, value);
    });
    images.forEach((file) => formData.append("images", file));
    images360.forEach((file) => formData.append("images360", file));

    await dispatch(addarticle(formData));
    setping(!ping);
    handleClose();
  };

  return (
    <div>
      <Button
        onClick={handleShow}
        className="text-white px-4 py-2 rounded-md font-semibold"
        style={{
          backgroundColor: '#f15d00',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        }}
      >
        🧩 Ajouter un article
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton className="bg-blue-600 text-white">
          <Modal.Title>📝 Ajouter un nouvel article</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-gray-50">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nom de l'article</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nom de l'article"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Catégorie</Form.Label>
              <Form.Select name="categorie" onChange={handleInputChange}>
                <option value="">-- Choisir une catégorie --</option>
                <option value="portes">Portes</option>
                <option value="articles_décoratifs">Articles décoratifs</option>
                <option value="cabine">Cabine</option>
                <option value="tables et chaises">Tables et chaises</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Courte description"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                name="prix"
                placeholder="En DT"
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Images normales (max 4)</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Images 360° (max 36)</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                multiple
                onChange={handleImage360Change}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-blue-50">
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            style={{
              backgroundColor: '#f15d00',
              border: 'none',
              fontWeight: 'bold'
            }}
          >
            ✅ Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddArticle;
