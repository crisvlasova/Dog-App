import axios from 'axios';
export const GET_ALL_DOGS = 'GET_ALL_DOGS';
export const GET_ALL_TEMPERAMENTS = 'GET_ALL_TEMPERAMENTS';
export const GET_DOG_BY_ID = 'GET_DOG_BY_ID';
export const SEARCH_DOGS = 'SEARCH_DOGS';
export const SEARCH_TEMPERAMENTS ='SEARCH_TEMPERAMENTS';
export const ORDER_BY = 'ORDER_BY';
export const FILTERED_DOGS = 'FILTERED_DOGS';
export const GET_ALL_RACES = 'GET_ALL_RACES';
export const GET_DOGS_BY_RACE = 'GET_DOGS_BY_RACE';
export const GET_DOGS_LENGTH = 'GET_DOGS_LENGTH';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_INDEX_OF_LAST_DOG = 'SET_INDEX_OF_LAST_DOG';
export const SET_INDEX_OF_FIRST_DOG = 'SET_INDEX_OF_FIRST_DOG';
export const GET_DOGS_FROM_API_DB = 'GET_DOGS_FROM_API_DB'
export const GET_DB_DOGS = 'GET_DB_DOGS';
export const CLEAR_DETAILS = 'CLEAR_DETAILS';

export const getAllDogsBack = () => (dispatch) => {
    return axios.get('http://localhost:3001/dogs')
    .then(response => response.data)
    .then(data => {
        dispatch({type: GET_ALL_DOGS, payload: data})
    })
    .catch(err => console.log(err))
}

export const getAllTemperamentsBack = () => (dispatch) => {
    return axios.get('http://localhost:3001/temperaments')
    .then(response => response.data)
    .then(data => {dispatch({type: GET_ALL_TEMPERAMENTS, payload: data})
    })
    .catch(err => console.log(err))
}

export const searchTemps = (temp) => (dispatch) => {
    return axios.get('http://localhost:3001/temperaments')
    .then(response => response.data)
    .then(data => {
        const filterTemps = data.filter(t => t.toLowerCase().startsWith(temp));
        if (filterTemps.length) return dispatch({type: SEARCH_TEMPERAMENTS, payload: filterTemps});
    })
    .catch(err => console.log(err))
}

export const getDogById = (id) => (dispatch) => {
    return axios.get('http://localhost:3001/dogs')
    .then(response => response.data)
    .then(data => {
        let found = data.filter(dog => {
            if (Number(id)) return dog.id === Number(id)
            else return dog.id === id
        })
        found = found[0]
        found? dispatch({type: GET_DOG_BY_ID, payload: found}) :
        dispatch({type: GET_DOG_BY_ID, payload: 'no pudimos encontrar el perro con este id'})
    })
    .catch(err => console.log(err))
}

export const searchDogs = (name) => (dispatch) => {
    return axios.get(`http://localhost:3001/dogs?name=${name}`)
    .then(response => response.data? response.data : console.log('no existe el perro con este nombre'))
    .then(data => {
        typeof data === 'object'? dispatch({type: SEARCH_DOGS, payload: data}) :
        dispatch({type: SEARCH_DOGS, payload: 'no existe el perro con este nombre'})
    })
    .catch(err => console.log(err))
}

export const order = (e) => (dispatch) => {
    return axios.get('http://localhost:3001/dogs')
    .then(response => response.data)
    .then(data => {
        if (e === 'alfabet-AZ' || e === 'order-by'){
            let sorted = data.sort((a,b) => a.name.localeCompare(b.name));
            return sorted
        }
        else if (e === 'alfabet-ZA') {
            let sorted = data.sort((a,b) => b.name.localeCompare(a.name));
            return sorted
        }
        else if (e === 'weight-min-maj') {
            let sorted = data.sort((a,b) => a.weight.split(' - ')[0] - b.weight.split(' - ')[0]);
            return sorted
        } else if (e === 'weight-maj-min') {
            let sorted = data.sort((a,b) => b.weight.split(' - ')[0] - a.weight.split(' - ')[0]);
            return sorted
        }
        })
    .then(sorted => dispatch({type: ORDER_BY, payload: sorted}))
}

export const getDogsByTemp = (e) => (dispatch) => {
    return axios.get('http://localhost:3001/dogs')
    .then(response => response.data)
    .then(data => {
        let filteredDogs = data.filter(dog => dog.temperament);
        let filteredDogs2 = data.filter(dog => dog.Temperaments);
        return filteredDogs.concat(filteredDogs2)
    })
    .then(filteredDogs => {
        let string = ''
        let newDog = filteredDogs.map(dog => { return {
            id: dog.id,
            name: dog.name,
            breed_group: dog.breed_group,
            height: dog.height,
            weight: dog.weight,
            life_span: dog.life_span,
            image: dog.image,
            temperament: dog.temperament? dog.temperament.split(', ').join(', ') : dog.Temperaments.map(temp => string+=`${temp.name} `).pop()
        }});
        return newDog
    })
    .then(newDogs => {
        let filteredDogsByTemps = newDogs.filter(dog => dog.temperament.includes(e));
        return filteredDogsByTemps;
    })
    .then(finalDogs => dispatch({type: FILTERED_DOGS, payload: finalDogs}))
}

export const getAllRaces = () => (dispatch) => {
    return axios.get('http://localhost:3001/dogs')
    .then(response => response.data)
    .then(data => {
        let set = new Set()
        data.map(dog => {
            if (dog.breed_group) set.add(dog.breed_group);
            return [...set]
            })
            return [...set]
        })
    .then(races => dispatch({type: GET_ALL_RACES, payload: races}))
}

export const getDogsByRace = (race) => (dispatch) => {
    return axios.get('http://localhost:3001/dogs')
    .then(response => response.data)
    .then(data => {
        let filtered = data.filter(dog => dog.breed_group === race);
        return filtered
        })
    .then(filtered => dispatch({type: GET_DOGS_BY_RACE, payload: filtered}))
}

export const setCurrentPage = (index) => {
    return {type: SET_CURRENT_PAGE, payload: index}
}

export const setIndexOfLastDog = (currentPageNumber) => {
    return {type: SET_INDEX_OF_LAST_DOG , payload: currentPageNumber * 8}
}

export const setIndexOfFirstDog = (indexOfLastPost) => {
    return {type: SET_INDEX_OF_FIRST_DOG, payload: indexOfLastPost - 8}
}

export const getDogsApiDb = (targetValue) => (dispatch) => {
    return axios.get('http://localhost:3001/dogs')
    .then(response => response.data)
    .then(data => {
        if(targetValue === 'Todos los perros' || targetValue === 'Filtrar por Api/Db') return data;
        else if(targetValue === 'Api') {
            let filteredDogs = data.filter(dog => Number(dog.id));
            return filteredDogs
        }
        else if (targetValue === 'Db') {
            let filteredDogs = data.filter(dog => !Number(dog.id));
            return filteredDogs
        }
    })
    .then(filtered => dispatch({type: GET_DOGS_FROM_API_DB, payload: filtered}))
}

export const getDbDogs = () => (dispatch) => {
    return axios.get('http://localhost:3001/dogs')
    .then(response => response.data)
    .then(data => {
        let filteredDogs = data.filter(dog => !Number(dog.id))
        return filteredDogs
    })
    .then(filtered => dispatch({type: GET_DB_DOGS, payload: filtered}))
}

export const clearDetails = () => {
    return {type: CLEAR_DETAILS}
}