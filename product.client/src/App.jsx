import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ProductList from './Components/ProductList';
import Navbar from './Components/Navbar';
import CreateProduct from './Components/CreateProduct';

function App() {
    return (
        <>

            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/create" element={<CreateProduct />} />

                </Routes>
            </Router>
           

        </>
    )
}

export default App;