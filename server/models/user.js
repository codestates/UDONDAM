'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
          models.user.belongsToMany(models.post, {
        through: 'comment',
        sourceKey: 'id',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        //onUpdate: 'CASCADE'
      });
      models.user.belongsToMany(models.post, {
        through: 'like',
        sourceKey: 'id',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        //onUpdate: 'CASCADE'
      });
      models.user.hasMany(models.post, {
        foreignKey: 'userId',
        sourceKey: 'id',
        //onUpdate: 'cascade',
        onDelete: 'CASCADE'
      });
    }
  };
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nickname: DataTypes.STRING,
    socialType: DataTypes.STRING,
    manager: DataTypes.BOOLEAN,
    area: DataTypes.STRING,
    area2: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    freezeTableName: true,
    timestamps: true,
    createdAt: "createAt",
    updatedAt: "updateAt"
  });
  return user;
};