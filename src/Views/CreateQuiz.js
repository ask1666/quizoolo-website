import React from 'react';
import Axios from 'axios';
import {
    BrowserRouter as Router,
    Redirect,
    Link,
    
  } from "react-router-dom";

class createQuiz extends React.Component {
    state = {
        QuizName: '',
        createUserStatus: false,
        createUserFeedback: '',
        validation: '',
    };

    handleQuizNameChange = event => {
        this.setState({ QuizName: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        
        const quizName = this.state.quizName;

        
        Axios.post('http://localhost:3000/userActions/createUser', {
            quizName: quizName},
            {authToken: localStorage.getItem('authToken')})
            .then(res => {
                
                this.setState({createUserStatus: true});
            })
            .catch(err => {
                console.log(err);
                this.setState({createUserFeedback: err.res ? err.res : err.message});
            });
        
    }

    render() {
        if (this.state.createUserStatus) {
            return <Redirect to='/'/>
        }
        return (
            <div className="container mx-auto max-w-xs flex justify-center">

                <form onSubmit={this.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                    <h1 className="font-bold text-2xl p-5 text-center">
                        Choose a name for your Quiz!
                    </h1>
                    <div className="mb-6">
                        <input onChange={this.handleQuizNameChange} className= "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="Quiz name" pattern=".{3,}" required/>
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


export default createQuiz;