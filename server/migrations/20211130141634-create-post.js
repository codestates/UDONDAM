'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('post', {
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
      public: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      createAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => {
      queryInterface.addColumn('post', 'userId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {model: 'user', key:'id'}
      })
    })
    .then(() => {
      queryInterface.addColumn('post_tag', 'postId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'CASCADE',
        references: {model: 'post', key:'id'}
      })
    })
    .then(() => {
      queryInterface.addColumn('comment', 'postId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'CASCADE',
        references: {model: 'post', key:'id'}
      })
    })
    .then(() => {
      queryInterface.addColumn('like', 'postId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: 'CASCADE',
        references: {model: 'post', key:'id'}
      })
    });
  },
  down: async (queryInterface, Sequelize) => {
    let sql ='SET FOREIGN_KEY_CHECKS = 0';
    await queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.RAW,
    })
    await queryInterface.dropTable('post');
  }
};