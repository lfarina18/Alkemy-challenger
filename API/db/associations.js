const BudgetForm = require("../models/budgetForm");
const User = require("../models/user");

User.hasOne(BudgetForm);

BudgetForm.belongsTo(User);