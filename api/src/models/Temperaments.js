const sequelize = require("sequelize");
const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("temperaments",{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        nombre:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}