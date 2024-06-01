import { useState } from 'react';
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ProductForm from '../components/ProductForm'
import ImageSlider from '../components/Carousel';

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <div className="p-5">
      <h1 className="display-3 py-3">Want to Sell Something?</h1>
      <h2>You Could List Items Like These...</h2>
      <ImageSlider />
    </div>

    <div className="pb-5">
      <div className="d-flex flex-column align-items-center">
        <div className="bg-dark text-light p-5 w-50 rounded">
          <h3 className="pb-3">List an Item for Sale on <span className="text-warning">nidhi</span></h3>
          <Button variant="success" onClick={handleShow}>
          List Item Now
          </Button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>List a Product to Sell</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ProductForm className="bg-light"/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </>
  );
}

export default Example;
