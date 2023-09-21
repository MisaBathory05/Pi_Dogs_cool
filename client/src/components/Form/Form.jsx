import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Form.module.css";
import { getTemperaments } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Form = () => {
  const [isFormValid, setIsFormValid] = useState(false);// se inicia con el valor falso y luego con el set se actualiza el estado
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  let temperamentosState = useSelector((state) => state.temperaments);

  // Ordenar los temperamentos alfabéticamente
  temperamentosState.sort((a, b) => a.nombre.localeCompare(b.nombre));

  const [formData, setFormData] = useState({
    nombre: "",
    alturaMinima: "",
    alturaMaxima: "",
    pesoMinimo: "",
    pesoMaximo: "",
    años_vida: "",
    temperamentos: [],
    imagen: "",
  });

  const handleChange = (event) => {// manejo de cambios  en el ingreso de la información
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUrlChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTemperamentosChange = (event) => {
    const { name, value, checked } = event.target;
    if (checked) {
      // Si el checkbox fue marcado, agregamos el temperamento a la lista
      setFormData((prevFormData) => ({
        ...prevFormData,// crea una copia superficial del estado anterior
        [name]: [...prevFormData[name], value], //se usa el operador de propagacion (...) para copiar valores anteriores y agregar value al final del array
      }));
    } else {
      // Si el checkbox fue desmarcado, eliminamos el temperamento de la lista (event.target es false)
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: prevFormData[name].filter(
          (temperamento) => temperamento !== value
        ),
      }));
    }
  };
  //establece si hay errores en el diligenciamiento del formulario
  const [formErrors, setFormErrors] = useState({ 
    nombre: "",
    alturaMinima: "",
    alturaMaxima: "",
    pesoMinimo: "",
    pesoMaximo: "",
    años_vida: "",
  });

  const validateForm = () => {
    const errors = {};

    // Validar que el nombre no contenga números
    if (formData.nombre.match(/\d/)) {
      errors.nombre = "El nombre no puede contener números";
    }

    // Validar que el peso mínimo no sea mayor al máximo
    if (formData.pesoMinimo >= formData.pesoMaximo) {
      errors.peso = "The minimum weight must be less than the maximum weight";
    }

    // Validar que la altura mínima no sea mayor a la máxima
    if (formData.alturaMinima >= formData.alturaMaxima) {
      errors.altura = "The minimum height must be less than the maximum height";
    }

    if (Object.keys(errors).length > 0) {
      setIsFormValid(false);
      setFormErrors(errors);
      return false;
    }

    // Si no hay errores, actualizamos el estado del formulario a válido
    setIsFormValid(Object.keys(errors).length === 0);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleBlur = () => {
    validateForm();
  };
// el handle evita el comportamiento de la recarga de la página
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      try {
        const temperamentosIds = formData.temperamentos.map((nombre) => {
          const temperamento = temperamentosState.find(
            (temp) => temp.nombre === nombre
          );
          return temperamento.id;
        });
        // Enviar los datos del formulario al servidor, incluyendo los ID de los temperamentos
        await axios.post("http://localhost:3001/dogs", {// se envia datos al servidor
          nombre: formData.nombre,
          altura: `${formData.alturaMinima} - ${formData.alturaMaxima}`,
          peso: `${formData.pesoMinimo} - ${formData.pesoMaximo}`,
          años_vida: formData.años_vida,
          temperaments: temperamentosIds,
          imagen: formData.imagen,
        });

        // Luego de enviar los datos, puede resetear el formulario
        setFormData({
          nombre: "",
          alturaMinima: "",
          alturaMaxima: "",
          pesoMinimo: "",
          pesoMaximo: "",
          años_vida: "",
          temperamentos: [],
          imagen: "",
        });

        alert("Dog created successfully");
      } catch (error) {
        alert(
          "Error creating new dog . Please try again"
        );
      }
    } else {
      // Si hay errores en el formulario, los muestra
      setFormErrors({
        nombre: formErrors.nombre || "",
        alturaMinima: formErrors.altura || "",
        alturaMaxima: formErrors.altura || "",
        pesoMinimo: formErrors.peso || "",
        pesoMaximo: formErrors.peso || "",
        años_vida: formErrors.años_vida || "",
      });
    }
  };

  return (
    <div className={styles.formDiv}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Breed Name:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
        </label>
        <div className={styles.errorMessage}>
          {formErrors.nombre && <p>{formErrors.nombre}</p>}
        </div>
        <div className={styles.altura}>
          <label>
            Min Height:
            <input
              type="number"
              name="alturaMinima"
              value={formData.alturaMinima}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </label>
          <label>
            Max Height:
            <input
              type="number"
              name="alturaMaxima"
              value={formData.alturaMaxima}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </label>
        </div>
        <div className={styles.errorMessage}>
          {formErrors.altura && <p>{formErrors.altura}</p>}
        </div>
        <div className={styles.peso}>
          <label>
            Min Weight:
            <input
              type="number"
              name="pesoMinimo"
              value={formData.pesoMinimo}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </label>
          <label>
            Max Weight:
            <input
              type="number"
              name="pesoMaximo"
              value={formData.pesoMaximo}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </label>
        </div>
        <div className={styles.errorMessage}>
          {formErrors.peso && <p>{formErrors.peso}</p>}
        </div>
        <label>
          Life Time:
          <input
            type="text"
            name="años_vida"
            value={formData.años_vida}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Images's Url:
          <input
            type="text"
            name="imagen"
            value={formData.imagen}
            onChange={handleImageUrlChange}
            required
          />
        </label>
        <label>
          Temperaments (choose one o more):
          <div className={styles.temperamentosContainer}>
            {Array.isArray(temperamentosState) &&
              temperamentosState.map((temperamento) => (
                <div key={temperamento.id}>
                  <input
                    type="checkbox"
                    name="temperamentos"
                    value={temperamento.nombre}
                    checked={formData.temperamentos.includes(
                      temperamento.nombre
                    )}
                    onChange={handleTemperamentosChange}
                  />
                  {temperamento.nombre}
                </div>
              ))}
          </div>
        </label>
          <label>Selected Temperaments:</label>
        <div className={styles.box}>
          {formData.temperamentos.map((temperamento) => (
            <span key={temperamento} className={styles.item}>
              {temperamento}
            </span>
          ))}
        </div>
        <button type="submit" className={styles.button} disabled={!isFormValid}>
          Create New Dog
        </button>
      </form>
    </div>
  );
};

export default Form;