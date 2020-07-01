"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          name: "testuser",
          email: "test@test.com",
          password: bcrypt.hashSync("test1234", SALT_ROUNDS),
          imageURL: "https://p7.hiclipart.com/preview/340/956/944/computer-icons-user-profile-head-ico-download.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "dummy",
          email: "a@a.com",
          password: bcrypt.hashSync("a", SALT_ROUNDS),
          imageURL: "https://p7.hiclipart.com/preview/340/956/944/computer-icons-user-profile-head-ico-download.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "jane",
          email: "jane@mail.com",
          password: bcrypt.hashSync("asd123", SALT_ROUNDS),
          imageURL: "https://p7.hiclipart.com/preview/340/956/944/computer-icons-user-profile-head-ico-download.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "john",
          email: "j@j.com",
          password: bcrypt.hashSync("j", SALT_ROUNDS),
          imageURL: "https://p7.hiclipart.com/preview/340/956/944/computer-icons-user-profile-head-ico-download.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
