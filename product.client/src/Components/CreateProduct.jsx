function CreateProduct() {
  return (

      <>
          <div className="card">
              <div className="card-header">
              <h2>Create Product</h2>
              </div>
              <div className="card-body">
                  <form>
                      <div className="row">
                          <div className="col">
                              <input type="text" className="form-control" placeholder="Product name" aria-label="Product name" />
                          </div>
                          <div className="col">
                              <input type="text" className="form-control" placeholder="Product Description" aria-label="Product Description" />
                          </div>
                      </div>
                      <div className="row">
                          <div className="col">
                              <input type="text" className="form-control" placeholder="Price" aria-label="Price" />
                          </div>
                          <div className="col">
                              <input type="text" className="form-control" placeholder="Stock" aria-label="Stock" />
                          </div>
                      </div>

                  </form>
              </div>

          </div>
      </>
  );
}

export default CreateProduct;