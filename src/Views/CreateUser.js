import React from 'react';
import Axios from 'axios';
import {
    Redirect,
    
  } from "react-router-dom";

class createUser extends React.Component {
    state = {
        username: '',
        password: '',
        confirmPassword: '',
        createUserStatus: false,
        createUserFeedback: '',
        validation: '',
    };

    handleUserChange = event => {
        this.setState({ username: event.target.value});
    }
    handlePassChange = event => {
        this.setState({ password: event.target.value});
    }
    handleConfirmPassChange = event => {
        this.setState({ confirmPassword: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        
        const username = this.state.username;
        const password = this.state.password

        if (this.state.password === this.state.confirmPassword) {
        Axios.post('http://localhost:3000/userActions/createUser', {
            username: username,
            password: password})
            .then(res => {
                
                this.setState({createUserStatus: true});
            })
            .catch(err => {
                console.log(err);
                this.setState({createUserFeedback: "Already a user with that username!"
              });
            });
        } else {
            this.setState({validation: "password does not match confirm password!"})
        }
    }

    render() {
        if (this.state.createUserStatus) {
            return <Redirect to='/'/>
        }
        return (
            <div className="container mx-auto max-w-xs flex justify-center">

                <form onSubmit={this.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                    <h1 className="font-bold text-2xl p-5 text-center">
                        Create User
                    </h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Username
                        </label>
                        <input onChange={this.handleUserChange} id="usernameInput" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Username" required/>
                    </div>
                    <div className="mb-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Password
                        </label>
                        <input onChange={this.handlePassChange} id="passwordInput"  className= "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************" pattern=".{8,}"  required/>
                        
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Confirm Password
                        </label>
                        <input onChange={this.handleConfirmPassChange} id="passwordInput"  className= "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"  type="password" placeholder="******************" pattern=".{8,}" required/>
                        <p className="text-red-500 text-xs italic">
                            {this.state.createUserFeedback}
                            {this.state.validation}
                        </p>
                    </div>
                    <div className="flex items-center justify-center">
                        <button className=" pr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Create User
                        </button>
                        
                    </div>
                </form>

            </div>
        )
    }
}


export default createUser;