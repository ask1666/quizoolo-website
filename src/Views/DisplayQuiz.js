import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router';
import DeleteQuestionBtn from '../Components/DeleteQuestionBtn'
import QuestionForm from '../Components/QuestionForm';

class DisplayQuiz extends React.Component {

    state = {
        quiz: {},
        questions: [],
        questionChangedStatus: true,
        toggleQuestionForm: false
    }

    addQuestionBtn = (
        <button onClick={() => this.setState({ toggleQuestionForm: true })}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
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
            })
            .catch(err => {
                console.log(err);
            });
        
    }

    loadQuestions() {
        if (this.state.questionChangedStatus) {
            Axios.post('http://localhost:3000/userActions/getYourQuestions', 
            {quizName: this.props.location.state.quizName},
            { headers: { authToken: sessionStorage.getItem('authToken') } })
                .then(res => {
                    this.setState({ questionChangedStatus: false, questions: res.data });
                })
                .catch(err => {
                    console.log(err);
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
            return this.state.questions.map(question =>
                <li key={question.question} className="flex flex-row content-start">
                    <h1 className="text-center pb-3 pt-3 w-11/12 ">
                        {question.question ? question.question : ''}
                    </h1>
                    <DeleteQuestionBtn handleQuestionChange={this.handleQuestionChange} question={question.question} quizName={this.state.quiz.quizName} />
                </li>
            );
        } else {
            return <h1 className="text-center p-2"> You have no questions.</h1>
        }
    }




    render() {
        this.loadQuestions();
        return (
            <div>
                <h1 className="text-4xl p-5 text-center border border-green-400 bg-green-300 font-bold">{this.state.quiz.quizName}</h1>
                <div className=" pt-5 text-center bg-blue-300">
                    <h1 className="text-2xl p-5 text-center font-bold">Questions:</h1>
                    <ul>
                        {this.printQuestions()}
                    </ul>
                    {this.addBtnIfNotExistElseAddForm()}

                </div>
            </div>

        )
    }
}

export default withRouter(DisplayQuiz);