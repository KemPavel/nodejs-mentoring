export default class GroupService {
  constructor(groupModel) {
    this.groupModel = groupModel;
  }

  createGroup({ name, permissions }) {
    return this.groupModel.create({
      name,
      permissions
    });
  }

  findGroup(id) {
    const options = { where: { id } };
    return this.groupModel.findOne(options);
  }

  findAllGroups() {
    return this.groupModel.findAll();
  }

  updateGroup(groupInfo, id) {
    return this.groupModel.update(
      { ...groupInfo },
      {
        where: { id },
        returning: true,
        plain: true
      }
    );
  }
}
