import './App.css';
import { Route } from 'react-router-dom'
import LandingPage from './Components/LandingPage';
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import DogDetails from './Components/DogDetails.js';
import CreateDog from './Components/CreateDog';

function App() {
  return (
    <div className="App">
      <NavBar/>
        <Route exact path= '/' render={() => <LandingPage/>}/>
        <Route exact path='/home' render={() => (<Home/>)}/>
        <Route exact path='/createDog' render={() => (<CreateDog/>)}/>
        <Route exapct path='/dog/:dogId' render={() => (<DogDetails/>)} />
    </div>
  );
}

export default App;
