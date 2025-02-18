import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
function ProductList() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem("token"); // Retrieve the token from localStorage
                if (!token) {
                    console.error("No token found! Please log in.");
                    return; // If no token, stop the request
                }

                const res = await fetch("https://localhost:7030/api/Products/GetProducts", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` // Attach the token to the Authorization header
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
    },[]);
  return (
      <div className="container">
          <div className="card">
              <div className="card-header d-flex justify-content-between">
                  <h1>List of Students</h1>
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
                          {data.map((product) =>
                          (<tr key={product.id}>
                              <td>{product.id}</td>
                              <td>{product.name}</td>
                              <td>{product.description}</td>
                              <td>{product.price}</td>
                              <td>{product.stock}</td>
                              <td>
                                  <div >
                                      <Link className="btn btn-primary btn-sm me-2" to="/edit"><i className="fa-solid fa-pen-to-square"></i></Link>
                                      <Link className="btn btn-danger btn-sm"><i className="fa-solid fa-trash"></i></Link>
                                 
                                  </div>
                              </td>
                          </tr>)
                          )}
                      </tbody>
                  </table>

              </div>
          </div>

      </div>
  );
}

export default ProductList;