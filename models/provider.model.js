module.exports = (sequelize, Sequelize) => {
    const Provider = sequelize.define("provider", {
        name: {
            type: Sequelize.STRING 
        },
        actived: {
           type: Sequelize.BOOLEAN
        }
    });
    return Provider;
};