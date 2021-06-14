import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Menueditor from "./Menueditor";
import Qrcodeeditor from "./Qrcodeeditor";
import Login from "./Login";

function Home({
  menuData,
  createItemHandler,
  userId,
  deleteHandler,
  moveUpHandler,
  moveDownHandler,
}) {
  return (
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
          <Route path="/menueditor">
            <Menueditor
              menuData={menuData}
              userId={userId}
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
  );
}

export default Home;
