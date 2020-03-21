import { Router } from 'express';
import { Group, UserGroups } from '../../../models';
import { GroupService, UserGroupsService, ErrorHandler } from '../../../services';

const router = Router();
const groupServiceInstance = new GroupService(Group);
const userGroupsServiceInstance = new UserGroupsService(UserGroups, Group);

// @route  GET v1/groups
// @desc   Get a list of all groups
// @access Public
router.get('/', async (req, res, next) => {
  try {
    const groups = await groupServiceInstance.findAllGroups();
    res.json(groups);
  } catch (err) {
    return next(err);
  }
});


// @route  POST v1/group
// @desc   Create a group
// @access Public
router.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const group = await groupServiceInstance.createGroup(body);
    res.json(group);
  } catch (err) {
    return next(err);
  }
});


// Put the group to req.group if exists
router.param('groupId', async (req, res, next, groupId) => {
  try {
    const group = await groupServiceInstance.findGroup(groupId);

    if (!group) {
      throw new ErrorHandler(404, 'Group not found');
    }
    req.group = group;
    return next();
  } catch (err) {
    return next(err);
  }
});


// @route GET v1/groups/:groupId
// @desc Get a group by ID
// @access Public
router.get('/:groupId', (req, res) => {
  res.json(req.group);
});


// @route PUT v1/groups/:groupId
// @desc Update group
// @access Public
router.put('/:groupId', async (req, res, next) => {
  try {
    const { body } = req;
    const group = await groupServiceInstance.updateGroup(body, req.group.id);
    res.json(group);
  } catch (err) {
    return next(err);
  }
});


// @route DELETE v1/groups/:groupId
// @desc Delete group
// @access Public
router.delete('/:groupId', async (req, res, next) => {
  try {
    await userGroupsServiceInstance.deleteGroupFromTable(req.group.id);
    await req.group.destroy();
    res.status(204).end();
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
