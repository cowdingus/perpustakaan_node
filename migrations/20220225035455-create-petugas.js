'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Petugas', {
      kode: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(10)
      },
      nama: {
        allowNull: false,
        type: Sequelize.STRING
      },
      jabatan: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tlpn: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Petugas');
  }
};
