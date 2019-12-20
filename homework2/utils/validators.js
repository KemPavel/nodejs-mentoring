import { check } from 'express-validator';

module.exports = [
  check('login', 'Login is required').not().isEmpty(),
  check('password')
    .not().isEmpty().withMessage('Password is required')
    .matches('[0-9]').withMessage('Password must contain at least one number')
    .matches('[A-Za-z]').withMessage('Password must contain at least one letter'),
  check('age')
    .not().isEmpty().withMessage('Age is required')
    .custom((age) => {
      if (age < 4 || age > 130) {
        throw new Error('Age must be between 4 and 130');
      }
      return true;
    })
];
