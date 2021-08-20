import React, { Component } from 'react';
import axios  from 'axios';

import classnames from 'classnames';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            lastname: '',
            email: '',
            password: '',
            password2: '',
            dob: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange (event){
        console.log(event)
        this.setState({[event.target.name]:event.target.value})
    }


    onSubmit(e) {
        e.preventDefault()

        const newUser = {
            name:this.state.name,
            lastname:this.state.lastname,
            email:this.state.email,
            password:this.state.password,
            password2:this.state.password2
        }

        axios
        .post('/api/users/register',newUser)
        .then(res=> {
            
            this.setState({errors:{}})
            return console.log(res.data)})
        .catch(err=>
            this.setState({errors:err.response.data}))
    }



    render() {
        const {errors} = this.state 
        return (

            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={this.onSubmit.bind(this)} noValidate>
                            <div className="form-group">
                                <input type="text"
                                    className= {classnames('form-control', {'is-invalid': errors.name})} 
                                    name="name"
                                    value = {this.state.name}
                                    onChange= {this.onChange}
                                    id="exampleInputName"
                                    aria-describedby="NameHelp"
                                    placeholder="Enter Name" />
                                    {errors.name && (
                                    <div className="invalid-feedback">{errors.name}</div>)}
                            </div>

                            <div className="form-group">
                                <input type="text"  
                                className= {classnames('form-control', {'is-invalid': errors.lastname})}  
                                name="lastname"
                                value = {this.state.lastname}
                                onChange= {this.onChange.bind(this)}
                                 id="exampleInputLName" aria-describedby="LNameHelp" placeholder="Enter lastName" />
                            </div>


                            <div className="form-group">
                                <input type="email" 
                                 className= {classnames('form-control', {'is-invalid': errors.email})} 
                                 name="email" 
                                value = {this.state.email}
                                onChange= {this.onChange.bind(this)}  
                                id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                 {errors.email ? (
                                <div className="invalid-feedback">{errors.email}</div>):''}

                            </div>

                            <div className="form-group">
                                <input type="password" 
                                 className= {classnames('form-control', {'is-invalid': errors.password})} 
                                 name="password" 
                                value = {this.state.password} 
                                onChange= {this.onChange.bind(this)}
                                id="exampleInputPassword1" placeholder="Password" />
                            </div>

                            <div className="form-group">
                                <input type="password" 
                                 className= {classnames('form-control', {'is-invalid': errors.password2})} 
                                 name="password2" 
                                value = {this.state.password2}
                                onChange= {this.onChange.bind(this)} 
                                id="exampleInputPassword2" placeholder="Confirm Password" />
                            </div>

                            <div className="form-group">
                                <input type="date" className="form-control" name="dob" 
                                value = {this.state.dob}
                                onChange= {this.onChange.bind(this)} 
                                id="exampleInputdob" aria-describedby="dobHelp" placeholder="Enter DateofBirth" />
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

export default Register;

