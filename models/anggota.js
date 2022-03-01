"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Anggota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Anggota.init(
    {
      kode: { type: DataTypes.CHAR(10), primaryKey: true },
      nama: DataTypes.STRING,
      alamat: DataTypes.STRING,
      tlpn: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Anggota",
    }
  );
  return Anggota;
};

