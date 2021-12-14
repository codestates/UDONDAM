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
      area: '서울특별시',
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
      area: '서울특별시',
      area2: '대전광역시',
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
      area: '대전광역시',
      area2: '대구광역시',
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
      area: '세종특별차치시',
      area2: '수원시',
      manager: true,
      createAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      updateAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    },
    {
      id: 5,
      email: 'guest' ,
      nickname: 'guest',
      password: 'guest',
      socialType: 'basic',
      area: '인증해주세요',
      area2: '인증해주세요',
      manager: false,
      createAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      updateAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {});
  }
};
