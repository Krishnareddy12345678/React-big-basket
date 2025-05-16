import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decCart, incCart, removeFromCart, clearCart } from './Store';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import './Cart.css';
import emailjs from 'emailjs-com'
function Cart() {

  
  const cartObjects = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const couponCodeRef = useRef();
  const [discountPercent, setDiscountPercent] = useState(10);
  const [couponDiscountPercent, setCouponDiscountPercent] = useState(0);
  const [couponName, setCouponName] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
const email=useRef();
  const handleCouponApply = () => {
    const code = couponCodeRef.current.value.trim().toUpperCase();
    setCouponName(code);

    switch (code) {
      case 'RAVI10':
        setCouponDiscountPercent(10);
        break;
      default:
        alert('❌ Invalid Coupon Code');
        setCouponDiscountPercent(0);
        break;
    }
  };

  const calculatingAmount = () => {
    const totalPrice = cartObjects.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const discountAmount = (totalPrice * discountPercent) / 100;
    const priceAfterDiscount = totalPrice - discountAmount;
    const taxPrice = (priceAfterDiscount * 0.5) / 100;
    const beforeCouponFinalPrice = priceAfterDiscount + taxPrice;
    const couponDiscount = (beforeCouponFinalPrice * couponDiscountPercent) / 100;
    const finalPrice = beforeCouponFinalPrice - couponDiscount;

    return { totalPrice, discountAmount, taxPrice, couponDiscount, finalPrice };
  };

  const {
    totalPrice,
    discountAmount,
    taxPrice,
    couponDiscount,
    finalPrice,
  } = calculatingAmount();

  const handleCompletePurchase = () => {
    const purchaseDateTime = new Date().toLocalString();
    const orderDetails = {
      OrderId: 'ORD-' + new Date().getTime(),
      DateTime: purchaseDateTime,
      items: [...cartObjects],
      finalPrice: finalPrice,

    };
    
    const templateParam ={
    order_Id:orderDetails.OrderId,
    orders: cartObjects.map(item=>({
      name:item.name,
      price:(item.price*item.quantity).toFixed(2),
      units:item.quantity
    })),
    cost:{
      shipping:50,
      tax:taxPrice.toFixed(2),
      total:finalPrice.toFixed(2)

    },
    email:customerEmail
    };
    emailjs.send('service_0lg8ycg','template_v6kqih9',templateParam,'y6oh6VQfmeGFJw7wX')
    .then(()=>{
      console.log('email sent successfully');
    })
    .catch((error)=>{
      console.error('email sending failed',error);
    });
    localStorage.setItem('latestOrder', JSON.stringify(orderDetails));
    dispatch(clearCart());
    setShowThankYou(true);

    setTimeout(() => {
      navigate('/Orders');
    }, 1500);
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cartObjects.length > 0 ? (
        <>
          <div className="cart-layout">
            <div className="cart-items">
              {cartObjects.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.img} alt={item.name} className="cart-image" />
                  <div className="cart-details">
                    <h3>{item.name}</h3>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <div className="cart-buttons">
                      <button className="inc" onClick={() => dispatch(incCart(item))}>+</button>
                      <button className="dec" onClick={() => dispatch(decCart(item))} disabled={item.quantity <= 1}>-</button>
                      <button className="remove" onClick={() => dispatch(removeFromCart(item))}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Total Amount: ${totalPrice.toFixed(2)}</h2>

              <div className="discount-buttons">
                <span>Apply Discount:</span>
                <button onClick={() => setDiscountPercent(10)}>10%</button>
                <button onClick={() => setDiscountPercent(30)}>30%</button>
                <button onClick={() => setDiscountPercent(50)}>50%</button>
              </div>



              <h3>Discount ({discountPercent}%): -${discountAmount.toFixed(2)}</h3>
              <h3>Tax (0.5%): +${taxPrice.toFixed(2)}</h3>
              {couponDiscountPercent > 0 && (
                <h3>
                  Coupon ({couponName}): -${couponDiscount.toFixed(2)} ({couponDiscountPercent}%)
                </h3>
              )}
              <h2>Final Price: ${finalPrice.toFixed(2)}</h2>
              <div>
                <label>
                  Enter your email
                </label>
                <input type='email'
                       ref={email}
                       onChange={(e)=>setCustomerEmail(e.target.value)}
                       placeholder='enter your email'/>
              </div>
              <button className="clear-cart" onClick={() => dispatch(clearCart())}>Clear Cart</button>
              <button className="complete-purchase" onClick={handleCompletePurchase}>Complete Purchase</button>

              <div className="payment-method">
                <h3>Select Payment Method:</h3>
                <button onClick={() => setPaymentMethod('QR')}>QR Code</button>
                <button onClick={() => setPaymentMethod('card')}>Card</button>
              </div>

              {paymentMethod === 'QR' && (
                <div className="qr-section">
                  <h4>Scan QR to pay ₹{finalPrice.toFixed(2)}</h4>
                  <QRCode value={`upi://pay?pa=9346649133@ybl&pn=RatanStore&am=${finalPrice.toFixed(2)}&cu=INR`} />
                  <p>UPI ID: 9346649133@ybl</p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="card-section">
                  <h4>Pay ₹{finalPrice.toFixed(2)}</h4>
                  <label htmlFor="card-number">Card Number</label>
                  <input type="text" id="card-number" placeholder="1234 5678 9012 3456" maxLength="19" required />
                  <label htmlFor="cardholdername">Cardholder Name</label>
                  <input type="text" id="cardholdername" placeholder="John Doe" maxLength="20" required />
                  <label htmlFor="expiry">Expiry Date</label>
                  <input type="text" id="expiry" placeholder="MM/YY" maxLength="5" required />
                  <label htmlFor="cvv">CVV</label>
                  <input type="password" id="cvv" placeholder="123" maxLength="3" required />
                </div>
              )}

              {showThankYou && (
                <h2 style={{ color: 'green' }}>
                  Thank you for your purchase! Redirecting to Orders...
                </h2>
              )}
            </div>
          </div>

          <div className="coupon-section">
            <input type="text" ref={couponCodeRef} placeholder="Enter Coupon Code" />
            <button onClick={handleCouponApply}>Apply Coupon</button>
          </div>
        </>
      ) : (
        <h2>Your cart is empty</h2>
      )}
    </div>
  );
}


export default Cart;
