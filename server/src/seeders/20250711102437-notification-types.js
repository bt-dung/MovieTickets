'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('notificationtypes', [
      {
        name: 'Feedback / Suggestion',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Staff behavior',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ticket booking issue',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ticket cancellation issue',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Service quality',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'other',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('notificationtypes', null, {});
  }
};
