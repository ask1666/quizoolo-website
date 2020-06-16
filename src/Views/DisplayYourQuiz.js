import React from 'react'
import Axios from 'axios';
import DeleteQuizBtn from '../Components/DeleteQuizBtn'

import {
    Link
  } from "react-router-dom";


class displayYourQuiz extends React.Component {
constructor(props) {
    super(props)
    
    this.state = {
        quiz: [],
        deleted: true
    }

    
}
    updateDeleted = (bool) => {
        this.setState({deleted: bool})
    };

    
    getQuiz() {
        if (this.state.deleted) {
            Axios.get('http://localhost:3000/userActions/getYourQuiz',
                {headers: {authToken: sessionStorage.getItem('authToken')}})
                .then(res => {
                    this.setState({quiz: res.data, deleted: false});
                    //console.log(this.state.quiz);
                })
                .catch(err => {

                });
        }
    }
    


    render () {
        this.getQuiz();
        return (
            <ul className="">
                
        {this.state.quiz.map(quiz  => <li key={quiz._id} className=" flex flex-row content-start border-b-2 border-black border-opacity-25 ">
            
            <Link  className="  text-center pb-3 pt-3  bg-orange-400 w-11/12" to={{pathname: `/displayQuiz/`, state:{quizId: quiz._id}}}>
                    {quiz.quizName}
            </Link>
            <DeleteQuizBtn updateDeleted={this.updateDeleted} deleted={this.state.deleted} quiz={quiz} quizName={quiz.quizName}/>
            </li>)}
                
            </ul>
        )
    }

    
}

export default displayYourQuiz;