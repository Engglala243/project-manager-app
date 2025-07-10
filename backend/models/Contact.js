const { DataTypes } = require("sequelize")
const { v4: uuidv4 } = require("uuid")
const sequelize = require("../config/database")

const Contact = sequelize.define(
  "Contact",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 255],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [10, 15],
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100],
      },
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
    updated_by: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    tableName: "contacts",
    indexes: [
      {
        fields: ["email"],
      },
      {
        fields: ["is_active", "is_deleted"],
      },
    ],
  },
)

module.exports = Contact
