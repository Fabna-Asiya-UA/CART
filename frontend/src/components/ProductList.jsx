import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function ProductList({ products, addToCart }) {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Products</h2>
      <div className="row">
        {products.map((p) => (
          <div key={p.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100">
              <img
                src={p.image}
                className="card-img-top"
                alt={p.name}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">₹{p.price}</p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => addToCart(p.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;