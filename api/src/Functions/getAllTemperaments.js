const { getAllDogs } = require('./getAllDogs.js')
const { Temperament } = require('../models/Temperament.js')

async function getAllTemperaments () {
    const set = new Set;
    const getDogs = await getAllDogs();

    /* Mapeo a través de la variedad de perros y agregando el temperamento al conjunto. */
    getDogs.map(dog => {
        if(dog.temperament) {
        const splited = dog.temperament.split(', ');
        splited.map(t => set.add(t));
    }});

    
    /* Crear un nuevo temperamento para cada elemento del conjunto. */
    set.forEach(temp => {
            const newTemp = await Temperament.create({
                name: temp
        })
    })
}

module.exports = {
    getAllTemperaments
}