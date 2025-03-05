const router = require('express').Router();
const db = require('../models');
const validate = require('validate.js');

const constraints = {
    email: {
        length: {
        minimum: 4,
        maximum: 200,
        tooShort: '^E-postadressen måste vara minst %{count} tecken långt.',
        tooLong: '^E-postadressen får inte vara längre än %{count} tecken långt.'
        },
        email: {
            message: "^E-postadressen är i ett felaktigt format."
        }
    }
};
router.get('/:id/customers', (req, res) => {
     const id = req.params.id;
        postService.getByAuthor(id).then((result) => {
            res.status(result.status).json(result.data);
        });

});

router.get('/', (req, res) => {
    db.customers.findAll().then((result) => {
        res.send(result);
    })
});

router.post('/', (req, res) => {
    const customers = req.body;
    const invalidData = validate(customers, constraints);
    if (invalidData) {
        res.status(400).json(invalidData);
    } else{
        db.customers.create(customers).then(result => {
            res.send(result);
        });
    }
});

router.put('/', (req, res) => {
    const customers = req.body;
    const invalidData = validate(customers, constraints);
    const id = customers.id;
    if(invalidData || !id) {
        res.status(400).json(invalidData || 'Id är obligatoriskt.');
    } else {
    db.customers
    .update(customers, {
        where: { id: customers.id }
    })
    .then(result => {
        res.send(result);
    });
    }   
});

router.delete('/', (req, res) => {
    db.customers
    .destroy({
        where: {
            id: req.body.id
        }
    }).then(result => {
        res.json(`produkten raderades ${result}`);
    });
});

module.exports = router;