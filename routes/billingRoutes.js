const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecret);
const requireLogin = require('../middleware/requireLogin');
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
    amount: 500,
    currency: 'usd',
    source: req.body.id,
    description: '5$ for 5 credit'
    });
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
