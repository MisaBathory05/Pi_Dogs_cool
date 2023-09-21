const axios = require("axios");
const {Temperaments} =require("../utils/db");
require ("dotenv").config();
const {API_KEY, URL_BASE} = process.env;

const URL = `${URL_BASE}?api_key=${API_KEY}`;

const getAndSaveTemperaments = async () => {
    try {
      // Verificar si ya existen registros de temperamentos en la base de datos
      const existingTemperaments = await Temperaments.findAll();
      if (existingTemperaments.length > 0) {
        return existingTemperaments;
      }
  
      // Obtener los temperamentos de la API
      const response = await axios.get(URL);
      const temperamentsFromAPI = response.data;
  
      // Crear un conjunto para almacenar los nombres de los temperamentos sin duplicados
      const uniqueTemperamentsSet = new Set();
  
      // Filtrar y agregar los nombres de los temperamentos sin duplicados al conjunto
      temperamentsFromAPI.forEach((temperament) => {
        // Verificar si la propiedad 'temperament' existe y no es nula
        if (temperament.temperament) {
          const temperamentNames = temperament.temperament.split(", ");
          temperamentNames.forEach((name) => uniqueTemperamentsSet.add(name));
        }
      });
  
      // Convertir el conjunto de nombres de temperamentos a un array
      const uniqueTemperaments = Array.from(uniqueTemperamentsSet);
  
      // Crear los objetos para cada temperamento con el formato { nombre: "temperamento" }
      const temperamentsObjects = uniqueTemperaments.map((nombre) => ({ nombre }));
  
      // Guardar los temperamentos en la base de datos utilizando el modelo Temperaments
      await Temperaments.bulkCreate(temperamentsObjects);
  
      return temperamentsObjects;
    } catch (error) {
      throw new Error(error);
    }
  };
  
  module.exports = getAndSaveTemperaments;