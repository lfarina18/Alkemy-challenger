const BudgetForm = require('../models/budgetForm');

const BudgetFormGet = async (req, res) => {
  const { userId } = req.params;
  const data = await BudgetForm.findAll({
    where: { state: '1', userId },
  });

  res.json( data );
};

const BudgetFormPost = async (req, res) => {
  const { concept, amount, type, userId } = req.body;

  const budgetForm = new BudgetForm({ concept, amount, type, userId });

  BudgetForm.build(budgetForm);

  await budgetForm.save();

  res.json(budgetForm);
};

const BudgetFormPut = async (req, res) => {
  const { id } = req.params;
  const item = await BudgetForm.findByPk(id);
  const { body } = req;

  await item.update(body);

  res.json(item);
};

const BudgetFormDelete = async (req, res) => {
  const { id } = req.params;

  const item = await BudgetForm.findByPk(id);
  if (!item) {
    return res.status(400).json({
      msg: 'Unable to delete item with id ' + id + ' .Does not exist',
    });
  }

  await item.update({ state: false });

  res.json(item);
};

module.exports = {
  BudgetFormGet,
  BudgetFormPost,
  BudgetFormPut,
  BudgetFormDelete
};
