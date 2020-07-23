import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router';
import DeleteQuestionBtn from '../Components/DeleteQuestionBtn'
import QuestionForm from '../Components/QuestionForm';

import {
    Link
  } from "react-router-dom";

class DisplayQuiz extends React.Component {

    state = {
        quiz: {},
        questions: [],
        questionChangedStatus: true,
        toggleQuestionForm: false,
        username: null
    }

    addQuestionBtn = (
        <button onClick={() => this.setState({ toggleQuestionForm: true })}
            className="bg-blue-500 hover:bg-blue-700 rounded text-white font-bold py-2 px-1">
            Add a Question
        </button>
    );

    handleQuestionChange = (bool) => {
        this.setState({ questionChangedStatus: bool });
    }


    handleQuestionFormToggle = (bool) => {
        this.setState({toggleQuestionForm: bool});
    }



    componentDidMount() {
        
        Axios.post('http://localhost:3000/userActions/getQuiz', {
            quizId: this.props.location.state.quizId
        })
            .then(res => {
                this.setState({ quiz: res.data });

                Axios.get('http://localhost:3000/userActions/getUserById', {
                    params: {
                        userid: this.state.quiz.creator
                    }
                })
                .then (res2 => {
                    this.setState({username: res2.data.username});
                })
                .catch(err2 => {
                    console.log(err2);
                })
            })
            .catch(() => {
                
            });
        
    }

    loadQuestions() {
        if (this.state.questionChangedStatus) {
            Axios.post('http://localhost:3000/userActions/getYourQuestions', 
            {quizName: this.props.location.state.quizName,
            userid: this.props.location.state.creator },
            { headers: { authToken: sessionStorage.getItem('authToken') } })
                .then(res => {
                    this.setState({ questionChangedStatus: false, questions: res.data });
                    
                })
                .catch(() => {
                    
                });
            
        }
    }

    addBtnIfNotExistElseAddForm() {
        if (!this.state.toggleQuestionForm)
            return this.addQuestionBtn;
        else
            return <QuestionForm handleQuestionFormToggle={this.handleQuestionFormToggle} handleQuestionChange={this.handleQuestionChange} quizName={this.state.quiz.quizName} />;
    }
    
    printQuestions() {
        if (this.state.questions !== undefined) {
            if (sessionStorage.getItem('userid') === this.props.location.state.creator) {
                return <div>
                 
                 {this.state.questions.map(question => <li key={question.question} className="flex flex-row justify-center ">
                        
                        <div className=" py-3 w-full flex justify-center">
                            <div className=" bg-gray-300 shadow-xl px-3 py-3 md:w-3/12 w-9/12 text-center ">
                                <h1>{question.question ? question.question : ''}</h1>
                            </div>
                            <DeleteQuestionBtn handleQuestionChange={this.handleQuestionChange} question={question.question} quizName={this.state.quiz.quizName} />
                        </div>    
                    
                    </li>)}
                </div>
            } else return this.state.questions.map(question =>
                <li key={question.question} className="flex flex-row justify-center">
                    <h1 className=" flex text-center justify-center py-3 w-full">
                        {question.question ? question.question : ''}
                    </h1>
                    
                </li>
            );
        } else {
            return <h1 className="text-center p-2"> You have no questions.</h1>
        }
    }




    render() {
        this.loadQuestions();
        return (
            <div className=" pt-5 text-center ">
                <h1 className="text-4xl p-5 text-center underline font-bold">{this.state.quiz.quizName}</h1>
                <h1 className="text-lg pb-5 text-center ">Created by {this.state.username}</h1>
                <div className="pb-2">
                    <h1 className="text-2xl p-3 text-center font-bold">Questions:</h1>
                    <ul>
                        {this.printQuestions()}
                    </ul>
                    <div className="p-5">
                        {(sessionStorage.getItem('userid') === this.props.location.state.creator)?this.addBtnIfNotExistElseAddForm():''}
                    </div>
                </div>
                <div className="p-5 ">
                    <Link to={{pathname: `/playQuiz/`, state:{questions: this.state.questions}}}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Play Quiz
                    </Link>
                </div>
            </div>

        )
    }
}

export default withRouter(DisplayQuiz);