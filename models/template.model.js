module.exports = (sequelize, Sequelize) => {
    const Template = sequelize.define("template",{
        name: {
            type: Sequelize.String           
        },
        item_id: {
            type: Sequelize.INTEGER
        },
        actived: {
           type: Sequelize.BOOLEAN
        }
    });
    return Template;
};