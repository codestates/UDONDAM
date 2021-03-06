'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: true,
        type: Sequelize.STRING
      },
      nickname: {
        allowNull: false,
        defaultValue: "익명",
        type: Sequelize.STRING
      },
      socialType: {
        allowNull: false,
        defaultValue: "basic",
        type: Sequelize.STRING
      },
      manager: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      area: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: '인증해주세요'
      },
      area2: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: '인증해주세요'
      },
      createAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updateAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    let sql ='SET FOREIGN_KEY_CHECKS = 0';
    await queryInterface.sequelize.query(sql, {
        type: Sequelize.QueryTypes.RAW,
      })
    await queryInterface.dropTable('user');
  }
};