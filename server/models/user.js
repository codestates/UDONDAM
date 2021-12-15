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
      models.user.hasMany(models.post, {
        foreignKey: 'userId',
        sourceKey: 'id',
        onDelete: 'CASCADE'
      });
      models.user.hasMany(models.comment, {
        foreignKey: 'userId',
        sourceKey: 'id',
        onDelete: 'CASCADE'
      });
      models.user.hasMany(models.likes, {
        foreignKey: 'userId',
        sourceKey: 'id',
        onDelete: 'CASCADE'
      });
      models.user.hasMany(models.recentsearch, {
        foreignKey: 'userId',
        sourceKey: 'id',
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