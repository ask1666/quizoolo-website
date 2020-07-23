import React from 'react';
import Axios from 'axios';
import {
    Redirect,
} from "react-router-dom";
import { withRouter } from 'react-router';

class createQuiz extends React.Component {
    state = {
        quizName: '',
        quizId: '',
        createQuizStatus: false,
        createQuizFeedback: '',
        validation: '',
    };

    handleQuizNameChange = event => {
        this.setState({ quizName: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const quizName = this.state.quizName;


        Axios.put('http://localhost:3000/userActions/createQuiz', {
            quizName: quizName
        },
            { headers: { authToken: sessionStorage.getItem('authToken') } })
            .then(res => {
                this.setState({ createQuizStatus: true , quizId: res.data});
            })
            .catch(err => {
                console.log(err);
                this.setState({ createQuizFeedback: err.res ? err.res : err.message });
            });

    }

    render() {
        if (this.state.createQuizStatus) {
            return <Redirect to={{pathname: `/displayQuiz/`, state:{quizId: this.state.quizId}}} />
        }
        return (
            <div className=" flex justify-center pt-10">

                <form onSubmit={this.handleSubmit} className=" shadow-2xl rounded-lg border-4 border-gray-400 px-8 pt-6 pb-8 mb-4 ">
                    <h1 className="font-bold text-2xl p-5 text-center">
                        Choose a name for your Quiz!
                    </h1>
                    <div className="mb-6">
                        <input onChange={this.handleQuizNameChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Quiz name" pattern=".{3,}" required />
                        <p className="text-red-500 text-xs italic">
                            {this.state.createQuizFeedback}
                            {this.state.validation}
                        </p>
                    </div>
                    <div className="flex items-center justify-center">
                        <button className=" pr-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Create Quiz
                        </button>

                    </div>
                </form>

            </div>
        )
    }
}


export default withRouter(createQuiz);