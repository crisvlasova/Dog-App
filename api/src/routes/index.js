const { Router } = require('express');
const { Dog, Temperament } = require('../db');
const { getAllDogs } = require('../Functions/getAllDogs.js');
const { getAllTemperaments } = require('../Functions/getAllTemperaments');
const express = require('express');
const router = Router();


router.use(express.json());



router.get('/dogs', async (req,res) => {
    const { name } = req.query;
    const getDogs = await getAllDogs();

    if(name) {
    const found = await getDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
    found.length ? res.status(200).send(found) : res.status(404).send(`El perro ${name} no existe:(`);
    } else {
          res.status(200).send(getDogs)
        }
});



router.get('/dogs/:idRaza', async (req,res) => {
    const {idRaza} = req.params;
    const getDogs = await getAllDogs();
    try{
        if (idRaza) {
            const dog = getDogs.find(dog => dog.id == idRaza);
            dog? res.send(dog) : res.status(404).send(`No hemos encontrado al perro con el id ${idRaza}`)
    }} catch (err) {
        res.status(400).send(err)
    }
});



router.post('/dogs', async (req,res) => {
    const {name, height, weight, life_span, image, temperament} = req.body;
    if(!name || !height || !weight || !life_span) {
        return res.status(404).send('Debes completar todos los campos')
    } else {
        try{
        const newDog = await Dog.create(
            {name,
            height,
            weight,
            life_span,
            image,
         })
    
        const findTemps = await Temperament.findAll({
            where:{name: temperament}})

        await newDog.addTemperament(findTemps)


        return res.status(202).send(`El perro ${name} ha sido creado satisfactoriamente`);
    }catch(error) {
        return res.status(404).send(`Error mi ciela`)
    }
    }
})



router.get('/temperaments', async (req,res) => {
        const temps = await getAllTemperaments()
        return res.status(202).json(temps)
})

module.exports = router;
