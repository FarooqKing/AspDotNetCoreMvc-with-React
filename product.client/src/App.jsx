import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductList from './Components/ProductList';
import Navbar from './Components/Navbar';
import CreateProduct from './Components/CreateProduct';
import Login from './Authentication/Login';
import PrivateRoute from './Authentication/PrivateRoute';
import Logout from './Authentication/Logout';

function App() {
    return (
        <>


            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/product-list" element={<ProductList />} />
                        <Route path="/create" element={<CreateProduct />} />
                    </Route>
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </Router>
           

        </>
    )
}

export default App;