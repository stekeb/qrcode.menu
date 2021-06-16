import { React, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../qrcode_logo.png";

function Register({ registerHandler }) {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [eMail, setEMail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await registerHandler(userName, password, eMail);
    setUserName("");
    setPassword("");
    setEMail("");

    history.push("/home");
  };

  return (
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <div className="loginregistercontainer">
        <form className="loginregisterform" onSubmit={submitHandler}>
          <label htmlFor="usernameregister" className="formheader">
            Username:{" "}
          </label>
          <input
            className="formfield"
            id="usernameregister"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            value={userName}
            type="text"
            placeholder="Insert your username"
          />

          <label htmlFor="passwordregister" className="formheader">
            Password:{" "}
          </label>
          <input
            className="formfield"
            id="passwordregister"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
            placeholder="Insert your password"
          />

          <label htmlFor="emailregister" className="formheader">
            e-Mail:{" "}
          </label>
          <input
            className="formfield"
            id="emailregister"
            onChange={(e) => {
              setEMail(e.target.value);
            }}
            value={eMail}
            type="text"
            placeholder="Insert your e-mail address"
          />

          <button className="formbutton" type="submmit">
            Register
          </button>
        </form>

        <div className="formtext">
          Back to the <Link to="/">Login</Link> page
        </div>
      </div>
    </div>
  );
}

export default Register;
