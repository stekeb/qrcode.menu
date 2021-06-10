import { React, useState } from 'react';
import { Link } from "react-router-dom";


function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  
  
  return (
    <div>
     <div>This is the Login page</div>
     <form className ="loginform" onSubmit={()=> console.log("Loginform button")}>
       
       
       
       <button className="button" type ="submmit">Login</button>
     </form>
     
     
     <div>Click <Link to="/register">here</Link> to register </div>
    </div>
  );
}

export default Login;