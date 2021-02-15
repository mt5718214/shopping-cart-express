'use strict';

const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Orders',
      Array.from({ length: 2 }).map((order, index) => ({
        name: faker.commerce.productName(),
        phone: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        amount: faker.random.number(),
        sn: faker.random.number(),
        shipping_status: Math.floor(Math.random()),
        payment_status: Math.floor(Math.random()),
        createdAt: new Date(),
        updatedAt: new Date()
      }), {}))
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Orders', null, {})
  }
};
