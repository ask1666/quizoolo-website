import React from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router';

class DisplayQuiz extends React.Component {

    state = {
        quiz: {},
        load: true
    }

    updateLoad = (bool) => {
        this.setState({load: bool})
    };

    loadQuiz() {
        if (this.state.load) {
            Axios.post('http://localhost:3000/userActions/getQuiz', {
                    quizId: this.props.location.state.quizId
            })
                .then(res => {
                    this.setState({load: false, quiz: res.data});
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    render () {
        this.loadQuiz();
        return (
            <ul >
                <li className="w-full">
                    <h1 className="text-2xl p-5 text-center font-bold">{this.state.quiz.quizName}</h1>
                </li>
            </ul>
            
        )
    }
}

export default withRouter(DisplayQuiz);