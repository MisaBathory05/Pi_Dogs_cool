const axios = require("axios");
const { Dog, Temperaments } = require("../utils/db");
const {URL_BASE} = process.env;

const getDogById = async (id) => {
  try {
    // Consultar el perro en la API
    const { data: apiData } = await axios.get(`${URL_BASE}${id}`);

    // Intentemos obtener el perro de la base de datos local
    const dbDog = await Dog.findOne({
      where: { id },
      include: {
        model: Temperaments,
        attributes: ["nombre"],
        through: {
          attributes: [],
        },
      }, // Aquí utilizamos la relación entre Dog y Temperament
    });

    if (dbDog) {
      return dbDog.dataValues;
    } else if (apiData) {
      // Si el perro proviene de la API, lo devolvemos tal como lo hacíamos antes
      return apiData;
    } else {
      // Si no encontramos el perro ni en la API ni en la base de datos, lanzamos un error
      throw new Error("Perro no encontrado");
    }
  } catch (error) {
    throw new Error("Error al obtener los datos del perro");
  }
};

module.exports = getDogById;