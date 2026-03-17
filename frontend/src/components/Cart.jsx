import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Cart({ cart, updateCart, removeCart }) {
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="list-group">
          {cart.map((c) => (
            <div
              key={c.id}
              className="list-group-item d-flex justify-content-between align-items-center mb-2"
            >
              <div>
                <h5>{c.product.name}</h5>
                <p>Price: ₹{c.product.price}</p>
                <div className="d-flex align-items-center gap-2">
                  <span>Qty:</span>
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
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <h4 className="mt-3">Total: ₹{totalPrice}</h4>
    </div>
  );
}

export default Cart;