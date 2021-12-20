'use strict';
let post_tag = {
  1:['부산광역시','여행','질문'],
  2:['부산광역시','게임', '질문'],
  3:['대구광역시','운동', '질문'],
  4:['대구광역시','여행'],
  5:['부산광역시','게임','질문'],
  6:['부산광역시','운동','질문'],
  7:['대구광역시','','질문'],
  8:['대구광역시',''],
  9:['부산광역시','질문',],
  10:['부산광역시','질문',],
  11:['대구광역시',''],
  12:['대구광역시','']
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('post', [
      {
        id: 1,
        content: '여행지 추천 해 주세요!!!',
        userId: 1,
        public: false,
        createAt:new Date('2021-10-16T21:02:30.000Z')
      },
      {
        id: 2,
        content: '같이 게임할 분??',
        userId: 2,
        public: false,
        createAt:new Date('2021-10-17T21:05:31.000Z')
      },
      {
        id: 3,
        content: '3대 500치려면 얼마나 운동해야해요??',
        userId: 3,
        public: true,
        createAt:new Date('2021-10-18T21:06:32.000Z')
      },
      {
        id: 4,
        content: '가을에 제주도 오니 좋네요ㅎㅎ',
        userId: 4,
        public: true,
        createAt:new Date('2021-10-19T21:08:33.000Z')
      },
      {
        id: 5,
        content: '여러명이서 할 만한 게임 없나요?',
        userId: 1,
        public: false,
        createAt:new Date('2021-11-10T21:01:40.000Z')
      },
      {
        id: 6,
        content: '족구 할사람~',
        userId: 2,
        public: false,
        createAt:new Date('2021-11-13:04:33.000Z')
      },
      {
        id: 7,
        content: '저녁 추천 해주세요!',
        userId: 3,
        public: true,
        createAt:new Date('2021-11-16T21:05:33.000Z')
      },
      {
        id: 8,
        content: '재귀 함수 알려주실 분 있나요?',
        userId: 4,
        public: true,
        createAt:new Date('2021-11-30T21:08:33.000Z')
      },
      {
        id: 9,
        content: '날씨가 춥네요ㄷㄷ',
        userId: 1,
        public: true,
        createAt:new Date('2021-12-10T21:02:33.000Z')
      },
      {
        id: 10,
        content: '겨울 여행지 추천 해주세요~',
        userId: 2,
        public: true,
        createAt:new Date('2021-12-18T21:04:33.000Z')
      },
      {
        id: 11,
        content: '오늘 나가면 얼어죽어요;;',
        userId: 3,
        public: false,
        createAt:new Date('2021-12-18T21:08:33.000Z')
      },
      {
        id: 12,
        content: '드디어 취업 했습니다!!',
        userId: 4,
        public: false,
        createAt:new Date('2021-12-19T21:10:33.000Z')
      },
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
