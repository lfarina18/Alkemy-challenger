const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post(
    '/login',
    [
      
      check('email', 'Email is required').isEmail(),
      check('password', 'Password is required').not().isEmpty(),
      validateFields,
    ],
    login
  );

  router.get('/login', validateJWT );

  module.exports = router;