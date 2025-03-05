const router = require('express').Router();
const db = require('../models');
const validate = require("validate.js");
// GET request för att hämta produkter
router.get('/', (req, res) => {
    db.products.findAll().then((result) => {
        res.send(result);
    });
});

// POST request för att skapa en ny produkt (eller ta emot data)
router.post('/', (req, res) => {
db.products.create(req.body).then(result => {
    res.send(result);
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


