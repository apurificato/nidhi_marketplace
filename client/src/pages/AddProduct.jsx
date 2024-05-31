import { useState } from 'react';
import ProductForm from "../components/ProductForm";

function AddProduct() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
        console.log('click')
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section>
            <h1>List an Item for Sale!</h1>
            <div className="py-5">
                <button onClick={showModal} type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary" data-mdb-modal-init data-mdb-target="#staticBackdrop5">
                    List and Sell an Item Now
                </button>

                <div className={`modal top fade ${isModalOpen ? 'show' : ''}`} id="staticBackdrop5" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!isModalOpen} data-mdb-backdrop="true" data-mdb-keyboard="true">
                    <div className="modal-dialog modal-dialog-centered text-center d-flex justify-content-center">
                        <div className="modal-content w-75">
                            <div className="modal-body p-4">
                                <img src="react.svg" alt="avatar" className="rounded-circle position-absolute top-0 start-50 translate-middle h-50" />
                                <ProductForm />
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddProduct;
