'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post_tag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  post_tag.init({
    postId: DataTypes.INTEGER,
    tagId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'post_tag',
    freezeTableName: true,
    timestamps:false
  });
  return post_tag;
};