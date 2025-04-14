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
      allowNull: false,
    },
    member: {
      type: DataTypes.ENUM("CoreMember", "Member"),
      allowNull: false,
    },
    images:{
      type:DataTypes.JSON,
      allowNull:false,
    }
    
  });
  return team;
};
