import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Forgotpassword.scss';
import { Link } from 'react-router-dom';
import Popover from 'react-bootstrap/Popover';
import classnames from 'classnames';
import { forgotPassword } from '../../../actions/authActions';


class Forgotpassword extends Component {
  constructor() {
    super();
    //Local state
    this.state = {
      useremail: '',
      alert: {
        message: ''
    },
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
    const newEmail = {
      email : this.state.useremail,
    };
    
    this.props.forgotPassword(newEmail,this.props.history);
  }
componentWillReceiveProps(nextProps) {
     if (nextProps.errors) {
        this.setState({ errors: nextProps.errors });
    }
    if (nextProps.alert) {
      this.setState({ alert: nextProps.alert });
  }
}

render() {
  const useremail = this.state.errors.useremail
  const message = this.state.alert.message


  return (
    <div className="forgot">
        <div className="left-area">
            <div className="connect">
            <p> Facebook helps you connect and share with the people in your life.</p>
                
            </div>
        </div>
       
          
          <div id="passwordModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h4 className="modal-title" id="exampleModalLabel">Forgot Password ?</h4>
                          </div>
                          <div class="modal-body">
                                {message ? (<div className="alert alert-primary" role="alert">
                                    {message}
                                </div>) : ''}
                          
                    <form noValidate onSubmit={this.onSubmit.bind(this)}>
                              <div className="form-group">
                                  <label for="exampleInputEmail1">Please enter your email address to reset your password.</label>
                                  <input type="email"
                                      name="useremail"
                                      value={this.state.useremail}
                                      className={classnames('form-control', { 'is-invalid': useremail })}
                                      id="exampleInputEmail1"
                                      onChange={this.onChange.bind(this)}
                                      aria-describedby="emailHelp"
                                      placeholder=" Email" />
                                  {useremail ? (
                                      <div className="invalid-feedback">{useremail}</div>) : ''}
                              </div>
                              
                              <div className="modal-footer">
                      <a href="/login" data-dismiss="modal" class="btn btn-secondary">Close</a>
                                                                       
                      <a href="#" data-toggle="popover" class="btn btn-primary"  data-trigger="hover" data-placement="top" title=" Please check your email for further instructions."> Send</a>
                          </div>
                          </form>
                          
                      </div>
                      
                      
                      </div>
                  </div>
              </div>
          </div>
    
      
      
  )
}
}
Forgotpassword.propTypes = {
forgotPassword: PropTypes.func.isRequired,
errors: PropTypes.object.isRequired,
alert: PropTypes.object.isRequired

};

const mapStateToProps = (state) => ({
errors: state.errors,
alert: state.alert
});
export default connect(mapStateToProps, { forgotPassword })(Forgotpassword);