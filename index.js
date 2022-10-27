const express = require ("express");
const cors = require("cors");

var path = require('path');

const app = express();

//public directory
app.use(express.static(path.join(__dirname, 'public')));

var corsOptions = {
    origin: "http://localhost:8100"
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//lectura y parseo del body
//app.use(express.json() );

const db = require("./models");

// OPCION A - BBDD creada, intentamos sincronización.
db.sequelize.sync()
    .then(() => {
        console.log("BBDD sincronizada!");
    })
    .catch((err) => {
        console.log("Ups! algo falló al sincronizarse con la BBDD: " + errr.message);
    });

// OPCION B - BBDD no creada o queremos volver a generarla (ojo, perdemos datos!)
// db.sequelize.sync({ force: true }).then ( () => {
//     console.log("Borrando y re-sincronizando BBDD.");
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
