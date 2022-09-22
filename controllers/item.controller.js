const db = require("../models");
const Item = db.item;
const Op = db.Sequelize.Op;

// Create and Save a new Item
exports.create = (req, res0) => {    
    // Validate request
    if (!req.body.brand) {
        res.status(400).send({
            message: " Debe especificar algún dato"
        });
        return;
    }

    // Creación del Item
    const item = {
        description: req.body.description,
        price: req.body.price
    };

    // Guaradamos en BBDD
    Item.create(item)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
              err.message || "Ups! algo ocurrió mientras se creaba el item."
        });
    });
};

// Retrive all Items from the database
exports.findAll = (req, res) => { 
    console.log("llegó al findAll");

    Item.findAll()
     .then(data => {
        console.log("Llegamos a data");
        console.log(data);
        res.send(data);
     })   
     .catch(err => {
        console.log("Llegamos al catch",err);
        res.status(500).send({
            message:
              err.message || "Oh! Oh! algo ocurrió mientras recibíamos los items."
        });
     });
};

// Find a single Item with an id
exports.findOne = (req, res) => {    
};

// Update an Item by the id in the request
exports.update = (req, res) => {    
};

// Delete an Item with the specified id in the request
exports.delete = (req, res) => {    
};