import { Router } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import config from 'config';
import { User } from '../../../models';
import { Validators, ErrorHandler, UserService, winstonLogger } from '../../../services';

const router = Router();
const validators = new Validators();
const userServiceInstance = new UserService(User);


// @route  POST v1
// @desc   Authenticate user & get token
// @access Public
router.post('/', validators.authenticateUser(), async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorHandler(400, errors.array());
    }

    const { login, password } = req.body;
    const user = await userServiceInstance.findUser({ where: { login } });

    if (!user || (password !== user.password)) {
      throw new ErrorHandler(400, 'Invalid credentials');
    }

    // Return JWT
    const payload = {
      user: { id: user.id }
    };

    jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 100000 }, (error, token) => {
      if (error) {
        winstonLogger.error(error.message);
      }
      res.json({ token });
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
