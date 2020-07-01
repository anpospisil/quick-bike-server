'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "reservations",
      [
        {
          startTime: new Date(),
          endTime: new Date(),
          cost: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startTime: new Date(),
          endTime: new Date(),
          cost: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startTime: new Date(),
          endTime: new Date(),
          cost: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          startTime: new Date(),
          endTime: new Date(),
          cost: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("reservations", null, {});
  }
};
