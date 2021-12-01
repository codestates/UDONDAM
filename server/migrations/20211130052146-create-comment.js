'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
      commentId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      createAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      postId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: true,
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    let sql ='SET FOREIGN_KEY_CHECKS = 0';
    await queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.RAW,
      })
    await queryInterface.dropTable('comment');
  }
};