const axios = require("axios");
const { Dog, Temperaments } =require("../utils/db");
require ("dotenv").config();
const {API_KEY, URL_BASE} = process.env;

const Url = `${URL_BASE}?api_key=${API_KEY}`;

const getDogs = async () => {
    try { 
        //Traer los datos de la api externa
        const {data: apiData} = await axios.get(Url);
        //Traer los datos de la bdd local con los temperamentos asociados
        const dbData = await Dog.findAll({
        include: {
            model: Temperaments,
            attributes: ["nombre"],
            through: {
                attributes: [],
            }
        }
    });
    //combina los datos de la api con los datos de bbd local
    const combinedData = [...apiData];

    //agrega los perros de la bddl si existen
    if(dbData.length > 0) {
        dbData.forEach((dbDog) => {
         const existingDog = combinedData.find (
            (dog) => dog.name === dbDog);
            
            //aqui crea un nuevo perro en caso de que no se encuentre con el mismo nombre
            if (!existingDog){
                const temperamentsNames = dbDog.temperaments.map(
                    (temperament) => temperament.nombre
                );
                //agrega la información al array combinedData
                combinedData.push({
                    id: dbDog.id,
                    name: dbDog.nombre,
                    height: dbDog.altura,
                    weight: dbDog.peso,
                    life_span: dbDog.años_vida,
                    image: dbDog.imagen,
                    temperament: temperamentsNames.join(", "),
                    CreadoDatabase: dbDog.CreadoDatabase
                });
            }
        });
    }

    return combinedData;
} catch (error) {
    throw new Error("Error al obtener los perros")
}
};

module.exports = getDogs;