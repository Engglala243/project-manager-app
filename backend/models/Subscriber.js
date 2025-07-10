const { DataTypes } = require("sequelize")
const { v4: uuidv4 } = require("uuid")
const sequelize = require("../config/database")

const Subscriber = sequelize.define(
  "Subscriber",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
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
    tableName: "subscribers",
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
      {
        fields: ["is_active", "is_deleted"],
      },
    ],
  },
)

module.exports = Subscriber
