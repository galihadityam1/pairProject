'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProfileCar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProfileCar.belongsTo(models.Car)
      ProfileCar.belongsTo(models.Profile)
    }
  }
  ProfileCar.init({
    ProfileId: DataTypes.STRING,
    CarId: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProfileCar',
  });
  return ProfileCar;
};