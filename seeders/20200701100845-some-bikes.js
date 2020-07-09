'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "bikes",
      [
        {
          name: "jimmy",
          latitude: 52.378877,
          longitude: 4.896858,
          reserved: "false",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "joanne",
          latitude: 52.368230,
          longitude: 4.913074,
          reserved: "false",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "claudette",
          latitude: 52.358027,
          longitude: 4.892204,
          reserved: "false",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "percy",
          latitude: 52.365316,
          longitude: 4.873372,
          reserved: "false",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "jip",
          latitude: 52.385413,
          longitude: 4.917933,
          reserved: "false",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "liza",
          latitude: 52.376535,
          longitude: 4.884172,
          reserved: "false",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("bikes", null, {});
  }
};
