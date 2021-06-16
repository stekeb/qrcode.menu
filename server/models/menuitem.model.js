const { DataTypes, Model } = require("sequelize");
const sequelize = require("./index");
const User = require("./user.model");

class Menuitem extends Model {}

Menuitem.init(
  {
    sortNo: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: null,
    },
    toBeTranslated: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    className: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    en: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    de: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    fr: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    es: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    it: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "Menuitem",
  }
);

User.hasMany(Menuitem);
Menuitem.belongsTo(User);

module.exports = Menuitem;
