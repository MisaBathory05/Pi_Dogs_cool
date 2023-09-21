const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("dog", {
    // id:{
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4,
    //   allowNull: false,
    //   primaryKey: true
    // },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true,
    },
    imagen: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altura: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    peso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    años_vida: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CreadoDatabase: { //si el perro fue creado, si no lo fue es false
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};