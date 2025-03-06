import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../../api/api';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';

const AddService = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [img, setImg] = useState('');
    const [category, setCategory] = useState('');
    const [inventory, setInventory] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState(0);
    const [description, setDescription] = useState('');

    const validateInput = () => {
        if (!name || !img || !inventory || !price) {
            Swal.fire({
                title: 'Validation Error',
                text: 'All fields except description are required.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
            return false;
        }

        const inventoryValue = parseInt(inventory, 10);
        const priceValue = parseFloat(price);
        const discountValue = parseInt(discount);
        if (isNaN(inventoryValue) || isNaN(priceValue) || isNaN(discountValue)) {
            Swal.fire({
                title: 'Validation Error',
                text: 'Inventory, Price and Discount must be valid numbers.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
            return false;
        }

        if (priceValue > 10000000) {
            Swal.fire({
                title: 'Validation Error',
                text: 'Price cannot exceed 10,000,000.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
            return false;
        }
        if (discountValue > 100) {
            Swal.fire({
                title: 'Validation Error',
                text: 'Discount cannot exceed 100%',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
            return false;
        }
        return true;
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        if (!validateInput()) {
            return;
        }

        try {
            const response = await postData('/api/v1/create-service', {
                name,
                img,
                category,
                inventory,
                price,
                discount,
                description,
            });

            console.log("service-added:", response);

            if (response.status === "SUCCESS") {
                Swal.fire({
                    title: 'Success!',
                    text: response.message,
                    icon: 'success',
                    confirmButtonText: 'Okay',
                });
                setName('');
                setImg('');
                setCategory('');
                setInventory('');
                setPrice('');
                setDiscount(0);
                setDescription('');
            }
        } catch (error) {
            console.error('Error adding service:', error);
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'An error occurred.',
                icon: 'error',
                confirmButtonText: 'Okay',
            });
        }
    };

    return (
        <>
            <div className="d-flex w-100 ">
                <div
                    type="button"
                    className="btn mr-3"
                    onClick={() => navigate(-1)}
                >
                    <Icon path={mdiArrowLeft} size={2} />
                </div>
                <h1 className="text-muted mb-3">Add Service</h1>
            </div>

            <div className="row">
                <div className="col-lg-6">
                    <div className="card border-0">
                        <div className="card-body">
                            <form onSubmit={handleAdd}>
                                <div className="form-group mb-3">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="img">Image URL</label>
                                    <input
                                        type="text"
                                        id="img"
                                        className="form-control"
                                        value={img}
                                        onChange={(e) => setImg(e.target.value)}
                                        required
                                    />
                                    {img && <img src={img} alt="Service" className="mt-2 img-fluid" style={{ maxWidth: '200px' }} />}
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="category">Category</label>
                                    <select
                                        id="category"
                                        className="form-control"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        required
                                    >
                                        <option value="">Select a category</option>
                                        <option value="popcorn">Popcorn</option>
                                        <option value="drink">Drink</option>
                                        <option value="combo">Combo</option>
                                    </select>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="inventory">Inventory</label>
                                    <input
                                        type="number"
                                        id="inventory"
                                        className="form-control"
                                        value={inventory}
                                        onChange={(e) => setInventory(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="price">Price</label>
                                    <input
                                        type="number"
                                        id="price"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="discount">Discount</label>
                                    <input
                                        type="number"
                                        id="discount"
                                        className="form-control"
                                        value={discount}
                                        onChange={(e) => setDiscount(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows="4"
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-info float-right">
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddService;
