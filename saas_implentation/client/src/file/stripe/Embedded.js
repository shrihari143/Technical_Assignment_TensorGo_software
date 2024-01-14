import React, { useState } from "react";
import '../paypal/paypal.css';
import stripe from '../../image/stripe.png'
import CheckoutForm from "./Embedded/CheckoutForm";

const Embedded = () => {
  const [toggle, setToggle] = useState(true);
  const [amount, setAmount] = useState(0);
  const [product, setProduct] = useState('');
  const [payNow, setPayNow] = useState(false);

  const handleSubmit = (e)=>{
    e.preventDefault()
    setToggle(false)
    setPayNow(true)
  }
  
  return (
    <div className="embedded">
        {toggle && <div className="center mt-5">
            <img width={300} src={stripe} alt="" />
            <form onSubmit={handleSubmit} className="border text-center p-3 rounded-3 mt-3">
              <div className="col-12">
                <input type="text"  value={product} placeholder="Prouct Name" onChange={(e)=>{setProduct(e.target.value)}}/>
              </div>
              <div className="col-12">
                <input type="number"  value={amount} placeholder="Amount" onChange={(e)=>{setAmount(e.target.value)}}/>
              </div>
              <button className="px-3 bg-dark rounded-1">Pay Now</button>
            </form>
        </div>}
        {!toggle && <div className="text-center border p-3 m-3 rounded-3"> 
          <CheckoutForm data={{amount,product}} setToggle={setToggle} payNow={payNow}/>
        </div>}
    </div>
  )
}

export default Embedded;