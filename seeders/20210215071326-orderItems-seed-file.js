'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('OrderItems',
      Array.from({ length: 3 }).map((orderItem, index) => ({
        OrderId: Math.floor(Math.random() * 2) + 1,
        ProductId: Math.floor(Math.random() * 10) + 1,
        price: Math.floor(Math.random() * 500) + 1,
        quantity: Math.floor(Math.random() * 10) + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }), {}))
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('OrderItems', null, {})
  }
};
