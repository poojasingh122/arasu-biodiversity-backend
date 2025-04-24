import { DataTypes } from "sequelize";

export default (sequelize) => {
  const team = sequelize.define("Teams", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("founder","boa"),
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    visibility:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: true,
    }
  });
  return team;
};
