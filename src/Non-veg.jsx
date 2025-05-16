import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './Store';
import './Non-veg.css';


function NonVeg() {
  const nonVegProducts = useSelector((state) => state.products.NonVeg); // Note: capital "V"
  const dispatch = useDispatch();

  return (
    <>
      <h1>Here Non-Veg items are displayed</h1>
      <h2>This is Big Basket app</h2>
      <div className="Nonveg-container">
        {nonVegProducts.map((product, index) => (
          <div className="Nonveg-card" key={index}>
            <img src={product.img} alt={product.name} className="Nonveg-image" />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => dispatch(addToCart(product))}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default NonVeg;

