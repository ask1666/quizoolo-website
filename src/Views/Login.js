import React from 'react';
import Axios from 'axios';
import {
        Redirect,
        Link,

} from "react-router-dom";

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        loginStatus: false,
        loginFeedback: '',
        passwordBorder: ``,
    };

    handleUserChange = event => {
        this.setState({ username: event.target.value });
    }
    handlePassChange = event => {
        this.setState({ password: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const username = this.state.username;

        const password = this.state.password

        Axios.post('http://localhost:3000/userActions/login', {
            username: username,
            password: password
        })
            .then(res => {
                sessionStorage.setItem('authToken', res.data.authToken);
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('userid', res.data.userid)
                this.setState({ loginStatus: true });
            })
            .catch(err => {
                console.log(err);
                this.setState({ loginFeedback: 'Wrong username or password', passwordBorder: `border-red-500` })
                
            });
    }

    render() {
        if (this.state.loginStatus) {
            
            return <Redirect to='/' />
        }
        return (
            <div className=" w-full flex justify-center pt-10">

                <form onSubmit={this.handleSubmit} className=" shadow-2xl border-4 border-gray-400 rounded-lg px-8 pt-6 pb-8 mb-4 ">
                    <h1 className="font-bold text-2xl p-5 text-center">
                        Login
                    </h1>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Username
                        </label>
                        <input onChange={this.handleUserChange} id="usernameInput" className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Username" required/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Password
                        </label>
                        <input onChange={this.handlePassChange} id="passwordInput" className={` appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" ${this.state.passwordBorder}`} type="password" placeholder="******************" required/>
                        <p className="text-red-500 text-xs italic">
                            {this.state.loginFeedback}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button  className=" pr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Sign In
                        </button>
                        <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/createUserPage">
                            Create User
                        </Link>
                    </div>
                </form>

            </div>
        )
    }
}


export default Login;