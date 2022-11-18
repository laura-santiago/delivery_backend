module.exports = app => {
    const items = require("../controllers/item.controller.js");
    var upload = require('../multer/upload');
    const auth = require("../controllers/auth.js");

    var router = require("express").Router();

    // Creación de un nuevo articulos
    router.post("/", auth.isAuthenticated, upload.single('file'), items.create);

    // Recuperar todos los articulos
    router.get("/", auth.isAuthenticated, items.findAll);

    // Recuperar un articulos por su id
    router.get("/:id", auth.isAuthenticated, items.findOne);

    // Actualizamos un articulos por su id
    router.put("/:id", auth.isAuthenticated, items.update);

    // Eliminamos un articulos
    router.delete ("/:id", auth.isAuthenticated, items.delete);

    // Eliminamos todos los articulos
    router.delete("/", auth.isAuthenticated, items.deleteAll);    

    app.use('/api/items', router);
};