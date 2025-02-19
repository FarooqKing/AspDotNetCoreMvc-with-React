import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditProduct() {
    const { id } = useParams(); // Get product ID from URL
    const navigate = useNavigate(); // Redirect function

    const [formData, setFormData] = useState({
        id:0,
        name: '',
        description: '',
        price: 0.0,
        stock:0
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem("token"); // Retrieve token from storage

                const response = await fetch(`https://localhost:7030/api/Products/GetProduct/${id}`, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}` // Attach token
                    }
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch product data: ${response.status}`);
                }

                const data = await response.json();
                setFormData({
                    id: parseInt(id),
                    name: data.name || '',
                    description: data.description || '',
                    price: data.price || '',
                    stock: data.stock || ''
                });
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);


    // Handle input changes
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
            const payload = { ...formData, id: parseInt(id) };

            const response = await fetch(`https://localhost:7030/api/Products/UpdateProducts/${id}`, {
                method: "PUT",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("Failed to update product");
            }

            // Only parse JSON if there's content
            const text = await response.text();
            const result = text ? JSON.parse(text) : null;

            console.log("Product Updated:", result);

            navigate("/product-list"); // Redirect only on success
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h2>Edit Product</h2>
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
                                    placeholder="Product Name"
                                    required
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
                                    required
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
                                    required
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
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col d-flex justify-content-end">
                                <button type="submit" className="btn btn-primary">Update Product</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;
