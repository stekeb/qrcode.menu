import { React, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import {
  createUser,
  findUser,
  createItem,
  deleteItem,
  moveItemUp,
  moveItemDown,
} from "./API_services/API_Database";

import { getTranslation } from "./API_services/DeepL_API";

function App() {
  const [userData, setUserData] = useState("");
  const [menuData, setMenuData] = useState("");
  // const [userIdState, setUserIdState] = useState("")

  async function registerHandler(userName, password, email) {
    const userDataInput = await createUser(userName, password, email);
    //setUserIdState(userDataInput.id)
    setUserData(userDataInput);
    setMenuData(userDataInput.Menuitems);
  }

  async function loginHandler(userName, password) {
    const userDataInput = await findUser(userName, password);
    // setUserIdState(userDataInput.id)
    setUserData(userDataInput);
    setMenuData(userDataInput.Menuitems);
  }

  let de = "";

  async function apiTest(en) {
    const testAPI = await getTranslation(en);
    de = testAPI.translations[0].text;
    console.log(testAPI.translations[0].text);
  }

  async function createItemHandler(
    toBeTranslated,
    className,
    en,
    de,
    fr,
    es,
    it,
    price,
    menuNumber,
    UserId
  ) {
    console.log(en);
    apiTest(en);
    const newItem = await createItem(
      toBeTranslated,
      className,
      en,
      de,
      fr,
      es,
      it,
      price,
      menuNumber,
      UserId
    );
    setMenuData((prevState) => [...prevState, newItem]);
  }

  async function deleteHandler(id) {
    const itemToBeDeleted = await deleteItem(id);
    const newMenuData = menuData.filter((item) => item.id != itemToBeDeleted);
    setMenuData(newMenuData);
  }

  async function moveUpHandler(id) {
    const newUserData = await moveItemUp(id);
    setMenuData(newUserData.Menuitems);
  }

  async function moveDownHandler(id) {
    const newUserData = await moveItemDown(id);
    setMenuData(newUserData.Menuitems);
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login loginHandler={loginHandler} />
        </Route>
        <Route path="/register">
          <Register registerHandler={registerHandler} />
        </Route>
        <Route path="/home">
          <Home
            menuData={menuData}
            userId={userData.id}
            createItemHandler={createItemHandler}
            moveDownHandler={moveDownHandler}
            moveUpHandler={moveUpHandler}
            deleteHandler={deleteHandler}
          />
          {/* <Home userIdState={userIdState} createItemHandler={createItemHandler}/> */}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
