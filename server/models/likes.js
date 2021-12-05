'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.likes.belongsTo(models.user, {
        foreignKey: 'userId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
      });
      models.likes.belongsTo(models.post, {
        foreignKey: 'postId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
      });
    }
    
  };
  likes.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'likes',
    modelName: 'likes',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'createAt',
    updatedAt: false
  });
  return likes;
};