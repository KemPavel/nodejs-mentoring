import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../../models';
import { validationResult } from 'express-validator';
import { Op } from 'sequelize';
import validators from '../../services/validators';

const router = Router();

// @route  GET v1/users
// @desc   Get a list of all users
// @access Public
router.get('/', (req, res) => {
  const options = { attributes: { exclude: ['password'] } };
  const { login, limit = 5 } = req.query;

  if (login) {
    options.where = {
      login: { [Op.startsWith]: login }
    };
    options.limit = limit;
  }
  User.findAll(options).then((users) => {
    res.json(users);
  });
});

// @route  POST v1/users
// @desc   Create a user
// @access Public
router.post('/', validators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { login, password, age } = req.body;
  const newUser = {
    login,
    age
  };

  // Encrypt password
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);

  User.create(newUser).then((user) => {
    res.json(user);
  });
});

// @route  PUT v1/users/:userId
// @desc   Update user info
// @access Private
router.put('/:userId', validators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  User.findOne({ where: { id: req.params.userId } }).then((user) => {
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    User.update(
      { ...req.body },
      {
        where: { id: req.params.userId },
        returning: true,
        plain: true
      }
    ).then((updatedUser) => {
      res.json(updatedUser);
    });
  });
});

// @route  GET v1/users/:userId
// @desc   Get a user by ID
// @access Public
router.get('/:userId', async (req, res) => {
  User.findOne({ where: { id: req.params.userId } }).then((user) => {
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  });
});


// @route  DELETE v1/users/:userId
// @desc   Delete a user by ID
// @access Private
router.delete('/:userId', (req, res) => {
  User.findOne({ where: { id: req.params.userId } }).then((user) => {
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    User.update(
      { isDeleted: true },
      {
        where: { id: req.params.userId },
        returning: true,
        plain: true
      }
    ).then(() => {
      res.status(204);
    });
  });
});


module.exports = router;
