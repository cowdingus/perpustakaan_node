'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pinjam', {
      no: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(10)
      },
      kodeAnggota: {
        allowNull: false,
        type: Sequelize.CHAR(10),
      },
      kodePetugas: {
        allowNull: false,
        type: Sequelize.CHAR(10)
      },
      kodeBuku: {
        allowNull: false,
        type: Sequelize.CHAR(10)
      },
      tglPinjam: {
        allowNull: false,
        type: Sequelize.DATE
      },
      tglBalik: {
        allowNull: false,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Pinjam');
  }
};
