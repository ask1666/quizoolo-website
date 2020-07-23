import React from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';

class Home extends React.Component {
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
                Axios.get('http://localhost:3000/userActions/getAllQuiz')
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
                <div className="pt-3 flex justify-center w-full">
                    <ul className="w-full md:w-8/12">
                            
                        {this.state.quiz.map(quiz  => <li key={quiz._id} className=" flex py-1 ">
                            
                            <Link  className="  text-center font-bold pb-3 pt-3 w-full shadow-xl bg-gray-300 hover:bg-gray-400" to={{pathname: `/displayQuiz/`, state:{quizName: quiz.quizName, quizId: quiz._id, creator: quiz.creator}}}>
                                    <p>{quiz.quizName}</p>
                            </Link>
                            
                        </li>)}
                            
                    </ul>
                </div>
            )
        }
    
}

export default Home;