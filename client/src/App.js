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

  async function registerHandler(userName, password, email) {
    const userDataInput = await createUser(userName, password, email);

    setUserData(userDataInput);
    setMenuData(userDataInput.Menuitems);
    setIsAuthenticated(true);
  }

  async function loginHandler(userName, password) {
    const userDataInput = await findUser(userName, password);

    setUserData(userDataInput);
    setMenuData(userDataInput.Menuitems);
    setIsAuthenticated(true);
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
  function authHandler() {
    setIsAuthenticated(false);
  }

  return (
    <div>
      <Router>
        <div className="appframe">
          {isAuthenticated ? (
            <div className="navbar">
              <Link to="/menueditor">
                <div className="navelement">Menu Editor</div>
              </Link>
              <Link to="/qrcodeeditor">
                <div className="navelement">QR-Code Editor</div>
              </Link>
              <Link to="/">
                <div className="navelement" onClick={authHandler}>
                  Logout
                </div>
              </Link>
            </div>
          ) : null}

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
        </div>
      </Router>
    </div>
  );
}

export default App;
