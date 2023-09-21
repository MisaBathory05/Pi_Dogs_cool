const {Dog} = require("../utils/db");

const createDog = async (nombre, altura, peso, años_vida, temperaments, imagen) => {
    try {
      // Crear la raza de perro en la base de datos
      const newDog = await Dog.create({
        nombre,
        altura,
        peso,
        años_vida,
        temperaments,
        imagen,
      });
  
      newDog.addTemperaments(temperaments);
      return newDog;
    } catch (error) {
      throw new Error("Error al crear el perro");
    }
  };
  
  module.exports = createDog;