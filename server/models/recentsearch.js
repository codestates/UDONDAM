'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recentSearch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.recentSerch.belongsTo(models.user, {
        foreignKey: 'userId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
      });
    }
  };
  recentSearch.init({
    userId: DataTypes.INTEGER,
    tag: DataTypes.STRING,
    nottag: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'recentSearch',
  });
  return recentSearch;
};