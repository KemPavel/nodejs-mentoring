import { Router } from 'express';
import { Groups } from '../../../models';
import { GroupService } from '../../../services';

const router = Router();
const groupServiceInstance = new GroupService(Groups);

// @route  GET v1/groups
// @desc   Get a list of all groups
// @access Public
router.get('/', async (req, res) => {
  const groups = await groupServiceInstance.findAllGroups();
  res.json(groups);
});


// @route  POST v1/group
// @desc   Create a group
// @access Public
router.post('/', async (req, res) => {
  const { body } = req;
  const group = await groupServiceInstance.createGroup(body);
  res.json(group);
});


// Put the group to req.group if exists
router.param('groupId', async (req, res, next, groupId) => {
  const group = await groupServiceInstance.findGroup(groupId);

  if (!group) {
    return res.status(404).json({ msg: 'Group not found' });
  }
  req.group = group;
  next();
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
router.put('/:groupId', async (req, res) => {
  const { body } = req;
  const group = await groupServiceInstance.updateGroup(body, req.group.id);
  res.json(group);
});


// @route DELETE v1/groups/:groupId
// @desc Delete group
// @access Public
router.delete('/:groupId', async (req, res) => {
  await req.group.destroy();
  res.status(204).end();
});


module.exports = router;
