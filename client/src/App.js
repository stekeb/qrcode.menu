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

  // is handed down to Menueditor.js to create an entry and store it in the database. before sending the data from the form to the DB a for loop sends the entry to the DeepL API and stores the return values in an object, with which the non-english parameters are filled
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
  // is handed down to Menulist.js to provide functionnlity to the delete button
  async function deleteHandler(id) {
    const itemToBeDeleted = await deleteItem(id);
    const newMenuData = menuData.filter((item) => item.id != itemToBeDeleted);
    setMenuData(newMenuData);
  }
  // is handed down to Menulist.js, so entries in the menu can be moved up
  async function moveUpHandler(id) {
    const newUserData = await moveItemUp(id);
    setMenuData(newUserData.Menuitems);
  }
  // is handed down to Menulist.js, so entries in the menu can be moved down
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
