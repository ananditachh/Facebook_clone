import React, { Component } from 'react';
import axios  from 'axios';

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

        const newuser = {
            name:this.state.name,
            
        }
    }



    render() {
        return (

            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text"
                                    className="form-control"
                                    name="name"
                                    value = {this.state.name}
                                    onChange= {this.onChange}
                                    id="exampleInputName"
                                    aria-describedby="NameHelp"
                                    placeholder="Enter Name" />
                            </div>

                            <div className="form-group">
                                <input type="text" className="form-control" name="lastname"
                                value = {this.state.lastname}
                                onChange= {this.onChange.bind(this)}
                                 id="exampleInputLName" aria-describedby="NameHelp" placeholder="Enter lastName" />
                            </div>


                            <div className="form-group">
                                <input type="email" className="form-control" name="email" 
                                value = {this.state.email}
                                onChange= {this.onChange.bind(this)}  
                                id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />

                            </div>

                            <div className="form-group">
                                <input type="password" className="form-control" name="password" 
                                value = {this.state.password} 
                                onChange= {this.onChange.bind(this)}
                                id="exampleInputPassword1" placeholder="Password" />
                            </div>

                            <div className="form-group">
                                <input type="password" className="form-control" name="password2" 
                                value = {this.state.password2}
                                onChange= {this.onChange.bind(this)} 
                                id="exampleInputPassword1" placeholder="Confirm Password" />
                            </div>

                            <div className="form-group">
                                <input type="date" className="form-control" name="dob" 
                                value = {this.state.dob}
                                onChange= {this.onChange.bind(this)} 
                                id="exampleInputLName" aria-describedby="NameHelp" placeholder="Enter DateofBirth" />
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

