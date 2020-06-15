import React from 'react'
import Axios from 'axios';
import DeleteQuizBtn from '../Components/DeleteQuizBtn'
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";

class displayYourQuiz extends React.Component {

    state = {
        quiz: []
    }

    componentDidMount() {
        Axios.get('http://localhost:3000/userActions/getYourQuiz',
            {headers: {authToken: sessionStorage.getItem('authToken')}})
            .then(res => {
                this.setState({quiz: res.data})
            })
            .catch(err => {

            });
            
    }

    render () {
        return (
            <ul className="">
                
        {this.state.quiz.map(quiz  => <li key={quiz._id} className=" flex content-start border-b-2 border-black border-opacity-25">
            
            <Link  className="block w-4/5 text-center p-3 " to="/">{quiz.quizName}</Link>
            <DeleteQuizBtn/>
            </li>)}
                
            </ul>
        )
    }

}

export default displayYourQuiz;