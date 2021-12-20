'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('post_tag', [
      {
        id: 1,
        postId: 1,
        tagId: 2
      },
      {
        id: 2,
        postId: 1,
        tagId: 162
      },
      {
        id: 3,
        postId: 1,
        tagId: 190
      },
      {
        id: 4,
        postId: 2,
        tagId: 2
      },
      {
        id: 5,
        postId: 2,
        tagId: 163
      },
      {
        id: 6,
        postId: 2,
        tagId: 190
      },
      {
        id: 7,
        postId: 3,
        tagId: 3
      },
      {
        id: 8,
        postId: 3,
        tagId: 171
      },
      {
        id: 9,
        postId: 3,
        tagId: 190
      },
      {
        id: 10,
        postId: 4,
        tagId: 3
      },
      {
        id: 11,
        postId: 4,
        tagId: 162
      },
      {
        id: 12,
        postId: 5,
        tagId: 2
      },
      {
        id: 13,
        postId: 5,
        tagId: 163
      },
      {
        id: 14,
        postId: 5,
        tagId: 190
      },
      {
        id: 15,
        postId: 6,
        tagId: 2
      },
      {
        id: 16,
        postId: 6,
        tagId: 171
      },
      {
        id: 17,
        postId: 6,
        tagId: 190
      },
      {
        id: 18,
        postId: 7,
        tagId: 3
      },
      {
        id: 19,
        postId: 7,
        tagId: 190
      },
      {
        id: 20,
        postId: 8,
        tagId: 3
      },
      {
        id: 21,
        postId: 8,
        tagId: 190
      },
      {
        id: 22,
        postId: 9,
        tagId: 2
      },
      {
        id: 23,
        postId: 10,
        tagId: 2
      },
      {
        id: 24,
        postId: 10,
        tagId: 162
      },
      {
        id: 25,
        postId: 10,
        tagId: 190
      },
      {
        id: 26,
        postId: 11,
        tagId: 3
      },
      {
        id: 27,
        postId: 12,
        tagId: 3
      },
      {
        id: 28,
        postId: 12,
        tagId: 167
      },
      {
        id: 29,
        postId: 8,
        tagId: 227
      },
      ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('post_tag', null, {});
  }
};
