import React, { useReducer } from "react";
import uuid from "uuid";
import axios from "axios";
import AuthContext from "../Auth/AuthContext";
import AuthReducer from "../Auth/AuthReducer";
import SetAuthToken from "../../Utils/SetAuthToken"

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  REGISTER_SUCESS,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from "../types";

//initial state
const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };
  //reducers
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Load User
  const loadUser = async () => {

    //@load token into global users
    if (localStorage.token) {
      SetAuthToken(localStorage.token)
    }

    try {
      //call the auth endpoint 
      const res = await axios.get('/api/auth')
      dispatch({ type: USER_LOADED, payload: res.data })
    } catch (err) {
      dispatch({ type: AUTH_ERROR })
    }
  };
  //Register User
  const register = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      //connect to users endpoint
      const res = await axios.post("api/users", formData, config);

      dispatch({ type: REGISTER_SUCESS, payload: res.data });
      //load corresponding user
      loadUser()
    } catch (err) {
      //show error from the trycatch method in the users endpoint
      dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
    }
  };
  //Login User
  const loginUser = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      //connect to users endpoint
      const res = await axios.post("api/auth", formData, config);

      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      //load corresponding user
      loadUser()
    } catch (err) {
      //show error from the trycatch method in the users endpoint
      dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
    }
  };
  //Logout User
  const logoutUser = () => dispatch({ type: LOGOUT });
  //Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        loginUser,
        logoutUser,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
