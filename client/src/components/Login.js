import { React, useState } from 'react';
import { Link, useHistory } from "react-router-dom";


function Login({loginHandler}) {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    await loginHandler(userName, password)

    setUserName('');
    setPassword('');

    history.push('/home')
  }
  
  
  return (
    <div>
     <div>This is the Login page</div>
     <form className ="loginregisterform" onSubmit={submitHandler}>
       
      <label htmlFor="usernamelogin" className="formheader">Username: </label>
      <input 
        className="formfield" 
        id="usernamelogin"
        onChange={(e) => {setUserName(e.target.value)}} 
        value={userName} 
        type="text"
        placeholder="Insert your username"
      />

      <label htmlFor="passwordlogin" className="formheader">Password: </label>
      <input 
        className="formfield" 
        id="passwordlogin"
        onChange={(e) => {setPassword(e.target.value)}} 
        value={password} 
        type="text"
        placeholder="Insert your password"
      />    
       
       <button className="formbutton" type ="submmit">Login</button>
     </form>
     
     
     <div>Click <Link to="/register">here</Link> to register </div>
    </div>
  );
}

export default Login;