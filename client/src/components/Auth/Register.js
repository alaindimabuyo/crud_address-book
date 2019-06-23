import React, { useState, useContext, useEffect } from "react";
import AlertContext from "../../context/Alert/AlertContext";
import AuthContext from "../../context/Auth/AuthContext";

const Register = props => {
  //initialize CONTEXT
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  //pull out setalert from the alertcontext
  const { setAlert } = alertContext;
  //destructure from authcontext
  const { register, error, clearErrors, isAuthenticated } = authContext;

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
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  //desutructure
  const { name, email, password, password2 } = user;

  //enter the correct piece of state
  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    //validation
    if (name === "" || email === "" || password === "") {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Password do not match", "danger");
    } else {
      //call method to register
      register({
        name,
        email,
        password
      });
    }
  };
  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={name} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input type='text' name='email' value={email} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='text' name='password' value={password} onChange={onChange} minLength='6' />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input type='text' name='password2' value={password2} onChange={onChange} minLength='6' />
        </div>
        <input type='submit' value='Register' className='btn btn-primary btn-block' />
      </form>
    </div>
  );
};

export default Register;
