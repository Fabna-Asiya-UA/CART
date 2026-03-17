import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE = "http://127.0.0.1:8000/api/";

// Inline ProductCard component
const ProductCard = ({ product, addToCart }) => (
  <div className="card shadow-sm mb-4" style={{ width: "180px" }}>
    <img
      src={product.image}
      className="card-img-top"
      alt={product.name}
      style={{ height: "150px", objectFit: "cover" }}
    />
    <div className="card-body d-flex flex-column">
      <h6 className="card-title">{product.name}</h6>
      <p className="card-text">₹{product.price}</p>
      <button
        className="btn btn-sm btn-success mt-auto"
        onClick={() => addToCart(product.id)}
      >
        Add to Cart
      </button>
    </div>
  </div>
);

// Inline Cart component
const CartSidebar = ({ cart, updateCart, removeCart }) => {
  const total = cart.reduce((sum, c) => sum + c.product.price * c.quantity, 0);

  return (
    <div className="position-sticky top-0 border rounded p-3 shadow-sm" style={{ maxHeight: "80vh", overflowY: "auto" }}>
      <h4>Cart</h4>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="list-group list-group-flush">
          {cart.map((c) => (
            <li
              key={c.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h6>{c.product.name}</h6>
                <small>₹{c.product.price}</small>
                <div className="d-flex align-items-center gap-2 mt-1">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => updateCart(c.id, c.quantity - 1)}
                    disabled={c.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{c.quantity}</span>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => updateCart(c.id, c.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => removeCart(c.id)}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      )}
      <h5 className="mt-3">Total: ₹{total}</h5>
    </div>
  );
};

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCart, setLoadingCart] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await axios.get(`${API_BASE}products/`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchCart = async () => {
    try {
      setLoadingCart(true);
      const res = await axios.get(`${API_BASE}cart/`);
      setCart(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCart(false);
    }
  };

  const addToCart = async (id) => {
    try {
      await axios.post(`${API_BASE}cart/add/`, { product_id: id });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const updateCart = async (id, qty) => {
    if (qty < 1) return;
    try {
      await axios.post(`${API_BASE}cart/update/`, { cart_id: id, quantity: qty });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const removeCart = async (id) => {
    try {
      await axios.post(`${API_BASE}cart/remove/`, { cart_id: id });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Products Section */}
        <div className="col-lg-9 d-flex flex-wrap gap-3">
          {loadingProducts ? <p>Loading products...</p> : products.map(p => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} />
          ))}
        </div>

        {/* Floating Cart Sidebar */}
        <div className="col-lg-3">
          {loadingCart ? <p>Loading cart...</p> : (
            <CartSidebar cart={cart} updateCart={updateCart} removeCart={removeCart} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;