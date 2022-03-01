'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Buku', {
      kode: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.CHAR(10)
      },
      nama: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pengarang: {
        allowNull: false,
        type: Sequelize.STRING
      },
      penerbit: {
        allowNull: false,
        type: Sequelize.STRING
      },
      stok: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Buku');
  }
};
