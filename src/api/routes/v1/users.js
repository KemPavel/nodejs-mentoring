import { Router } from 'express';
import { Users, UserGroups, Groups } from '../../../models';
import { validationResult } from 'express-validator';
import { UserService, validators } from '../../../services';

const router = Router();
const userServiceInstance = new UserService(Users);

const addUsersToGroup = async (groupId, userIds) => {
  try {
    const group = await Groups.findOne({ where: { id: groupId } });
    for (const id of userIds) {
      const gr = await UserGroups.create({
        userId: id,
        groupId: group.id
      }, { returning: true });
      console.log('GROUP: ', gr);
    }
  } catch (error) {
    console.error('error: ', error);
  }
};


// @route  GET v1/users
// @desc   Get a list of all users
// @access Public
router.get('/', async (req, res) => {
  await addUsersToGroup(2, [1, 2, 3]);
  const { query } = req;
  const users = await userServiceInstance.findAllUsers(query);
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

  const { body } = req;
  const user = await userServiceInstance.createUser(body);
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


// @route  GET v1/users/:userId
// @desc   Get a user by ID
// @access Public
router.get('/:userId', (req, res) => {
  res.json(req.user);
});


// @route  PUT v1/users/:userId
// @desc   Update user info
// @access Private
router.put('/:userId', validators, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const userId = req.user.id;
  const { body } = req.body;
  const updatedUser = await userServiceInstance.updateUser(body, userId);
  res.json(updatedUser);
});


// @route  DELETE v1/users/:userId
// @desc   Delete a user by ID
// @access Private
router.delete('/:userId', async (req, res) => {
  const userId = req.user.id;
  await userServiceInstance.updateUser({ isDeleted: true }, userId);
  res.status(204).end();
});


module.exports = router;
