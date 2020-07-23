'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      bike.hasMany(models.reservation)
    }
  };
  bike.init({
    name: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    reserved: { type: DataTypes.BOOLEAN, defaultValue: 'false' },
    lockCode: DataTypes.INTEGER,
    locked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'bike',
  });
  return bike;
};