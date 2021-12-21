'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('likes', [
      {
        id: 1,
        userId: 1,
        postId: 1,
        createAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      },
      {
        id: 2,
        userId: 1,
        postId: 2,
        createAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      },
      {
        id: 3,
        userId: 2,
        postId: 2,
        createAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      },
      {
        id: 4,
        userId: 3,
        postId: 2,
        createAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      },
      {
        id: 5,
        userId: 4,
        postId: 2,
        createAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      }
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('likes', null, {});
  }
};
