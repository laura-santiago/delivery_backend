module.exports = {
 HOST: "localhost",
 USER: "admin",
 PASSWORD: "Loras,22.",
 DB: "db_catering",
 dialect: "mysql",
 pool:  {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
 }
};