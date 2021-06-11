import {React, useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route  
} from "react-router-dom";
import './App.css';
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import {createUser, findUser} from './API_services/API_Database'

function App() {
  
  const [userData, setUserData] = useState("")
  
  async function registerHandler (userName, password, email) {
    const userDataInput =await createUser(userName, password, email)
    setUserData(userDataInput)  
  }

  async function loginHandler (userName, password) {
    const userDataInput = await findUser(userName, password)
    setUserData(userDataInput)
  }
  
  
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Login loginHandler={loginHandler}/>
          </Route>
          <Route path="/register">
            <Register registerHandler={registerHandler}/>
          </Route>
          <Route path="/home">
            <Home userData={userData}/>
          </Route>
        </Switch>     
    </Router>
  );
}

export default App;
