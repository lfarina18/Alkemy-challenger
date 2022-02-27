const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const User = require('../models/user');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        msg: 'User / Password are not correct',
      });
    }

    if (!user.state) {
      return res.status(400).json({
        msg: 'User / Password are not correct',
      });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: 'User / Password are not correct',
      });
    }

    // JWT
    const token = await generateJWT(user.id);

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Talk to the administrator',
    });
  }
};



module.exports = {
  login,
  
};
