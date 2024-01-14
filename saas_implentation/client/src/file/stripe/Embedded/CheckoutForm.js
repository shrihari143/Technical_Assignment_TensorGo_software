import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
const stripePromise = loadStripe("pk_test_51O6XqFSIvk6cMNyq3Jf1BY1vUkFjI0fhg4qDsVHEyFj0DBflsho2RoDZZr5v9OrsZC2D6BPTaFOpcvpCMpKbE8lL0095aCVKlE");

const CheckoutForm = ({data, setToggle, payNow}) => {
    const [clientSecret, setClientSecret] = useState('');
  
    useEffect(() => {
      // Create a Checkout Session as soon as the page loads
      if(payNow){
        fetch("/embedded/create-checkout-session", {
          method: "POST",
          body: JSON.stringify(data), // Convert data to a JSON string
          headers: {
            "Content-Type": "application/json", // Specify the content type as JSON
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setClientSecret(data.clientSecret);
            setToggle(false)
          });
      }
        // eslint-disable-next-line
    }, [payNow]);
  
    return (
      <div id="checkout">
        {clientSecret ? (
          <>
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{clientSecret}}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
            <button className="px-3 fs-6 bg-dark rounded-1" onClick={()=>{setToggle(true)}}>Cancel</button>
          </>
        )
        : 
        <p className='text-center'>The embedded checkout form will open here</p>
        }
      </div>
    )
  }

export default CheckoutForm
