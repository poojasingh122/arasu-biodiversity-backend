import { DataTypes } from "sequelize";

export default (sequelize) => {
  const blogs = sequelize.define("Blog", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    readTime: {
      type: DataTypes.ENUM("5min", "10min", "15min"),
      allowNull: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blogCategory: {
      type: DataTypes.STRING,
      allowNull: true,
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
  return blogs;
};
