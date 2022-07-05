import React from 'react';
import Dogs from './Dogs.js';
import '../StyleSheets/Home.css'

export default function Home () {

    return (
        <div className='home-container'>
            <br/>
            <br/>
            <h1>THE DOG APP</h1>
            <h2>Dogs:</h2>
            <Dogs/>
            
        </div>
    ) 
};
