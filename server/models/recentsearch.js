'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recentsearch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.recentsearch.belongsTo(models.user, {
        foreignKey: 'userId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
      });
    }
  };
  recentsearch.init({
    userId: DataTypes.INTEGER,
    tag: DataTypes.STRING,
    nottag: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'recentsearch',
    freezeTableName: true,
    timestamps: true,
    createdAt: "createAt",
    updatedAt: false
  });
  return recentsearch;
};