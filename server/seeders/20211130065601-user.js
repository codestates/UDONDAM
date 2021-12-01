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
      area:null,
      area2:null,
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
      area: 'seoul',
      area2: 'incheon',
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
      area: 'daejeon',
      area2: 'dea-gu',
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
      area: 'daejeon',
      area2: 'dea-gu',
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
