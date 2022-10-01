module.exports = (sequelize, Sequelize) => {
   const Item = sequelize.define("item", {
     description: {
        type: Sequelize.STRING
     },
     price: {
        type: Sequelize.DOUBLE
     },
     actived: {
        type: Sequelize.BOOLEAN
     }
   }); 
   return Item;
};