'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      return Promise.all([
        queryInterface.addColumn('notifications', 'sender_name', {
          type: Sequelize.STRING(100),
          allowNull: true,
          after: 'admin_id',
        }, { transaction: t }),
        queryInterface.addColumn('notifications', 'sender_email', {
          type: Sequelize.STRING(100),
          allowNull: true,
          after: 'sender_name',
        }, { transaction: t }),
      ])
    })
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {
      return Promise.all([
        queryInterface.removeColumn('notifications', 'sender_name', { transaction: t }),
        queryInterface.removeColumn('notifications', 'sender_email', { transaction: t }),
      ])
    })
  }
};
