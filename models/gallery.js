import { DataTypes } from "sequelize";
export default (sequelize) => {
  const gallery = sequelize.define("Gallery", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
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
  return gallery;
};
