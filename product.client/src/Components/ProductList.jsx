import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";

function ProductList() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null); // Store selected product ID

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found! Please log in.");
                    return;
                }

                const res = await fetch("https://localhost:7030/api/Products/GetProducts", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!res.ok) throw new Error(`Http error! Status: ${res.status}`);

                const result = await res.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async () => {
        if (!selectedProductId) return;

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`https://localhost:7030/api/Products/DeleteProducts/${selectedProductId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }   
            });

            if (!response.ok) {
                throw new Error("Failed to delete product");
            }

            setData(data.filter(product => product.id !== selectedProductId)); // Remove deleted product from list
            navigate("/product-list");

        } catch (error) {
            console.error("Error:", error);
            alert("Error deleting product.");
        }
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    <h1>List of Products</h1>
                    <div className="d-flex justify-content-center flex-column">
                        <Link to='/create' className='btn btn-primary'>Create</Link>
                    </div>
                </div>
                <div className="card-body">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        <div>
                                            <Link className="btn btn-primary btn-sm me-2" to={`/edit/${product.id}`}>
                                                <i className="fa-solid fa-pen-to-square"></i>
                                            </Link>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                data-bs-toggle="modal"
                                                data-bs-target="#deleteModal"
                                                onClick={() => setSelectedProductId(product.id)} // Set product ID before opening modal
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pass handleDelete function as a prop */}
            <Modal handleDelete={handleDelete} />
        </div>
    );
}

export default ProductList;
