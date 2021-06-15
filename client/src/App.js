import { React, useState } from "react";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Qrcodeeditor from "./components/Qrcodeeditor";
import Menueditor from "./components/Menueditor";
import MobileMenu from "./containers/MobileMenu";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const userId=1

  async function registerHandler(userName, password, email) {
    const userDataInput = await createUser(userName, password, email);
    //setUserIdState(userDataInput.id)
    setUserData(userDataInput);
    setMenuData(userDataInput.Menuitems);
    setIsAuthenticated(true);
  }

  async function loginHandler(userName, password) {
    const userDataInput = await findUser(userName, password);
    // setUserIdState(userDataInput.id)
    setUserData(userDataInput);
    setMenuData(userDataInput.Menuitems);
    setIsAuthenticated(true);
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
  if (isAuthenticated) {
    return (
      <div>
        <div>AUTH</div>
        <div className="appframe">
          <Router>
            <div className="navbar">
              <Link to="/menueditor">
                <div className="navelement">Menu Editor</div>
              </Link>
              <Link to="/qrcodeeditor">
                <div className="navelement">QR-Code Editor</div>
              </Link>
              <Link to="/">
                <div className="navelement">Logout</div>
              </Link>
            </div>
            <Switch>
              <Route exact path="/">
                <Login loginHandler={loginHandler} />
              </Route>
              <Route path="/register">
                <Register registerHandler={registerHandler} />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/menu/:userName">
                <MobileMenu />
              </Route>
              <Route path="/menueditor">
                <Menueditor
                  menuData={menuData}
                  userId={userData.id}
                  createItemHandler={createItemHandler}
                  deleteHandler={deleteHandler}
                  moveUpHandler={moveUpHandler}
                  moveDownHandler={moveDownHandler}
                />
              </Route>
              <Route path="/qrcodeeditor">
                <Qrcodeeditor userName={userData.userName} />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>notAUTH</div>
        <div className="appframe">
          <Router>
            {/* <div className="navbar">
            <Link to="/menueditor">
              <div className="navelement">Menu Editor</div>
            </Link>
            <Link to="/qrcodeeditor">
              <div className="navelement">QR-Code Editor</div>
            </Link>
            <Link to="/">
              <div className="navelement">Logout</div>
            </Link>
          </div> */}
            <Switch>
              <Route exact path="/">
                <Login loginHandler={loginHandler} />
              </Route>
              <Route path="/register">
                <Register registerHandler={registerHandler} />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/menu/:userName">
                <MobileMenu />
              </Route>
              <Route path="/menueditor">
                <Menueditor
                  menuData={menuData}
                  userId={userData.id}
                  createItemHandler={createItemHandler}
                  deleteHandler={deleteHandler}
                  moveUpHandler={moveUpHandler}
                  moveDownHandler={moveDownHandler}
                />
              </Route>
              <Route path="/qrcodeeditor">
                <Qrcodeeditor />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
