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
// Hämta senaste varukorgen för en användare
router.get("/:id/getCart", async (req, res) => {
    try {
        const userId = req.params.id;


        // Hitta den senaste varukorgen för användaren
        const latestCart = await Cart.find({ userId })
            .sort({ createdAt: -1 }) // Sortera så senaste kommer först
            .limit(1) // Hämta bara en varukorg
            .populate("products.productId"); // Hämta produktinfo


        if (!latestCart.length) {
            return res.status(404).json({ message: "Ingen varukorg hittades" });
        }


        res.json(latestCart[0].products); // Returnera produkter från den senaste varukorgen
    } catch (error) {
        res.status(500).json({ message: "Serverfel", error });
    }
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
        res.json(`kunden raderades ${result}`);
    });
});

module.exports = router;