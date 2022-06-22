const axios = require('axios');
const { Dog, Temperament} = require('../models/Dog');

async function getApiDogs () {
    const allDogs = await axios.get('https://api.thedogapi.com/v1/breeds/')
    const apiDogs = await allDogs.data.map(dog => {return {
        id: dog.id,
        name: dog.name,
        lifeSpan: dog.life_span,
        weight: dog.weight,
        height: dog.height,
        temperament: dog.temperament
    }})
    return apiDogs
}

async function getDbDogs () {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name']
        },
    })
}

async function getAllDogs () {
    const apiDogs = getApiDogs();
    const dbDogs = getDbDogs();
    const allInfo = apiDogs.concat(dbDogs);
    return allInfo
}

module.exports = {
    getAllDogs
}