'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  };
  comment.init({
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comment',
    freezeTableName: true,
    timestamps: true,
    createdAt: "createAt",
    updatedAt: false
  });
  return comment;
};