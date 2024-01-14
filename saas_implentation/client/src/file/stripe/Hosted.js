import React, { useState, useEffect } from "react";
import '../paypal/paypal.css';
import book from '../../image/book.jpeg';
import gold from '../../image/gold.jpg'
import silver from '../../image/silver.jpg'
import copper from '../../image/copper.jpeg'
import tensor_logo from '../../image/Tensor.png'
const ProductDisplay = () => (
  <>
    <h2 style={{ textAlign: 'center' }}>
    <div >
        <img
          src={tensor_logo}  
          alt="Logo"
          style={{ width: '100px', height: '60px', borderRadius: '50%', marginTop: '40px',  }}
        />
      </div>SaaS Plan with Stripe Integration</h2>
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
    
      <section style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px' }}>
        <div className="product">
          <img
            width={300}
            height={400}  
            src={gold}
            alt="The cover of Stubborn Attachments"
            style={{ borderRadius: '10px' }}  
          />
          <div className="description">
            <h3 className="mt-4">Basic</h3>
            <h5>Limited to 1 user</h5>
            <h5>Price: Free for 14 days</h5>
          </div>
        </div>
        <form action="/hosted/create-checkout-session" method="POST">
          <input type="hidden" name="amount" value={99} />
          <input type="hidden" name="product_name" value="Basic Plan" />
          <button type="submit" className="px-4 rounded-1 bg-dark">
            Checkout
          </button>
        </form>
      </section>
      <section style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px' }}>
        <div className="product">
          <img
            width={300}
            height={400}
            src={silver}
            alt="The cover of Stubborn Attachments"
            style={{ borderRadius: '10px' }}
          />
          <div className="description">
            <h3 className="mt-4">Standard</h3>
            <h5>Per User, up to 5 users</h5>
            <h5>Price: INR 4999 Per Year</h5>
          </div>
        </div>
        <form action="/hosted/create-checkout-session" method="POST">
          <input type="hidden" name="amount" value={4999} />
          <input type="hidden" name="product_name" value="Standard Plan" />
          <button type="submit" className="px-4 rounded-1 bg-dark">
            Checkout
          </button>
        </form>
      </section>
      <section style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px' }}>
        <div className="product">
          <img
            width={300}
            height={400}
            src={copper}
            alt="The cover of Stubborn Attachments"
            style={{ borderRadius: '10px' }}
          />
          <div className="description">
            <h3 className="mt-4">Plus</h3>
            <h5>Limit: Per User, up to 10 users</h5>
            <h5>Price: INR 3999 Per Year</h5>
          </div>
        </div>
        <form action="/hosted/create-checkout-session" method="POST">
          <input type="hidden" name="amount" value={3999} />
          <input type="hidden" name="product_name" value="Plus Plan" />
          <button type="submit" className="px-4 rounded-1 bg-dark">
            Checkout
          </button>
        </form>
      </section>
    </div>
  </>
);


const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export const Hosted = ()=> {
  const [message, setMessage] = useState("");

  useEffect(() => {
    
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay/>
  );
}