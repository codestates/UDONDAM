'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tag', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      }
    })
    .then(() => {
      queryInterface.addColumn('post_tag', 'tagId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {model: 'tag', key:'id'}
      })
    });
  },
  down: async (queryInterface, Sequelize) => {
    let sql ='SET FOREIGN_KEY_CHECKS = 0';
    await queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.RAW,
    })
    await queryInterface.dropTable('tag');
  }
};