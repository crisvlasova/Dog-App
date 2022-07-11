import { GET_ALL_DOGS, GET_ALL_TEMPERAMENTS, GET_DOG_BY_ID, SEARCH_DOGS,  CLEAR_DETAILS,
          SEARCH_TEMPERAMENTS, ORDER_BY, FILTERED_DOGS, GET_ALL_RACES, GET_DOGS_BY_RACE,
          GET_DOGS_LENGTH,SET_INDEX_OF_LAST_DOG,SET_INDEX_OF_FIRST_DOG, SET_CURRENT_PAGE,
          GET_DOGS_FROM_API_DB, GET_DB_DOGS } from "../Actions/Actions";

const initialState = {
    allDogs: [],
    dogDetails: {},
    temperaments: [],
    searchedDogs: [],
    searchedTemps:[],
    races: [],
    dbDogs: [],
    currentPage: 1,
    postPerPage: 8,
    indexOfLastDog: 8,
    indexOfFirstDog: 0,
};

const rootReducer = (state=initialState, action) => {
  switch(action.type) {
      case GET_ALL_DOGS:
        return {
          ...state,
          allDogs: action.payload
        };
      case GET_ALL_TEMPERAMENTS:
        return {
          ...state,
          temperaments: action.payload
        };
      case GET_DOG_BY_ID:
        return {
          ...state,
          dogDetails: action.payload
        };
      case SEARCH_DOGS:
        return {
          ...state,
          searchedDogs: action.payload
        };
      case SEARCH_TEMPERAMENTS: 
        return {
        ...state,
          searchedTemps: action.payload
      };
      case CLEAR_DETAILS:
        return {
          ...state,
          dogDetails: {}
        };
      case ORDER_BY:
        return {
          ...state,
          allDogs: action.payload
        };
      case FILTERED_DOGS:
        return {
          ...state,
          allDogs: action.payload
        };
      case GET_ALL_RACES:
        return {
          ...state,
          races: action.payload
        };
      case GET_DOGS_BY_RACE:
        return {
          ...state,
          allDogs: action.payload
        };
      case GET_DOGS_LENGTH:
        return {
          ...state,
          dogsLength: action.payload
        };
      case SET_CURRENT_PAGE:
        return {
          ...state,
          currentPage: action.payload
        };
      case SET_INDEX_OF_LAST_DOG:
        return {
          ...state,
          indexOfLastDog: action.payload
        };
      case SET_INDEX_OF_FIRST_DOG:
        return {
          ...state,
          indexOfFirstDog: action.payload
        };
      case GET_DOGS_FROM_API_DB:
        return {
          ...state,
          allDogs: action.payload
        };
      case GET_DB_DOGS:
        return {
          ...state,
          dbDogs: action.payload
        };
      default: return {...state}
    }
};

export default rootReducer;