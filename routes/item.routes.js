module.exports = app => {
    const items = require("../controllers/item.controller.js");

    var router = require("express").Router();

    // Creación de un nuevo articulos
    router.post("/", items.create);

    // Recuperar todos los articulos
    router.get("/", items.findAll);

    // Recuperar todos los items activos
    router.get("/actived", items.findAllActived);    

    // Recuperar un articulos por su id
    router.get("/:id", items.findOne);

    // Actualizamos un articulos por su id
    router.put("/:id", items.update);

    // Eliminamos un articulos
    router.delete ("/:id", items.delete);

    // Eliminamos todos los articulos
    router.delete("/", items.deleteAll);    

    app.use('/api/items', router);
};