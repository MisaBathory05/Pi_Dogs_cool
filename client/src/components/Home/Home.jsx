import styles from "./Home.module.css";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cards from "../Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import {
  filterTemperament,
  getDogs,
  orderName,
  orderWeight,
  filterOrigin,
  getTemperaments,
} from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar";

const getSavedPage = () => {
  const savedPage = localStorage.getItem("currentPage");
  return savedPage ? parseInt(savedPage) : 1;
};

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const [selectedTemperament, setSelectedTemperament] = useState("");// Default: Mostrar todos los perros
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [currentPage, setCurrentPage] = useState(getSavedPage());
  const cardsPerPage = 8;

  const dispatch = useDispatch();
  const temperamentsState = useSelector((state) => state.temperaments);
  const dogs = useSelector((state) => state.allDogs);

  temperamentsState.sort((a, b) => a.nombre.localeCompare(b.nombre));

  const handleFilterOrigin = (event) => {
    const selectedValue = event.target.value;
    dispatch(filterOrigin(selectedValue));
    setCurrentPage(1); // Reiniciar currentPage a 1 al aplicar un filtro
    localStorage.setItem("currentPage", "1");
  };

  useEffect(() => {
    const savedTemperament = localStorage.getItem("selectedTemperament");
    if (savedTemperament) {
      setSelectedTemperament(savedTemperament);
    }
    !dogs.length && dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch, dogs]);

  const savedOrigin = localStorage.getItem("selectedOrigin");
  if (savedOrigin) {
    setSelectedOrigin(savedOrigin);
  }

  useEffect(() => {
    const savedPage = getSavedPage();
    if (location.pathname === "/home" && savedPage !== currentPage) {
      setCurrentPage(savedPage);
    }
  }, [location.pathname, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem("currentPage", pageNumber.toString());
  };

  const handleFilter = (event) => {
    const selectedValue = event.target.value;

    // Reiniciar currentPage a 1 al aplicar un filtro
    setCurrentPage(1);
    localStorage.setItem("currentPage", "1");

    if (selectedValue === "all") {//si no hay filtro aparece todo "all"
      setSelectedTemperament("all");
    } else {// de lo contrario si hay un filtro seleccionado aparece la informacion teniendo en cuenta el reinicio
      setSelectedTemperament(selectedValue);
    }
  };

  const filteredDogs = dogs.filter((dog) => { //aqui crea un array que contiene solo los criterios del filtro
    return (
      dog.name.toLowerCase().includes(searchQuery.toLowerCase()) &&//permite buscar el nombre si se coloca en minuscula
      (selectedTemperament === "all" || (dog.temperament && dog.temperament.includes(selectedTemperament)))//si el temperamento no es igual a "all",verifica el filtro seleccionado
    );
  });
  

  const pageCount = Math.ceil(filteredDogs.length / cardsPerPage);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredDogs.slice(indexOfFirstCard, indexOfLastCard);

  const handleSearch = (value) => {
    setSearchQuery(value);
    setCurrentPage(1)
    localStorage.setItem("currentPage", "1");  
  };

  const handleOrderName = (event) => {
    const name = event.target.value;
    dispatch(orderName(name));
  };

  const handleOrderPeso = (event) => {
    const weight = event.target.value;
    dispatch(orderWeight(weight));
  };

  return (
    <div>
      <h1>DOGS APP</h1>
      <div className={styles.search}>
        <SearchBar onSearch={handleSearch} />
      </div>
      <select
        className={styles.select4}
        onChange={handleFilterOrigin}
        defaultValue=""
      >
        <option value="" disabled>
          Origin
        </option>
        <option value="all">Todos</option>
        <option value="api">API</option>
        <option value="Database">BDDL</option>
      </select>
      <select className={styles.select1} onChange={handleOrderName}>
        <option value="">Sort</option>
        <option value="A">A-Z</option>
        <option value="D">Z-A</option>
      </select>
      <select className={styles.select3} onChange={handleOrderPeso}>
        <option value="">Weight</option>
        <option value="A">Small</option>
        <option value="D">Large</option>
      </select>
      <select className={styles.select2} onChange={handleFilter}>
        <option key={0} value="all">
          Temperaments
        </option>
        {temperamentsState.length
          ? temperamentsState.map((t) => (
              <option key={t.id} value={t.nombre}>
                {t.nombre}
              </option>
            ))
          : null}
      </select>
      <div className={styles.pagination}>
        {Array.from({ length: pageCount }).map((_, index) => (
          <button
            key={index}
            className={`${styles.pageButton} ${
              currentPage === index + 1 ? styles.active : ""
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <div className={styles.navigationButtons}>
        <button
          className={styles.navigationButton}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          className={styles.navigationButton}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageCount}
        >
          Next
        </button>
      </div>
      <Cards combinedDogs={currentCards} selectedTemperament={selectedTemperament} />
    </div>
  );
};

export default Home;
