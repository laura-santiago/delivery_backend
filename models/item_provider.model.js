module.exports = (sequelize, Sequelize) => {
    const Item_Provider = sequelize.define ("item_provider", {
        item_id: {
            type: Sequelize.INTEGER
        },
        provider_id: {
            type: Sequelize.INTEGER
        }
    });
    return Item_Provider;
};