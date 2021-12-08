'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user', [
    {
      id: 1,
      email: 'aaa' ,
      nickname: '익명',
      password: 'bbb',
      socialType: 'basic',
      area: '인증해주세요',
      area2: '인증해주세요',
      manager: false,
      createAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      updateAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    },
    {
      id: 2,
      email: 'aaa@naver.com' ,
      nickname: '익명',
      password: 'bbb',
      socialType: 'basic',
      area: '서울시',
      area2: '인천시',
      manager: false,
      createAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      updateAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    },
    {
      id: 3,
      email: 'aaa@google.com' ,
      nickname: '익명',
      password:null,
      socialType: 'google',
      area: '대전시',
      area2: '대구시',
      manager: false,
      createAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      updateAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    },
    {
      id: 4,
      email: 'aaa@google.com' ,
      nickname: '익명',
      password:null,
      socialType: 'basic',
      area: '세종시',
      area2: '천안시',
      manager: true,
      createAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      updateAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {});
  }
};
