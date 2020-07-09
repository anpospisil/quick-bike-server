'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("reservations", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
    await queryInterface.addColumn("reservations", "bikeId", {
      type: Sequelize.INTEGER,
      references: {
        model: "bikes",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("reservations", "userId");
    await queryInterface.removeColumn("reservations", "bikeId");
  }
};
