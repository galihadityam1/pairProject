'use strict';
const {
  Model
} = require('sequelize');
const Helper = require('../helper');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Car.belongsTo(models.Category)
      Car.hasMany(models.ProfileCar)
    }

    get formatPrice(){
      return Helper.formatPrice(this.price)
    }
  }
  Car.init({
    name: DataTypes.STRING,
    CategoryId: DataTypes.STRING,
    price: DataTypes.INTEGER,
    carImage: DataTypes.STRING,
    carReleased: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Car'
  });
  return Car;
};