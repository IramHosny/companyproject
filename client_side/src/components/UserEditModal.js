import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { userEdit } from '../redux/userSlice';
import { useDispatch } from 'react-redux';

function UserEditModal({ client }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [edituser, setEditUser] = useState({});

  const handleChange = (key, value) => {
    if (value && value.trim() !== "") {
      setEditUser((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleSubmit = () => {
    if (Object.keys(edituser).length === 0) {
      alert("Aucune modification détectée !");
      return;
    }

    dispatch(userEdit({ id: client?._id, edituser }));
    alert("Modification réussie !");
    handleClose();
    window.location.reload();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width={'15px'} height={'15px'}>
          <path fill="#ffffff" d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
        </svg>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier ce client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {["name", "lastname", "adress", "company", "tax_number", "phonenumber"].map((field) => (
            <div key={field}>
              <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
              <Form.Control
                type="text"
                placeholder={client?.[field]}
                onChange={(e) => handleChange(field, e.target.value)}
              />
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Fermer</Button>
          <Button variant="primary" onClick={handleSubmit}>Valider</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserEditModal;
