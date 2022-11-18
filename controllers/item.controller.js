const db = require("../models");
const Item = db.item;
const Op = db.Sequelize.Op;

// Create and Save a new Item
exports.create = (req, res) => {    
    // Validate request
    if (!req.body.description) {
        res.status(400).send({
            message: " Item description must be detail."
        });
        return;
    }

    // Creación del Item
    const item = {
        description: req.body.description,
        price: req.body.price,
        filename: req.file ? req.file.filename : ""
    };

    // Guaradamos en BBDD
    Item.create(item)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: 
              err.message || "Ups! Some error occurred while creating the item."
        });
    });
};

// Retrive all Items from the database
exports.findAll = (req, res) => { 
    const description = req.query.description;
    var condition = description ? { description: {[Op.like]: `%${description}%` } } : null;

    Item.findAll({ where: condition })
     .then(data => {
        console.log(data);
        res.send(data);
     })   
     .catch(err => {
        console.log("Llegamos al catch",err);
        res.status(500).send({
            message:
              err.message || "Oh! Oh! Some error occurred while retrieving the items."
        });
     });
};

// Find a single Item with an id
exports.findOne = (req, res) => {  
    const id = req.params.id;
    
    Item.findByPk(id)
     .then (data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `It was no possible to find the Item with id=${id}`
            });
        }
     })
     .catch ( err => {
        res.status(500).send({
            message: `Oh! Oh! Some error occurred while retrieving the item with id=${id}`
        });
     });
};

// Update an Item by the id in the request
exports.update = (req, res) => {  
    const id = req.params.id;

    Item.update (req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
            res.send ({
               message: "Item successfully updated." 
            });
        } else {
            console.log("error en el else ");
            console.log("num = ", num);
            console.log("req.body ",req.body);
            res.send ({
               message: `It was no possible to update the Item with id = ${id}`
            });
        }
      })
      .catch (err => {
          console.log("error: ",err);
          res.status(500).send({
            message: `Oh! Oh! Some error occurred while updating the Item with id=${id}`
          });
      });
};

// Delete an Item with the specified id in the request
exports.delete = (req, res) => {  
    const id = req.params.id;
    
    Item.destroy({
        where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        res.send({
            message: "Article removed successfully."
        });
      } else {
        res.send({
            message: `Oh! Oh! Some error occurred while removing the Item with id=${id}`
        });
      }
    })
    .catch(err => {
        res.status(500).send({
          message: `Oh! Oh! Some error occurred while removing the Item with id=${id}`
        });
    });
};

// Delete all Items from the database
exports.deleteAll = (req, res) => {  
    Item.destroy({
     where: {},
     truncate: false
    })
    .then(nums => {
        res.send({ message: `${nums} All articles were removed successfully.`});
    })
    .catch(err => {
        res.status(500).send({
            message: "Oh! Oh! Some error occurred while removing all the Items."
          });
    });
};