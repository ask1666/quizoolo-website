import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';

class deleteQuestionBtn extends React.Component {
    state = {
        quizName: this.props.quizName,
        question: this.props.question
    }

    handleQuestionChange = (bool => {
        this.props.handleQuestionChange(bool)
    })

    render() {

        return (
            <button onClick={() => { this.handleDelete(this.state.quizName, this.state.question) }}  className=" flex h-auto w-2/12 text-center justify-center">
                    <FontAwesomeIcon  className="fa-lg self-center"
                        icon={faTrash}

                    />
            </button>
        )
    }

    handleDelete(quizName, question) {
        Axios.delete('http://localhost:3000/userActions/deleteQuestion', {
            data: {quizName: quizName, question: question}, headers: {authToken: sessionStorage.getItem('authToken')}
        })

            .then(res => {
                this.handleQuestionChange(true);
            })
            .catch(err => {
                console.log(err);
            });
    }

}

export default deleteQuestionBtn;