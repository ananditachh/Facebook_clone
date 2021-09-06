import {  SET_USER } from "./types";
import {  SET_CURRENT_USER } from "./types";
import axios from 'axios';

import {  SET_ERROR } from "./types";

import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


// Register user
export const registerUser = (userData, history)=> dispatch => {
  axios
        .post( '/api/users/register',userData) 
        .then(res => history.push('/login'))
        .catch(err => 
          
            dispatch({
              type: SET_ERROR,
              payload: err.response.data}));

}

// Login user
export const loginUser = (userData)=> dispatch => {
  axios
        .post( '/api/users/login',userData) 
          .then((res) => {
           
            //save the token to localstorage
            const {token} = res.data;
            localStorage.setItem('jwtToken', token);
            //set token to auth header
            setAuthToken(token);
            //decode token
            const decoded = jwt_decode(token);
            console.log(token);
             
            //Write user info to redux
            dispatch({
              type: SET_USER,
              payload: decoded,
            });
          })
          .catch((err) =>
            dispatch({
              type: SET_ERROR,
              payload: err.response.data,
            })
          );
          }       
  export const logoutUser = () => dispatch => {
            //Remove token from ls
            localStorage.removeItem('jwtToken');
            //Remove token from axios header
            setAuthToken(false);
            console.log(localStorage);
            //Reset user in the redux store
            dispatch({
              type: SET_USER,
              payload: {},
            });  
                }
                  
    // forgot password          
    export const forgotPassword = (userEmail,history)=> dispatch => {
      axios  
      .post( '/api/users/reset',userEmail) 
      .then(res => history.push('/login'))
      .catch(err => 
        
          dispatch({
            type: SET_ERROR,
            payload: err.response.data,
          }
          )
          );
          }       