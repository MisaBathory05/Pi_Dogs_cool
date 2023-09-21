const axios = require("axios");
const {sequelize} =require("sequelize");
require ("dotenv").config();
const {URL_BASE} = process.env;

const {Dog}=require("../utils/db");
const db = require("../utils/db");

//traera la información de perros buscando por nombre
const getDogsByName = async (name) => {
  try {
    const response = await axios.get(`${URL_BASE}search?q=${name}`);
    const apiDogs = response.data;

    //si se encuentran las razas en la API, traera los datos

    if (apiDogs.length > 0){
        return apiDogs;
    } else {// en caso de que no se encuentren
        const dbDogs = await Dog.findAll({
            where: {
                nombre: {
                    [sequelize.Op.iLike]: `%${name}%`, //permite buscar registros en la bbdl de forma insensible (may - min) el nombre
                }
            }
        });

    //si se encuentran las razas en la BBDL, traera los datos de la BDD
    if (dbDogs.length > 0){
        return dbDogs;
    }else{ // si no se encuentran arrojan error
        throw new Error ("No se encuentraron razas de perros con el nombre especificado")
    }
}
  }catch (error){
    throw new Error ("Error al obtener las razas");
  }
};

module.exports = getDogsByName;
