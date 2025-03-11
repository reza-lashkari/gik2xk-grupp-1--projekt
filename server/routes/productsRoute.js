const router = require('express').Router();
const db = require('../models');
const validate = require("validate.js");
const productService = require('../services/productServices');


// GET request för att hämta produkter
router.get('/', (req, res) => {
    productService.getAll().then((result) => {
        res.status(result.status).json(result.data);
    });
});



// POST request för att skapa en ny produkt (eller ta emot data)
router.post('/', (req, res) => {
    const products = req.body;
    productService.getAll().then((result) => {
        res.status(result.status).json(result.data);
    });
});
router.put('/', (req, res) => {
 db.products.update(req.body, {
    where: {
        id: req.body.id
    }
}).then((result => {
    res.send(result);
}));
});


router.delete('/', (req, res) => {
    db.products.destroy( {
        where: {
            id: req.body.id
        }
    }).then((result => {
        res.json(`inlägget är borttaget ${result}`);
    }));
});




module.exports = router;


