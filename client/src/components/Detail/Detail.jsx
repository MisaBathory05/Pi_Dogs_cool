import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {cleanDetail, getDogsDetail} from "../../redux/actions";
import { useEffect } from "react";
import styles from "./Detail.module.css"


//Carga la info del detalle de acuerdo con el id
const Detail = () => {
    const dispatch = useDispatch(); //enviar acciones a la store de redux
    const params = useParams(); //obtener parametros de datos especificos de la ruta actual

    useEffect(() => { //envia la accion al dispatch
        dispatch(getDogsDetail(params.id));//

        //cuando el componente desmonte, limpia el estado
        return () => {
            dispatch(cleanDetail());
        };
    },[dispatch, params.id]);

    const {
        id, 
        name, 
        height, 
        weight, 
        life_span, 
        temperament,
        reference_image_id, 
        image, 
        imagen, 
        altura, 
        peso, 
        años_vida, 
        nombre, 
        temperaments,
    } = useSelector((state)=> state.dogDetail);

    //aqui la función obtiene la url de la imagen del perro
    const getImageUrl = () => {
        if(imagen){
            return imagen;
        }else if (reference_image_id){
            return `https://cdn2.thedogapi.com/images/${reference_image_id}.jpg`;
        }
        return null;
    };

    //funcion para obtener los temperamentos en texto
    const getTemperamentsText = () => {
        if(temperament){
            return temperament;
        }else if (temperament && temperament.length >0){
            return temperaments.map((temperament) => temperament.nombre).join(", ");
        }
        return "Sin información de temperamentos";
    };
    return (
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            {getImageUrl() && <img className={styles.img} src={getImageUrl()} alt="" />}
          </div>
          <div className={styles.dataContainer}>
            {id && <h1 className={styles.title}>ID: {id}</h1>}
            {nombre && <h1 className={styles.title}>Breed: {nombre}</h1>}
            {name && <h1 className={styles.title}>Breed: {name}</h1>}
            {altura && <h2 className={styles.info}>Height: {altura}</h2>}
            {height && <h2 className={styles.info}>Height: {height.imperial}</h2>}
            {peso && <h2 className={styles.info}>Weight: {peso} Kg</h2>}
            {weight && <h2 className={styles.info}>Weight: {weight.imperial} Kg</h2>}
            {años_vida && <h2 className={styles.info}>Life Time: {años_vida} years</h2>}
            {life_span && <h2 className={styles.info}>Life Time: {life_span}</h2>}
            <h2 className={styles.temperaments}>Temperaments: {getTemperamentsText()}</h2>
          </div>
        </div>
      );
      };
      
export default Detail;
