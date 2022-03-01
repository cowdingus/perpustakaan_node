'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pinjam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pinjam.init({
    no: { type: DataTypes.CHAR(10), primaryKey: true },
    kodeAnggota: DataTypes.CHAR(10),
    kodePetugas: DataTypes.CHAR(10),
    kodeBuku: DataTypes.CHAR(10),
    tglPinjam: DataTypes.DATE,
    tglBalik: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Pinjam',
  });
  return Pinjam;
};
