'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Petugas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Petugas.init({
    kode: { type: DataTypes.CHAR(10), primaryKey: true },
    nama: DataTypes.STRING,
    jabatan: DataTypes.STRING,
    tlpn: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Petugas',
  });
  return Petugas;
};
