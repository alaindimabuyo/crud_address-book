import React, { Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Alerts from "./components/layout/Alert";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import AuthState from "./context/Auth/AuthState";
import ContactState from "./context/contact/ContactState";
import AlertState from "./context/Alert/AlertState";
import SetAuthToken from "./Utils/SetAuthToken"
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/routing/PrivateRoute"

//@load token into global users
if (localStorage.token) {
  SetAuthToken(localStorage.token)
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className='container'>
                <Alerts />
                <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/login' component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
