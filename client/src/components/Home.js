import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Menueditor from "./Menueditor";
import Qrcodeeditor from "./Qrcodeeditor";

function Home({
  menuData,
  createItemHandler,
  userId,
  deleteHandler,
  moveUpHandler,
  moveDownHandler,
}) {
  return (
    <Router>
      This is the home screen
      <div className="navbar">
        <Link to="/menueditor">
          <div>Menu Editor</div>
        </Link>
        <Link to="/qrcodeeditor">
          <div>QR-Code Editor</div>
        </Link>

        <div>Logout</div>
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
      <div></div>
    </Router>
  );
}

export default Home;
