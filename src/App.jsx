import React from 'react';
import Veg from './Veg';
import NonVeg from './Non-veg';
import './Cart.css';
import './Veg.css';
import './mystyles.css';
import Home from './Home';
import Cart from './Cart';
import Milk from './Milk';
import Chocolate from './Chocolate';
import Signing from './Signing';
import Contactus from './Contactus';
import Aboutus from './Aboutus';
import Orders from './Orders';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Pagenation from './Pagenation';
import { toast, ToastContainer } from 'react-toastify';


function App() {
  const cartObjects = useSelector(globalState => globalState.cart);
  const count = cartObjects.reduce((total, item) => total + item.quantity, 0);

  return (
    <BrowserRouter>
      <div>
        <nav style={{ marginBottom: '10px' }}>
          <Link to="/">Home</Link>
          <Link to="/nonveg">Nonveg Item</Link>
          <Link to="/veg">Veg Item</Link>
          <Link to="/cart">Cart({count})</Link>
          <Link to="/milk">Milk</Link>
          <Link to="/chocolate">Chocolate</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/signing">Signing</Link>
          <Link to="/aboutus">About Us</Link>
          <Link to="/contactus">Contact Us</Link>
          <Link to="/Pagenation">Pagenation</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nonveg" element={<NonVeg />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/milk" element={<Milk />} />
          <Route path="/chocolate" element={<Chocolate />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/signing" element={<Signing />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/Pagenation" element={<Pagenation />} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>

        </div>

    </BrowserRouter>
  );
}

export default App;
