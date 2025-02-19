import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductList from './Components/ProductList';
import Navbar from './Components/Navbar';
import CreateProduct from './Components/CreateProduct';
import Login from './Authentication/Login';
import PrivateRoute from './Authentication/PrivateRoute';
import Logout from './Authentication/Logout';
import EditProduct from './Components/EditProduct';
import Registeration from './Authentication/Registeration';
import { useState, useEffect } from "react";
function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if token exists in localStorage
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);
    return (
        <>


            <Router>
                {isAuthenticated && <Navbar />}
                <div className="container">
                    <div className="card-body">
                <Routes>
                            <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/register" element={<Registeration />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/product-list" element={<ProductList />} />
                        <Route path="/create" element={<CreateProduct />} />
                        <Route path="/edit/:id" element={<EditProduct />} />
                    </Route>
                            <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />
                </Routes>
                    </div>
                    </div>
              
            </Router>
           

        </>
    )
}

export default App;