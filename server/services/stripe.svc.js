var stripe = require('stripe') (process.env.STRIPE_SECRET_KEY);

exports.charge = function(token, priceToCharge) {
    return stripe.charges.create({
        amount: priceToCharge,
        currency: 'usd',
        source: token,
        description: 'Depot/U Online Store purchase'
    });
}
