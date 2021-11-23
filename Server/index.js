const express = require('express');
const app = express();
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const stripe = require('stripe')('');
// const bodyParser = require('body-parser');
const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(cors())

app.post("/payment", cors(), async (req,res) => {
    let {amount, id,  name, phone, license} = req.body

    try{
    const payment = await stripe.paymentIntents.create({
        amount,
        currency: "CAD",
        description: `Purchased by ${name} owner of ${license}. Can be contacted at ${phone}`,
        payment_method: id,
        confirm: true,

    });

  
    res.send({
        clientSecret: paymentIntent.client_secret,
      });
    res.json({
        message: ' payment successful',
        success: true,
    });

    }catch(error){
        res.json({
            message: 'payment failed',
            success: true,
        });
    }
});
app.listen(process.env.PORT || 4000, () =>{
console.log('Server 4000 working')
});


// let {amount, id} = req.body;
// try {
//     const payment = await stripe.paymentIntents.create({
//         amount,
//         currency: "CAD",
//         description: 'parking test',
//         payment_method: id,
//         confirm: true,

//     });
//     console.log('Payment ', payment)
//     res.json({
//         message: ' payment successful',
//         success: true,
//     });

// }catch(error){
//     res.json({
//         message: ' payment failed',
//         success: true,
//     });
// };