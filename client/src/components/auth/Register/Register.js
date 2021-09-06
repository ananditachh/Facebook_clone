import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom';
import './Register.scss';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {registerUser} from '../../../actions/authActions';


class Register extends Component {

    constructor(){
        super();
        //Local state
        this.state = {
          name: '',
          lastname:'',
          email: '',
          password: '',
          errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value} )
      }

      onSubmit(e){
        e.preventDefault();
        const newUser = {
          name: this.state.name,
          lastname: this.state.lastname,
          email: this.state.email,
          password: this.state.password
          
        };
        
        this.props.registerUser(newUser,this.props.history);
     
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.errors){
          this.setState({errors: nextProps.errors});
        }
      }

 render() {

    const {errors} = this.state;

   
return (
    <div>  <form noValidate onSubmit={this.onSubmit.bind(this)}>
<Button><Link to="#" className="text-decoration-none">
          <b><div className='button2'type='submit'data-target="#pwdModal" data-toggle="modal" >
             Create a new account </div></b></Link></Button> 
         <br></br>

<div id="pwdModal" className="modal fade" tabIndex="-1" role="dialog" aria-hidden="true">

     <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
      <div className="modal-header">
      
      <h3 className="modal-title">SIGN UP</h3>
       </div>
     
      <div className="modal-body">
          <div className="col-md-12">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="text-center">
                         
                      <div className="panel-body">
                       <fieldset>
                       <div className="form-group">

                      <input type="first name"  className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name, })}
                     placeholder="First name" name="name"
                     value={this.state.name}
                    onChange={this.onChange.bind(this)}  /> 
                    {errors.name && (
                    <div className="invalid-feedback">{errors.name}
                    </div>
                  )}  
                        </div>  <br></br>

                     <div className="form-group">
                      <input type="last name" className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.lastname, })} placeholder="Last name" name="lastname" 
                      value={this.state.lastname}
                     onChange={this.onChange.bind(this)}/> 
                     {errors.lastname && (
                    <div className="invalid-feedback">{errors.lastname}
                    </div>
                  )} 
                         </div>  <br></br> 

                      <div className="form-group">
                      <input type="email"  className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email,})} 
                     placeholder="Email Address" name="email"
                     value={this.state.email}
                    onChange={this.onChange.bind(this)}/>          
                      {errors.email && (
                    <div className="invalid-feedback">{errors.email}
                    </div>
                  )} 
                   </div> <br></br>

                      <div className="form group">
                    <input type="password"   className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password, })}  
                      placeholder=" Password"name= "password" 
                      value={this.state.password}
                    onChange={this.onChange.bind(this)} />
                     {errors.password && (
                    <div className="invalid-feedback">{errors.password}
                    </div>
                  )}
                     </div>
                  
                    <div className="birthday">
                    <h2>Birthday</h2>
                    <select className="form-control-sm">
                        <option value="Day">Day</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7" selected>7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>                           
                        <option value="12">12</option> 
                        <option value="13">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                    </select>
                    <select className="form-control-sm" >
                        <option value="Month">Month</option>
                        <option value="Jan">Jan</option>
                        <option value="Feb">Feb</option>
                        <option value="Mar">Mar</option>
                        <option value="Apr">Apr</option>
                        <option value="May">May</option>
                        <option value="Jun">Jun</option>
                        <option value="Jul" selected>Jul</option>
                        <option value="Aug">Aug</option>
                        <option value="Sep">Sep</option>
                        <option value="Oct">Oct</option>
                        <option value="Nov">Nov</option>
                        <option value="Dec">Dec</option>
                    </select>
                    <select className="form-control-sm">
                        <option value="Year">Year</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                        <option value="2014" selected>2014</option>
                        <option value="2013">2013</option>
                        <option value="2012">2012</option>
                        <option value="2011">2011</option>
                        <option value="2010">2010</option>
                        <option value="2009">2009</option>
                    </select> 
                      
                </div>
               
                <div className="gender">
                    <h2>Gender</h2>
                    <label for="female"></label>
                    <input type="radio" name="gender" id="female"/> Female
                    <label for="male"></label>
                    <input type="radio" name="gender" id="male"/> Male
                    <label for="custom"></label>
                    <input type="radio"name="gender" id="custom"/> Custom
                </div> <br></br>
               
                <div className="topic">
                    <p>By clicking Sign Up, you agree to our <a href="#">Terms</a>, <a href="#">Data Policy</a> and <a href="#">Cookie Policy</a>. You may receive SMS notifications from us and can opt out at any time.</p>
                </div>
                <div className="col-md-12">
          
          <button type="button" className="btn  btn-secondary" data-dismiss="modal"> CANCEL </button>
          &nbsp;
          <button data-toggle="modal" href="#myModal2" type="submit" className="btn  btn-primary">SIGN UP </button>
          </div>
                         </fieldset>
                            </div>
                            </div>
                    </div>
                </div>
            </div>
      </div>
      
                            
  </div>
  </div>
 < div className="modal" id="myModal2"  >
	<div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">ACCOUNT REGISTERED</h3>
        </div>
        <div className="modal-body">
          <h4> You have successfully registered!!</h4>
        </div>
        <div className="modal-footer">
          
          <a href="/login" className="btn btn-primary">LOGIN PAGE
          </a>
        </div>
      </div>
    </div>
</div>
 </div>
 
 </form> 
 
 </div>
);
}
}


Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  

const mapStateToProps = (state) => (
    {
      
      errors: state.errors
    }
  );
  
  export default connect(mapStateToProps, {registerUser})(Register);