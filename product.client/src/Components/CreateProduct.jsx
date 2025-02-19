import { useState } from "react";
import {useNavigate } from "react-router-dom"
function CreateProduct() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: ''
    });
    const redirect = useNavigate();
    const handleInput = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: name === "price" ? parseFloat(value) : name === "stock" ? parseInt(value) : value
        });
    };


    const submitHandler = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("https://localhost:7030/api/Products/CreateProducts", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            console.log("Product Created:", result);
        } catch (error) {
            console.error("Error:", error);
        }
        redirect("/product-list");
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h2>Create Product</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={submitHandler}>
                        <div className="row mt-2">
                            <div className="col">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInput}
                                    className="form-control"
                                    placeholder="Product name"
                                    aria-label="Product name"
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInput}
                                    className="form-control"
                                    placeholder="Product Description"
                                    aria-label="Product Description"
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col">
                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInput}
                                    className="form-control"
                                    placeholder="Price"
                                    aria-label="Price"
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleInput}
                                    className="form-control"
                                    placeholder="Stock"
                                    aria-label="Stock"
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateProduct;
