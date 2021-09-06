import React, {Component} from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import fbNameLogo from '../../../assets/img/fbNameLogo.png';
import PropTypes from 'prop-types';
import {logoutUser} from '../../../actions/authActions';

import {
  SearchIcon,
  HomeRoundedIcon,
  SubscriptionsRoundedIcon,
  SupervisedUserCircleRoundedIcon,
  AddRoundedIcon,
  NotificationsRoundedIcon,
  StorefrontRoundedIcon,
  ExitToAppRoundedIcon
} from '../../../utils/icons';
import fbImgLogo from '../../../assets/img/fbImgLogo.png';
import './Navbar.scss';



class Navbar extends Component {

  onLogoutClick(e){
    e.preventDefault();
    this.props.logoutUser();
  }
  render() {

    const {isAuthenticated, user} =  this.props.auth;

    const fbLinks = (
      <div className='login'>
      <div className='logo'>
        <img src={fbNameLogo} alt='name logo' />
        <h3>Facebook clone made using React.</h3>
      
      <div className="logs">
      <a href="/login" class="btn btn-primary">LOGIN</a>
      </div> 
      </div>
     </div>    
    );

    const authLinks = (
      
      <div className='header'>
      <div className='headerLeft'>
        <img src={fbImgLogo} alt='fb logo' className='logo' />
        <div className='searchInput'>
          <SearchIcon className='searchIcon' />
          <input type='text' placeholder='Search Facebook' className='inputBar' />
        </div>
      </div>

      <div className='headerCenter'>
        <div className='activeOption'>
        <a href="/profile" >
           <HomeRoundedIcon  fontSize='large' className='icon' />
          </a>
        </div>
        
        <div className='option'>
          <SubscriptionsRoundedIcon fontSize='large' className='icon' />
        </div>
        <div className='option'>
          <StorefrontRoundedIcon fontSize='large' className='icon' />
        </div>
        <div className='option'>
          <SupervisedUserCircleRoundedIcon fontSize='large' className='icon' />
        </div>
      </div>

      <div className='headerRight'>
        <div className='info'>
          
        
        </div>
        <IconButton>
          <AddRoundedIcon />
        </IconButton>
        <IconButton>
          <NotificationsRoundedIcon />
        </IconButton>
        
           <div className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
          <IconButton >
          <ExitToAppRoundedIcon />
        </IconButton>
          </a>
        </div>
      
          </div>
    </div>
        
        
    );
    return (
          <div>
            {isAuthenticated ? authLinks : fbLinks}
          </div>
        
    )
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {logoutUser})(Navbar);