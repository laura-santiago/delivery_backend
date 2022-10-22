const db = require("../models");
const Item = db.item;
const Op = db.Sequelize.Op;

// Create and Save a new Item
exports.create = (req, res) => {    
    // Validate request
    if (!req.body.description) {
        res.status(400).send({
            message: " Debe especificar la descripcion del articulo"
        });
        return;
    }

    // Creación del Item
    const item = {
        description: req.body.description,
        price: req.body.price,
        actived: req.body.actived ? req.body.actived : false,
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
              err.message || "Ups! algo ocurrió mientras se creaba el item."
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
              err.message || "Oh! Oh! algo ocurrió mientras recibíamos los items."
        });
     });
};

// Retrive all Items Actived from the database (with condition)
exports.findAllActived = (req, res) => {
    Item.findAll({ where: { actived: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Oh! Oh! algo ocurrió mientras recibíamos los items activos."
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
                message: `No se ha encontrado el Articulo con id=${id}`
            });
        }
     })
     .catch ( err => {
        res.status(500).send({
            message: `Oh! Oh! algo ocurrió al intentar recuperar el Articulo con id=${id}`
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
               message: "Articulo actualizado satisfactoriamente." 
            });
        } else {
            console.log("error en el else ");
            console.log("num = ", num);
            console.log("req.body ",req.body);
            res.send ({
               message: `No se pudo actualizar el articulo con id = ${id}. Quizás el articulo no fue encontrado o req.body esta vacio!`
            });
        }
      })
      .catch (err => {
          console.log("error: ",err);
          res.status(500).send({
            message: `Oh! Oh! algo ocurrió al intentar actualizar el Articulo con id=${id}`
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
            message: "Articulo eliminado satisfactoriamente."
        });
      } else {
        res.send({
            message: `Oh! Oh! algo ocurrió al intentar eliminar el Articulo con id=${id}`
        });
      }
    })
    .catch(err => {
        res.status(500).send({
          message: `Oh! Oh! algo ocurrió al intentar eliminar el Articulo con id=${id}`
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
        res.send({ message: `${nums} Articulos fueron eliminados satisfactoriamente.`});
    })
    .catch(err => {
        res.status(500).send({
            message: "Oh! Oh! algo ocurrió al intentar eliminar todos los Articulos."
          });
    });
};