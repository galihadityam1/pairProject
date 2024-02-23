'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.hasMany(models.ProfileCar)
      Profile.belongsTo(models.User)
    }

    static async roleName(){
      try {
        // let name
        if(Profile.gender === 'Laki'){
          return Profile.name = `Bapak ${Profile.name}`
        } else {
          return Profile.name = `Ibu ${Profile.name}`
        }
      } catch (error) {
        throw error
      }
    }
  }
  Profile.init({
    name: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    userImage: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};