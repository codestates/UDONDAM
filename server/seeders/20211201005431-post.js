'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('post', [
      {
        id: 1,
        content: '오늘 구급차 가던데 무슨 일인지 아는 새럼?',
        userId: 1,
        public: false,
        createAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      },
      {
        id: 2,
        content: '하 축구 기빨린다...',
        userId: 2,
        public: false,
        createAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      },
      {
        id: 3,
        content: '아 저 계속 지역인증 추가로 안 되는데 저만 그래요?',
        userId: 3,
        public: false,
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
    await queryInterface.bulkDelete('post', null, {});
  }
};
