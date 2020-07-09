'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("bikes", "locked", {
      type: Sequelize.BOOLEAN,
      defaultValue: 'true'
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'bikes',
      'locked'
    );
  }
};
