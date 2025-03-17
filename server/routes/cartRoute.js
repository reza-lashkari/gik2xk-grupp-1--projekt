
const router = require('express').Router();
const db = require('../models');
// cartRoutes.js
const cartServices = require('../services/cartServices');

router.post('/cart/addProduct', async (req, res) => {
    try {
        const { customerId, productId, amount } = req.body;
        const cartRow = await cartServices.addProductToCart(customerId, productId, amount);
        res.status(200).json({
            message: 'Produkten lades till i varukorgen',
            cartRow
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Något gick fel vid hantering av varukorgen' });
    }
});


module.exports = router;