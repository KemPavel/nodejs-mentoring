import { Router } from 'express';
import { User } from '../../../models';
import { validationResult } from 'express-validator';
import UserService from '../../../services/UserService';
import validators from '../../../services/validators';

const router = Router();
const userServiceInstance = new UserService(User);


// @route  GET v1/users
// @desc   Get a list of all users
// @access Public
router.get('/', async (req, res) => {
  const users = await userServiceInstance.findAllUsers(req.query);
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

  const user = await userServiceInstance.createUser(req.body);
  res.json(user);
});


// Put the user to req.user if exists
router.param('userId', async (req, res, next, userId) => {
  const user = await userServiceInstance.findUser(userId);
  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }
  req.user = user;
  next();
});


// @route  PUT v1/users/:userId
// @desc   Update user info
// @access Private
router.put('/:userId', validators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const updatedUser = await userServiceInstance.updateUser(req.body, req.user.id);
  res.json(updatedUser);
});


// @route  GET v1/users/:userId
// @desc   Get a user by ID
// @access Public
router.get('/:userId', async (req, res) => {
  res.json(req.user);
});


// @route  DELETE v1/users/:userId
// @desc   Delete a user by ID
// @access Private
router.delete('/:userId', async (req, res) => {
  await userServiceInstance.updateUser({ isDeleted: true }, req.user.id);
  res.status(204).end();
});


module.exports = router;
