const axios = require('axios');
const { Dog, Temperament } = require('../db');

async function getApiDogs () {
    const allDogs = await axios.get('https://api.thedogapi.com/v1/breeds/')
    const apiDogs = await allDogs.data.map(dog => {
        return {
        id: dog.id,
        name: dog.name,
        breed_group: dog.breed_group,
        life_span: dog.life_span,
        weight: dog.weight.metric,
        height: dog.height.metric,
        temperament: dog.temperament,
        image: dog.image.url,
    }})
    return apiDogs
}

async function getDbDogs () {
    return await Dog.findAll({
        include: Temperament
    })
}

async function getAllDogs () {
    const apiDogs = await getApiDogs();
    const dbDogs = await getDbDogs();
    const allInfo = [...apiDogs,...dbDogs];
    return allInfo
}

module.exports = {
    getAllDogs
}