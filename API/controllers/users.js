const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const BudgetForm = require('../models/BudgetForm');

const usersGet = async (req, res) => {
 
  const users = await User.findAndCountAll({
    where: { state: '1' },
    // include: {
    //   model: BudgetForm,
    //   attributes: ['concept'],
    // },
    attributes: {
      exclude: ['password'],
    },
    limit: 5,
    offset: 0,
  });

  res.json({ users });
};

const userGet = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  if (user && user.state) {
    res.json(user);
  } else {
    res.status(404).json({
      msg: `There is no user with the id: ${id}`,
    });
  }
};

const usersPost = async (req, res) => {
  const { name, email, password, role } = req.body;

  const user = new User({ name, email, password, role });

  // Encrypt the password
  const salt = bcryptjs.genSaltSync();

  user.password = bcryptjs.hashSync(password, salt);

  User.build(user);

  await user.save();

  res.json(user);
};

const usersPut = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  const { password, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  await user.update(
    { ...rest }, { where: { id }}
  );

  res.json(user);
};

const usersDelete = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);
  if (!user) {
    return res.status(400).json({
      msg: 'Unable to delete user with id ' + id + ' .Does not exist',
    });
  }

  await user.update({ state: false });

  res.json(user);
};

module.exports = {
  usersGet,
  userGet,
  usersPut,
  usersPost,
  usersDelete,
};
