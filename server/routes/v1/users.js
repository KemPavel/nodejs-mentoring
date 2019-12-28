import { Router } from 'express';
import bcrypt from 'bcryptjs';
import uuid from 'uuid';
import { validationResult } from 'express-validator';
import dataStorage from '../../data/index';
import validators from '../../utils/validators';

const router = Router();

// @route  GET v1/users
// @desc   Get a list of all users
// @access Public
router.get('/', (req, res) => {
  const { login, limit } = req.query;
  if (login) {
    return res.json(dataStorage.getSuggestedUsers(login, limit));
  }
  res.json(dataStorage.getUsers());
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

  dataStorage.addUser(newUser);
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

  const user = dataStorage.getUserById(req.params.userId);

  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

  const updatedUser = {
    ...user,
    ...req.body
  };

  const userIndex = dataStorage.getUserIndex(req.body.userId);
  dataStorage.updateUser(userIndex, updatedUser);

  res.json(dataStorage.getUsers());
});

// @route  GET v1/users/:userId
// @desc   Get a user by ID
// @access Public
router.get('/:userId', (req, res) => {
  const user = dataStorage.getUserById(req.params.userId);

  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

  res.json(user);
});


// @route  DELETE v1/users/:userId
// @desc   Delete a user by ID
// @access Private
router.delete('/:userId', (req, res) => {
  const user = dataStorage.getUserById(req.params.userId);

  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

  const updatedUser = {
    ...user,
    isDeleted: true
  };

  const userIndex = dataStorage.getUserIndex(req.body.userId);
  dataStorage.updateUser(userIndex, updatedUser);

  res.json(dataStorage.getUsers());
});


module.exports = router;
