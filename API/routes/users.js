const { Router } = require('express');
const { check } = require('express-validator');

const {
  usersGet,
  userGet,
  usersPut,
  usersPost,
  usersDelete,
} = require('../controllers/users');

const { emailExists, exitsUserById } = require('../helpers/db-validators');

const { validateFields, validateJWT, isAdminRole } = require('../middlewares');

const router = Router();

router.get('/', usersGet);
router.get('/:id', [check('id').custom(exitsUserById)], userGet);
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check(
      'password',
      'The password must be more than 8 characters including numbers, uppercase, lowercase and symbols '
    ).isStrongPassword(),
    check('email', 'The email is not valid').isEmail().normalizeEmail({
      all_lowercase: true,
    }),
    check('email').custom(emailExists),
    validateFields,
  ],
  usersPost
);
router.put(
  '/:id',
  [
    check('id').custom(exitsUserById),
    check('name', 'Name is required').not().isEmpty(),
    check(
      'password',
      'The password must be more than 8 characters including numbers, uppercase, lowercase and symbols '
    ).isStrongPassword(),
    validateFields,
  ],
  usersPut
);

router.delete(
  '/:id',
  [validateJWT, isAdminRole, check('id').custom(exitsUserById), validateFields],
  usersDelete
);

module.exports = router;
