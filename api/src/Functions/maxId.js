const axios = require('axios');

async function maxIdApi () {
    axios.get('https://api.thedogapi.com/v1/breeds/')
    .then(got => got.data)
    .then(alldogs => alldogs.map(dog => {return dog.id}))
    .then(thedogid => Math.max(...thedogid))
};
maxIdApi()

module.exports ={
    maxIdApi
};