const { Router } = require('express');
const { check } = require('express-validator');

const {
  BudgetFormGet,
  BudgetFormPost,
  BudgetFormDelete,
  BudgetFormPut,
} = require('../controllers/budgetForm');
const { exitsItemById } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares');

const router = Router();

router.get('/:userId', BudgetFormGet);

router.post(
  '/',
  [
    check('concept', 'Concept is required').not().isEmpty(),
    check('type', 'Type is required').not().isEmpty(),
    check('amount', 'Amount is required').not().isEmpty(),
    check('amount', 'The amount must be a valid number').isNumeric(),
    validateFields,
  ],
  BudgetFormPost
);

router.put(
  '/:id',
  [check('id').custom(exitsItemById), validateFields],
  BudgetFormPut
);

router.delete(
  '/:id',
  [check('id').custom(exitsItemById), validateFields],
  BudgetFormDelete
);

module.exports = router;
