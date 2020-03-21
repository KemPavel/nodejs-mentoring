import { Router } from 'express';
import { User, UserGroups, Group } from '../../../models';
import { validationResult } from 'express-validator';
import { UserService, UserGroupsService, Validators, ErrorHandler } from '../../../services';

const router = Router();
const validators = new Validators();
const userServiceInstance = new UserService(User);
const userGroupsServiceInstance = new UserGroupsService(UserGroups, Group);

// @todo remove route after testing
// @route  GET v1/users/groups
// @desc   TEST ROUTE - Add users to group and return a list of all user groups
// @access Public
router.get('/groups', async (req, res, next) => {
  try {
    await userGroupsServiceInstance.addUsersToGroup(2, [1, 2, 4]);
    const userGroups = await UserGroups.findAll();
    res.json(userGroups);
  } catch (err) {
    return next(err);
  }
});


// @route  GET v1/users
// @desc   Get a list of all users
// @access Public
router.get('/', async (req, res, next) => {
  try {
    const { query } = req;
    const users = await userServiceInstance.findAllUsers(query);
    res.json(users);
  } catch (err) {
    return next(err);
  }
});


// @route  POST v1/users
// @desc   Create a user
// @access Public
router.post('/', validators.createUser(), async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorHandler(400, errors.array());
    }

    const { body } = req;
    const user = await userServiceInstance.createUser(body);
    res.json(user);
  } catch (err) {
    return next(err);
  }
});


// Put the user to req.user if exists
router.param('userId', async (req, res, next, userId) => {
  try {
    const user = await userServiceInstance.findUser({ where: { id: userId } });
    if (!user) {
      throw new ErrorHandler(404, 'User not found');
    }
    req.user = user;
    return next();
  } catch (err) {
    return next(err);
  }
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
router.put('/:userId', validators.updateUser(), async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ErrorHandler(400, errors.array());
    }

    const userId = req.user.id;
    const { body } = req.body;
    const updatedUser = await userServiceInstance.updateUser(body, userId);
    res.json(updatedUser);
  } catch (err) {
    return next(err);
  }
});


// @route  DELETE v1/users/:userId
// @desc   Delete a user by ID
// @access Private
router.delete('/:userId', async (req, res, next) => {
  try {
    const userId = req.user.id;
    await userServiceInstance.updateUser({ isDeleted: true }, userId);
    await userGroupsServiceInstance.deleteUserFromGroup(userId);
    res.status(204).end();
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
