
const router = require('express').Router();
const db = require('../models');

/*
router.get('/:id/cart', (req, res) => {
    const id = req.params.id;
       postService.getByAuthor(id).then((result) => {
           res.status(result.status).json(result.data);
       });

});
*/
router.get('/', (req, res) => {
    db.cart.findAll().then((result) => {
        res.json(result || []); // Returnera en tom array om inget hittas
    }).catch(err => {
        res.status(500).json({ error: err.message });
    });
});





router.get('/', (req, res) => {
   db.cart.findAll().then((result) => {
       res.send(result);
   })
});



router.post('/', (req, res) => {
    const cart = req.body;
    const invalidData = validate(cart, constraints);
    if (invalidData) {
        res.status(400).json(invalidData);
    } else{
        db.cart.create(cart).then(result => {
            res.send(result);
        });
    }
});

router.put('/', (req, res) => {
    const cart = req.body;
    const invalidData = validate(cart, constraints);
    const id = cart.id;
    if(invalidData || !id) {
        res.status(400).json(invalidData || 'Id är obligatoriskt.');
    } else {
    db.cart
    .update(cart, {
        where: { id: cart.id }
    })
    .then(result => {
        res.send(result);
    });
    }   
});

router.delete('/', (req, res) => {
    db.cart
    .destroy({
        where: {
            id: req.body.id
        }
    }).then(result => {
        res.json(`varukorgen raderades ${result}`);
    });
});

module.exports = router;