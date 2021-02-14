'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.Cart, {
        through: { model: models.CartItem },
        as: 'carts',
        foreignKey: 'ProductId'
      }),
        Product.belongsToMany(model.Order, {
          through: { model: models.OrderItem },
          as: 'orders',
          foreignKey: 'ProductId'
        })
    }
  };
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};