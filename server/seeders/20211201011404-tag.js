'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tag', [
      {
        id: 1,
        content: '서울'
      },
      {
        id: 2,
        content: '대전'
      },
      {
        id: 3,
        content: '강원도'
      },
      {
        id: 4,
        content: '경기도 화성시'
      },
      {
        id: 5,
        content: '스포츠'
      },
      {
        id: 6,
        content: '잡담'
      },
      {
        id: 7,
        content: '알림'
      },
      {
        id: 8,
        content: '질문'
      },
      {
        id: 9,
        content: '반려동물'
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
    await queryInterface.bulkDelete('tag', null, {});
  }
};
