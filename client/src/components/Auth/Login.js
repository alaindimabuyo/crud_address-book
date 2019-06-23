import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/Auth/AuthContext";
import AlertContext from "../../context/Alert/AlertContext";

const Login = props => {
  //initialize CONTEXT
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  //pull out setalert from the alertcontext
  const { setAlert } = alertContext;
  //destructure from authcontext
  const { loginUser, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      //is statement is true redirect into homepage
      props.history.push('/')
    }

    if (error) {
      //if there is an error message show error
      setAlert(error, "danger");
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  //desutructure
  const { name, email, password, password2 } = user;

  //enter the correct piece of state
  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    //call method to login
    if (email === '' || password === '') {
      setAlert('Please fill all fields', 'danger')
    } else {
      loginUser({
        email,
        password
      })
    }
  };
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input type='text' name='email' value={email} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='text' name='password' value={password} onChange={onChange} />
        </div>
        <input type='submit' value='Login' className='btn btn-primary btn-block' />
      </form>
    </div>
  );
};

export default Login;
