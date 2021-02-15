'use strict';

const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Carts',
      Array.from({ length: 3 }).map((cart, index) => ({
        id: index + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }), {}))
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Carts', null, {})
  }
};
