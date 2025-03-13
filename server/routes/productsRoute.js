const router = require('express').Router();
const db = require('../models');
const validate = require("validate.js");
const productServices = require('../services/productServices');


// GET request för att hämta produkter
router.get('/', (req, res) => {
    productServices.getAll().then((result) => {
        res.status(result.status).json(result.data);
    });
});


router.get('/:id/', (req, res) => {
    const id = req.params.id;
    productServices.getById(id).then((result) =>  {
        res.status(result.status).json(result.data);
    });
});


// POST request för att skapa en ny produkt (eller ta emot data)
router.post('/', (req, res) => {
    const products = req.body;  // Hämta body-data från requesten

    productServices.create(products)  // Skicka products till create-funktionen
        .then((result) => {
            res.status(result.status).json(result.data);
        })
        .catch((error) => {
            console.error("Fel vid skapande av produkt:", error);
            res.status(500).json({ message: "Serverfel vid skapande av produkt", error });
        });
});


router.post('/:id/addRating', (req, res) => {
    const { rating } = req.body;
    const id = req.params.id;
  
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Betyg måste vara mellan 1 och 5" });
    }
  
    productServices.addRating(id, rating)
      .then((result) => {
        res.status(result.status).json(result.data);
      })
      .catch((error) => {
        console.error("Fel vid tillägg av betyg:", error);
        res.status(500).json({ message: "Serverfel vid tillägg av betyg" });
      });
  });
  



  router.put('/', (req, res) => {
    const products = req.body;
    const id = products.id;
  
    productServices.update(products, id).then((result) => {
      res.status(result.status).json(result.data);
    });
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


