const BudgetForm = require('../models/budgetForm');
const User = require('../models/user');

const emailExists = async (email = '') => {
  const exitsEmail = await User.findOne({
    where: {
      email,
    },
  });

  if (exitsEmail) {
    throw new Error(`There is already a user with the email ${email}`);
  }
};

const exitsUserById = async (id) => {
  const exitsUser = await User.findByPk(id);
  
  if (!exitsUser || !exitsUser.state) {
    throw new Error(`The id: ${id} does not exist`);
  }
};

const exitsItemById = async (id) => {
  const item = await BudgetForm.findByPk(id);
  if (!item) {
    throw new Error(`The item: ${id} does not exist`);
  }
};

module.exports = { emailExists, exitsItemById, exitsUserById };
