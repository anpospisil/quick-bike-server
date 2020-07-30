'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("bikes", "lockCode", {
      type: Sequelize.INTEGER,
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'bikes',
      'lockCode'
    );
  }
};
