const { DataTypes } = require("sequelize")
const { v4: uuidv4 } = require("uuid")
const sequelize = require("../config/database")

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 255],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "system",
    },
    updated_by: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "system",
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
    tableName: "projects",
    indexes: [
      {
        fields: ["is_active", "is_deleted"],
      },
    ],
  },
)

module.exports = Project
