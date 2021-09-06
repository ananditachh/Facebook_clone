import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import Footer from './components/layout/Footer/Footer';
import Navbar from './components/layout/Navbar/Navbar';
//import Landing from './components/layout/Landing';
import Register from './components/auth/Register/Register';
import Profile from './components/layout/Profile/Profile';
import Login from './components/auth/Login/Login';
//import FYA from './components/auth/Forgotpassword/Forgotpassword';
//import CNP from './components/auth/Reset/Reset';
import store from './store';
import jwt_decode from 'jwt-decode';
import {logoutUser} from './actions/authActions';
import setAuthToken from './utils/setAuthToken';
import {SET_USER} from './actions/types';
import Reset from './components/auth/Reset/Reset';
import Forgotpassword from './components/auth/Forgotpassword/Forgotpassword';

if (localStorage.jwtToken){

//decode
const decoded = jwt_decode(localStorage.jwtToken);
//check the expiry of the token
const currentTime = Date.now()/1000;
if (decoded.exp < currentTime){
  //Expired
  //Logout user
  store.dispatch(logoutUser());
  //Redirect user to login
  window.location.href = "/login";
}  
else

//Set auth header
setAuthToken(localStorage.jwtToken);

 //dispatch
store.dispatch({
  type: SET_USER,
  payload: decoded
});

}

class App extends Component {

  render() {
    return (
      
       <Provider store={store} >
      <Router>
      <div className="App">
        
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/forgotpassword" component={Forgotpassword} />
        <Route exact path="/navbar" component={Navbar} />
        <Route exact path="/reset" component={Reset} />
        
        
      
      
        
      </div>
    </Router>
    </Provider>
    
    );
  }

}

export default App;
