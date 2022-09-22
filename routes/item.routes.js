module.exports = app => {
    const items = require("../controllers/item.controller.js");

    var router = require("express").Router();

    // Creación de un nuevo item
    router.post("/", items.create);

    // Recuperar todos los items
    router.get("/", items.findAll);

    // Recuperar un item por su id
    router.get("/:id", items.findOne);

    // Actualizamos un item por su id
    router.put("/:id", items.update);

    // Eliminamos un item
    router.delete ("/:id", items.delete);

    app.use('/api/items', router);
};