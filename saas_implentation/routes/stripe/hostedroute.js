const express = require('express');
const stripe = require('stripe')('sk_test_51O6XqFSIvk6cMNyquywrvuvsxS65J1AoLKPMojneia4tnrTjHc8FyMstdAcFGdln6T45xMHLvvcq7NDKmgPBA6sL00FIqUUNO0');
const router = express();

router.post('/create-checkout-session', async (req, res) => {
    const product = await stripe.products.create({
      name: req.body.product_name,
    });

    if(product){
        var price = await stripe.prices.create({
          product: `${product?.id}`,
          unit_amount: req.body.amount * 100,
          currency: 'inr',
        });
    }
    if(price.id){
      var session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: `${price.id}`,
            quantity: 1,
          },
        ],
        customer_email: 'shriharichaurasia143@gmail.com',
        mode: 'payment',
        success_url: 'http://localhost:5000/hosted/success',
        cancel_url: 'http://localhost:5000/hosted/cancel',
      });
      console.log(session)
      return res.redirect(303, session?.url);
    }


});

router.get('/success', async(req, res) => {
    try {
        return res.redirect('http://localhost:3000/success');
    } catch (error) {
        console.error(error.message)
    }
});


router.get('/cancel', async(req, res) => {
    try {
        return res.redirect('http://localhost:3000/failure');
    } catch (error) {
        console.error(error.message)
    }
});

module.exports = router;