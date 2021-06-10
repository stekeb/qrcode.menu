import React from 'react';
import { Link } from "react-router-dom";



function Register(props) {
  return (
    <div>
     <div>This is the register page </div>
     <Link to="/"><div>Login</div></Link>
    </div>
  );
}

export default Register;