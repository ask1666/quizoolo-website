import React from 'react'
import { withRouter } from 'react-router';

class PlayQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.questions = this.props.location.state.questions;
        this.NrOfQuestions = this.props.location.state.questions.length;
        this.NrOfSuccess = 0;
        this.currentQuestion = "";
        this.state = {
            getNewQuestion: 0,
            NrOfSuccess: 0
        }
        this.getQuestion = true;
        this.selectedAnswer = "";
        
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
    }

    getRandomQuestion = () => {
        if (this.getQuestion) {
            if (this.questions.length > 0) {
                this.shuffle(this.questions);
                const question = this.questions[0];
                this.currentQuestion = question;
                this.questions.shift();
                this.getQuestion = false;
                return this.displayQuestion(question);
            } else 
                return this.showScoreScreen();
        } else {
            return this.displayQuestion(this.currentQuestion);
        }

    }

    showScoreScreen = () => {
        return (
        <div
            className="pt-5 h-full text-center bg-blue-400">
            <h1 className="text-xl font-bold pb-5">
                You got {this.NrOfSuccess}/{this.NrOfQuestions} points!
            </h1>
            <div className="flex flex-wrap w-full items-center p-20 justify-center bg-blue-400">
                <button 
                    onClick={this.props.history.goBack}
                    className="bg-green-500 hover:bg-green-700 text-white text-center font bold py-2 px-4 rounded"
                >
                    Back
                </button>
                
            </div>
        </div>
        );
    }

    checkAnswer = () => {
        if ( this.selectedAnswer.value !== undefined) {
            if (this.selectedAnswer.value === this.currentQuestion.rightAnswer) {
                this.selectedAnswer.style.border = "2px solid #00FF00";
            } else {
                this.selectedAnswer.style.border = "3px solid red";
            }
        } else {
            alert("You have not selected an answer!");
        }
    }

    selectAnswer = (event) => {
        let element = event.target;
        if (element.style.border !== "2px solid black" && this.selectedAnswer === ("")) {
            this.selectedAnswer = element;
            element.style.border = "2px solid black";
        } else if (this.selectedAnswer.value === element.value) {
            element.style.border = "none";
            this.selectedAnswer = ("");
        }
    }

    displayQuestion = (question) => {
        let answers = question.falseAnswers;
        if (!answers.includes(question.rightAnswer))
            answers.push(question.rightAnswer);
        this.shuffle(answers);
        return (
            <div className="pt-5 h-full text-center bg-blue-400 ">
                <h1 className="text-xl font-bold pb-5">
                    {question.question}
                </h1>
                <div className="bg-blue-400 items-center p-3">
                    <h1 className="">
                        Choose one of the following answers:
                    </h1>
                    <div className="flex flex-wrap w-full items-center p-20 justify-center bg-blue-400">
                        {answers.map( answer => 
                            <div className=" p-3" key={answer}> 
                                <button 
                                    onClick={this.selectAnswer}
                                    value={answer}
                                    className="bg-yellow-500 hover:bg-yellow-700 text-blue-600 text-center font-bold py-2 px-4 rounded" >
                                        {answer}
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap w-full items-center justify-center">
                            <div className="p-5">
                                <button 
                                    onClick={this.checkAnswer}
                                    className=" bg-green-500 hover:bg-green-700 text-white text-center font bold py-2 px-4 rounded">
                                        Check Answer
                                </button>
                            </div>
                            <div className="p-5">
                                <button 
                                    onClick={() => {
                                        if (this.selectedAnswer.value !== undefined) {
                                            this.setState({getNewQuestion: Math.random()});
                                            this.getQuestion = true;
                                            if (this.currentQuestion.rightAnswer === this.selectedAnswer.value) {
                                                this.NrOfSuccess++;
                                            }
                                            this.selectedAnswer = "";
                                            
                                        } else {
                                            alert("You have not selected an answer!");
                                        }
                                        
                                    }}
                                    className=" bg-green-500 hover:bg-green-700 text-white text-center font bold py-2 px-4 rounded">
                                        Next
                                </button>
                            </div>
                    </div>
                </div>
                
            </div>
        );
    }

    render() {
        return(
            this.getRandomQuestion()
        )
    }
}

export default withRouter(PlayQuiz);