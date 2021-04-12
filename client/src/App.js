import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

// Today, popularized by modern frontend JavaScript frameworks like React, an app is usually built as a single page application: 
// you only load the application code (HTML, CSS, JavaScript) once, and when you interact with the application, 
// what generally happens is that JavaScript intercepts the browser events and instead of making a new request 
// to the server that then returns a new document, the client requests some JSON or performs an action on the 
// server but the page that the user sees is never completely wiped away, and behaves more like a desktop application.


const App = () => {
  return (

    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className="container">
          <Switch>
            <Route exact path='/register' component={Register} />   {/*exact can be used with Switch also*/}
            <Route exact path='/login' component={Login} />
          </Switch>
        </section>
      </Fragment>
    </Router> 
  );
};

export default App;
