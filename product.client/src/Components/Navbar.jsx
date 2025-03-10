import { Link } from "react-router-dom";

function Navbar() {
   
  return (
      <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="container-fluid">
                  <a className="navbar-brand" href="#">Navbar</a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon"></span>
                  </button>


                      <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
                          <ul className="navbar-nav">
                              <li className="nav-item">
                                  <Link className="nav-link active" aria-current="page" to="/product-list">ProductList</Link>
                              </li>
                              <li className="nav-item">
                                  <Link className="nav-link active" aria-current="page" to="/create">Create Product</Link>
                              </li>
                          </ul>
                          <ul className="navbar-nav">
                              <li className="nav-item">
                                  <Link className="nav-link active" aria-current="page" to="/logout">Logout</Link>
                              </li>
                          </ul>
                      </div>
                
              </div>
          </nav>
      </>

  );
}

export default Navbar;