import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';

class deleteQuizBtn extends React.Component {
    state = {
        quizName: this.props.quizName,
    }

    updateDeleted = (bool => {
        this.props.updateDeleted(bool)
    })

    render() {

        return (
            <button onClick={() => { this.handleDelete(this.state.quizName) }}  className=" bg-red-400 flex h-auto w-2/12 text-center justify-center">
                    <FontAwesomeIcon  className="fa-2x "
                        icon={faTrash}

                    />
            </button>
        )
    }

    handleDelete(quizName) {
        Axios.delete('http://localhost:3000/userActions/deleteQuiz', {
            data: {quizName: quizName}, headers: {authToken: sessionStorage.getItem('authToken')}
        })

            .then(res => {
                this.updateDeleted(true);
            })
            .catch(err => {

            });
    }

}

export default deleteQuizBtn;