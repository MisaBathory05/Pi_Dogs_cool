import {
    CLEAN_DETAIL,
    GET_DOGS,
    GET_DOGS_DETAIL,
    FILTER_TEMPERAMENT,
    ORDER_NAME,
    ORDER_WEIGHT,
    FILTER_ORIGIN,
    GET_TEMPERAMENTS,
  } from "./actions";
  
  const initialState = {
    allDogs: [],
    originalDogs: [],
    dogDetail: [],
    temperaments: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_DOGS:
        return {
          ...state,
          originalDogs: action.payload,
          allDogs: action.payload,
        };
      case GET_DOGS_DETAIL:
        return {
          ...state,
          dogDetail: action.payload,
        };
      case CLEAN_DETAIL:
        return {
          ...state,
          dogDetail: {},
        };
      case GET_TEMPERAMENTS:
        return {
          ...state,
          temperaments: action.payload,
        };
      case FILTER_TEMPERAMENT:
        const allDogs = state.originalDogs;
        const filterDog =
          action.payload === "all"
            ? allDogs
            : allDogs.filter((dog) => dog.temperament?.includes(action.payload));
        return {
          ...state,
          allDogs: filterDog,
        };
      case ORDER_NAME:
        const sortedDogs = [...state.allDogs].sort((a, b) => {
          if (a.name < b.name) {
            return action.payload === "A" ? -1 : 1;
          }
          if (a.name > b.name) {
            return action.payload === "A" ? 1 : -1;
          }
          return 0;
        });
  
        return {
          ...state,
          allDogs: sortedDogs,
        };
      case ORDER_WEIGHT:
        const sortedDogsPeso = [...state.allDogs].sort((a, b) => {
          const weightA = parseInt(a.weight?.imperial?.split(" - ")[0]) || 0;
          const weightB = parseInt(b.weight?.imperial?.split(" - ")[0]) || 0;
  
          if (weightA < weightB) {
            return action.payload === "A" ? -1 : 1;
          }
          if (weightA > weightB) {
            return action.payload === "A" ? 1 : -1;
          }
          return 0;
        });
        return {
          ...state,
          allDogs: sortedDogsPeso,
        };
      case FILTER_ORIGIN:
        let filterCreation = null;
        if (action.payload === "all") {
          filterCreation = state.originalDogs;
        } else if (action.payload === "Database") {
          filterCreation = state.originalDogs.filter((dog) => dog.CreadoDatabase);
        } else if (action.payload === "api") {
          filterCreation = state.originalDogs.filter(
            (dog) => !dog.CreadoDatabase
          );
        }
        return {
          ...state,
          allDogs: filterCreation,
        };
      default:
        return { ...state };
    }
  };
  
  export default rootReducer;