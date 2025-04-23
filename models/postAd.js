import { DataTypes } from "sequelize";
export default (sequelize) => {
  const postAd = sequelize.define("PostAd", {
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
    video:{
      type:DataTypes.JSON,
      allowNull:true,
    },
    date:{
      type:DataTypes.DATEONLY,
      allowNull:true,
    },
    visibility:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: true,
    },
    status:{
      type:DataTypes.ENUM("ongoing","completed"),
      allowNull:false,
    }
  });
  return postAd;
};
