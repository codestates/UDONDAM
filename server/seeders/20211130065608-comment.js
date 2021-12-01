'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('comment', [
      {
        id: 1,
        content: '안녕하세여' ,
        userId: 2,
        postId: 1,
        commentId: null,
        createAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      },
      {
        id: 2,
        content: '멋있네요' ,
        userId: 3,
        postId: 1,
        commentId: null,
        createAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      },
      {
        id: 3,
        content: '넵 반갑습니다' ,
        userId: 1,
        postId: 1,
        commentId: 1,
        createAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      },
      {
        id: 4,
        content: '감사합니다' ,
        userId: 1,
        postId: 1,
        commentId: 2,
        createAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      },
      {
        id: 5,
        content: '어디사세요?' ,
        userId: 2,
        postId: 1,
        commentId: 1,
        createAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      },
      {
        id: 6,
        content: '집이요~' ,
        userId: 1,
        postId: 1,
        commentId: 1,
        createAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      },
      {
        id: 7,
        content: '코딩 좋아해요' ,
        userId: 2,
        postId: 2,
        commentId: null,
        createAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      },
      {
        id: 8,
        content: '저두요' ,
        userId: 3,
        postId: 2,
        commentId: 7,
        createAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      }
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('comment', null, {});
  }
};
