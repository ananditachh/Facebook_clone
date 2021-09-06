import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import fbNameLogo from '../../../assets/img/fbNameLogo.png';
import Register from '../Register/Register';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './Login.scss';
import {loginUser} from '../../../actions/authActions';

class Login extends Component {
  constructor() {
    super();
    //Local state
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
  }

  onChange=(e)=>{
    this.setState({[e.target.name]: e.target.value} )
  }

  
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(newUser);
  }
  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/profile');
    }
  }

    componentWillReceiveProps(nextProps){
      if (nextProps.auth.isAuthenticated){
        this.props.history.push('/profile');
      }
      if (nextProps.errors){
        this.setState({errors: nextProps.errors});
      }
    }
   render() {
      const { errors } = this.state;
      
  return (
    
    <div className='login'>
    <div className='logo'>
      <img src={fbNameLogo} alt='name logo' />
      <h3>Facebook clone made using React.</h3>
    </div>
    <div className='loginCard'>
      <div className='card'>
      <form noValidate onSubmit={this.onSubmit}>
       
            <div className="form-group">
              <input type="email" 
              className={classnames("form-control form-control-lg", 
              { "is-invalid": errors.email,})}
               placeholder="Email Address" name="email"
               value={this.state.email}
               onChange={this.onChange} />
                  {errors.email && (
               <div className="invalid-feedback">{errors.email}
               </div>)} 
                  
            </div>
            <br></br>
            <div className="form-group">
              <input type="password"
               className={classnames("form-control form-control-lg", 
               {"is-invalid": errors.password,})}
                placeholder="Password" name="password"
                value={this.state.password}
                    onChange={this.onChange} />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}
                    </div>
                  )}
            </div>
            <button className="button1" type="submit">LOGIN </button>
            </form>
            
          <br></br>
              
          <a href="/ForgotPassword" >Forgot Password?</a>
           <hr></hr>
            
              <Register/>
        <div className="formbox">
          <div className="create"><div className="link"><a href= "https://www.facebook.com/pages/create/?ref_type=registration_form" >Create a Page</a></div>  for a celebrity, band or business.
          </div>
        </div>
        </div> 
     
    </div>
</div>

);
}
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};


const mapStateToProps = (state) => (
  {
    auth: state.auth,
    errors: state.errors
  }
);

export default connect(mapStateToProps, {loginUser})
(Login);