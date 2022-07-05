import axios from 'axios';

export async function postMyDogs (payload) {
    const create = await axios.post('http://localhost:3001/dogs', payload);
    return create
}