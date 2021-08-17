import React, { Component } from 'react'

class Register extends Component {
    render() {
        return (
            
               <div className="container">
                <div className="row">       
                    <div className="col-md-6">
                        <form>
                            <div className="form-group">                     
                                <input type="text" className="form-control" id="exampleInputName" aria-describedby="NameHelp" placeholder="Enter Name"/>                       
                            </div>

                            <div className="form-group">                     
                                <input type="text" className="form-control" id="exampleInputLName" aria-describedby="NameHelp" placeholder="Enter lastName"/>                       
                            </div>


                            <div className="form-group">                     
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>

                            <div className="form-group">                     
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                            </div>
                    
                            <div className="form-group">                     
                                <input type="date" className="form-control" id="exampleInputLName" aria-describedby="NameHelp" placeholder="Enter lastName"/>                       
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

