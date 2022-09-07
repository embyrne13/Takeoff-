'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      city: {
        type: Sequelize.STRING
      },
      airport: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      origin: {
        type: Sequelize.STRING
      },
      destination: {
        type: Sequelize.STRING
      },
      departDay: {
        type: Sequelize.DATE
      },
      departTime: {
        type: Sequelize.TIME
      },
      arrivalTime: {
        type: Sequelize.TIME
      },
      airline: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Flights');
  }
};