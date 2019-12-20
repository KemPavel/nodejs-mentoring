import { Router } from 'express';
import bcrypt from 'bcryptjs';
import uuid from 'uuid';
import { validationResult } from 'express-validator';
import validators from '../../utils/validators';

const router = Router();
const users = [];

// @route  GET v1/users
// @desc   Get a list of all users
// @access Public
router.get('/', (req, res) => {
  const { login, limit = 5 } = req.query;
  if (login) {
    const suggestedUsers = users
      .filter((user) => user.login.toLowerCase().includes(login.toLowerCase()))
      .slice(0, limit)
      .sort();
    return res.json(suggestedUsers);
  }

  res.json(users);
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
    id: uuid.v4(),
    login,
    age,
    isDeleted: false
  };

  // Encrypt password
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);

  users.push(newUser);
  res.json(newUser.id);
});

// @route  PUT v1/users/:userId
// @desc   Update user info
// @access Private
router.put('/:userId', validators, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = users.find((usr) => usr.id === req.params.userId);
  const userIndex = users.findIndex((usr) => usr.id === req.params.userId);

  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

  const updatedUser = {
    ...user,
    ...req.body
  };

  users.splice(userIndex, 1, updatedUser);

  res.json(users);
});

// @route  GET v1/users/:userId
// @desc   Get a user by ID
// @access Public
router.get('/:userId', (req, res) => {
  const user = users.find((usr) => usr.id === req.params.userId);

  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

  res.json(user);
});


// @route  DELETE v1/users/:userId
// @desc   Delete a user by ID
// @access Private
router.delete('/:userId', (req, res) => {
  const user = users.find((usr) => usr.id === req.params.userId);
  const userIndex = users.findIndex((usr) => usr.id === req.params.userId);

  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

  const updatedUser = {
    ...user,
    isDeleted: true
  };

  users.splice(userIndex, 1, updatedUser);

  res.json(users);
});


module.exports = router;
