const { DataTypes, Model } = require('sequelize');
const db = require('../db/connection');

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'USER_ROLE',
    },
    state: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: '1',
    },
  },
  {
    sequelize: db,
    modelName: 'user',
  }
);

module.exports = User;
