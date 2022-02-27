const { DataTypes, Model } = require('sequelize');
const db = require('../db/connection');

class BudgetForm extends Model {}
  
BudgetForm.init({
  concept: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: "1"
  }
}, { 
  sequelize: db, 
  modelName: 'budgetform' 
});

module.exports = BudgetForm;
