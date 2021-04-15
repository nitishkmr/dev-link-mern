import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/ProtectedRoutes';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
//Redux
import { Provider } from 'react-redux';   // to connect redux and react
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// Today, popularized by modern frontend JavaScript frameworks like React, an app is usually built as a single page application: 
// you only load the application code (HTML, CSS, JavaScript) once, and when you interact with the application, 
// what generally happens is that JavaScript intercepts the browser events and instead of making a new request 
// to the server that then returns a new document, the client requests some JSON or performs an action on the 
// server but the page that the user sees is never completely wiped away, and behaves more like a desktop application.


if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {   //side effect function which runs the callback function whenever things re-render
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>    {/* since everything is inside Provider => every component has access to the store */}
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className="container">
            <Alert />
            <Switch>    {/* Switch can only have <Route> */}
              <Route exact path='/register' component={Register} />   {/*exact can be used with Switch also*/}
              <Route exact path='/login' component={Login} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:id' component={Profile} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />  {/* to access the route only if logged in */}
              <PrivateRoute exact path='/create-profile' component={CreateProfile} />
              <PrivateRoute exact path='/edit-profile' component={EditProfile} />
              <PrivateRoute exact path='/add-experience' component={AddExperience} />
              <PrivateRoute exact path='/add-education' component={AddEducation} />
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/posts/:id' component={Post} />
              
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
