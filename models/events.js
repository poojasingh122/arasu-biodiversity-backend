import { DataTypes } from "sequelize";

export default (sequelize) => {
  const events = sequelize.define("Events", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    occassion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    eventTime: {
      type: DataTypes.TIME,
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
  return events;
};
