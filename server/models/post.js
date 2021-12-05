'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.post.belongsTo(models.user, {
        foreignKey: 'userId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
      });
      models.post.hasMany(models.comment, {
        foreignKey: 'postId',
        sourceKey: 'id',
        //onUpdate: 'cascade',
        onDelete: 'CASCADE'
      });
      models.post.hasMany(models.likes, {
        foreignKey: 'postId',
        sourceKey: 'id',
        //onUpdate: 'cascade',
        onDelete: 'CASCADE'
      });
      // models.post.belongsToMany(models.user,{
      //   through: 'likes',
      //   foreignKey: 'postId',
      //   sourceKey: 'id',
      //   onDelete: 'CASCADE'
      // });
      // models.post.belongsToMany(models.user,{
      //   through: 'comment',
      //   foreignKey: 'postId',
      //   sourceKey: 'id',
      //   onDelete: 'CASCADE'
      // });
      models.post.belongsToMany(models.tag, {
        through: 'post_tag',
        sourceKey: 'id',
        foreignKey: 'postId',
        onDelete: 'CASCADE'
      });
    }
  };
  post.init({
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    public: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'post',
    timestamps: true,
    freezeTableName: true,
    createdAt: 'createAt',
    updatedAt: false
    
  });
  return post;
};