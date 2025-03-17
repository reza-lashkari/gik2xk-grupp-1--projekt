const router = require('express').Router();
const cartServices = require('../services/cartServices');

router.post('/addProduct', async (req, res) => {
    try {
        const { customerId, productId, amount } = req.body;
        if (!customerId || !productId || !amount) {
            return res.status(400).json({ message: "customerId, productId och amount är obligatoriska." });
        }

        const cartRow = await cartServices.addProductToCart(customerId, productId, amount);
        res.status(200).json({ message: 'Produkten lades till i varukorgen', cartRow });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Fel vid hantering av varukorgen", error });
    }
});

module.exports = router;