"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Buku extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Buku.init(
    {
      kode: { type: DataTypes.CHAR(10), primaryKey: true },
      nama: DataTypes.STRING,
      pengarang: DataTypes.STRING,
      penerbit: DataTypes.STRING,
      stok: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Buku",
    }
  );
  return Buku;
};

