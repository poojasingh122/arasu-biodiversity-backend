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
<<<<<<< Updated upstream
      type: DataTypes.ENUM("founder","boa"),
=======
      type: DataTypes.ENUM("founder", "bao"),
>>>>>>> Stashed changes
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: false,
    },
<<<<<<< Updated upstream
    visibility:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: true,
    }
=======
>>>>>>> Stashed changes
  });
  return team;
};
