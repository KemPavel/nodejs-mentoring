import models from '../models';
// Нормально ли тянуть модели в сервисы для того что бы использовать transaction?
// Может есть способ как можно использовать transaction иначе?


export default class UserGroupsService {
  constructor(userGroupsModel, groupModel) {
    this.userGroupsModel = userGroupsModel;
    this.groupModel = groupModel;
  }

  async addUsersToGroup(groupId, userIds) {
    const t = await models.sequelize.transaction();
    try {
      const group = await this.groupModel.findOne({ where: { id: groupId } }, { transaction: t });
      for (const id of userIds) {
        await this.userGroupsModel.findOrCreate({ where: { userId: id, groupId: group.id }, transaction: t });
      }
      await t.commit();
    } catch (error) {
      console.error('error: ', error);
      await t.rollback();
    }
  }

  async deleteUserFromGroup(userId) {
    await this.userGroupsModel.destroy({ where: { userId } });
  }

  async deleteGroupFromTable(groupId) {
    await this.userGroupsModel.destroy({ where: { groupId } });
  }
}
