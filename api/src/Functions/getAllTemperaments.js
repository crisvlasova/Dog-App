const { Temperament } = require('../db');
const { default: axios } = require('axios');

async function getAllTemperaments () {
    const getDogs = await axios.get('https://api.thedogapi.com/v1/breeds/')
    const allDogs = await getDogs.data
    const array = []
    const set = new Set

    allDogs.map(dog => {
        if(dog.temperament) {
            array.push(dog.temperament)
        }
    });

    const separate = array.join(', ').split(', ')

    separate.map(temp => {
        set.add(temp)
    })

    set.forEach(temp => {
        Temperament.findOrCreate({
            where: {name: temp}
        })
    })
    return [...set]
}
module.exports = {
    getAllTemperaments
}