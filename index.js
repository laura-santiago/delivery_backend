const express = require ("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
// normal use. Doesn't delete the database data
db.sequelize.sync();

// In development, you may need to drop existing tables and re-sync database
// db.sequelize.sync({ force: true }).then ( () => {
//     console.log("Borrando y re-sincronizando la bd.");
// });

// simple route
app.get("/", (req, res) => {
    res.json({ message: " Bienvenido a servicio de catering." });
});

require("./routes/item.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log (`El servidor está corriendo en el puerto ${PORT}.`);
}); 