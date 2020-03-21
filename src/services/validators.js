import { check } from 'express-validator';

export default class Validators {
  login() {
    return check('login', 'Login is required').not().isEmpty();
  }

  password() {
    return check('password')
      .not().isEmpty().withMessage('Password is required')
      .matches('[0-9]').withMessage('Password must contain at least one number')
      .matches('[A-Za-z]').withMessage('Password must contain at least one letter');
  }

  age() {
    return check('age')
      .not().isEmpty().withMessage('Age is required')
      .custom((age) => {
        if (age < 4 || age > 130) {
          throw new Error('Age must be between 4 and 130');
        }
        return true;
      });
  }

  authenticateUser() {
    return [
      this.login(),
      check('password', 'Password is required').exists()
    ];
  }

  createUser() {
    return [
      this.login(),
      this.password(),
      this.age()
    ];
  }

  updateUser() {
    return [...this.createUser()];
  }
}
