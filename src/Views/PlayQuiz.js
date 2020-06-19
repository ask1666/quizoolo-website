import React from 'react'
import { withRouter } from 'react-router';

class PlayQuiz extends React.Component {
    constructor(props) {
        super(props);
        this.questions = this.props.location.state.questions;
        this.NrOfSuccess = 0;
        
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
        if (this.questions.length > 0) {
            this.shuffle(this.questions);
            const question = this.questions[0];
            this.questions.shift();
            return this.displayQuestion(question);
        } else 
            return <h1>placeholder</h1>;

    }

    displayQuestion = (question) => {
        let answers = question.falseAnswers;
        answers.push(question.rightAnswer);
        this.shuffle(answers);
        console.log(answers);
        return (
            <div className="container">
                <h1>
                    {question.question}
                </h1>
                <div className="flex flex-wrap">
                    {answers.map( answer => 
                        <div className=" p-3" key={answer}>
                            <button className="bg-green-500 hover:bg-green-700 text-white text-center font-bold py-2 px-4 rounded" >
                                {answer}
                            </button>
                        </div>
                    )}
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