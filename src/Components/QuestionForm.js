import React, {useState} from 'react'
import Axios from 'axios';


function QuestionForm(props)  {

    const [question,setQuestion] = useState(0);
    const [rightAnswer, setRightAnswer] = useState(0);
    const [falseAnswers, setFalseAnswers] = useState(0);

    function handleQuestionChange(bool) {
        props.handleQuestionChange(bool);
    }

    function handleQuestionFormToggle(bool) {
        props.handleQuestionFormToggle(bool);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const quizName = props.quizName;

        Axios.put('http://localhost:3000/userActions/addQuestion', {
            quizName: quizName,
            question: question,
            rightAnswer: rightAnswer,
            falseAnswer: falseAnswers,
        },
            { headers: { authToken: sessionStorage.getItem('authToken') } })
            .then(res => {
                handleQuestionChange(true);
                handleQuestionFormToggle(false);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return(
        <div className="container mx-auto max-w-xs flex justify-center bg-gray-400">
            <form onSubmit={(event) => handleSubmit(event)} className="w-full max-w-sm p-5">
                <div className=" md:items-center mb-6">
                    <div className="">
                        <label className="block text-black-500 font-bold t mb-1  pr-4" htmlFor="inline-full-name">
                            Question
                        </label>
                    </div>
                    <div className="">
                        <input onChange={(event) => setQuestion(event.target.value)}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="text" placeholder="What color is the sky?" required/>
                    </div>
                </div>
                <div className=" md:items-center mb-6">
                    <div className="">
                        <label className="block text-black-500 font-bold  mb-1  pr-4" htmlFor="inline-username">
                            Right answer
                        </label>
                    </div>
                    <div className="">
                        <input onChange={(event) => setRightAnswer(event.target.value)}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            type="text" placeholder="Blue..." required/>
                    </div>
                </div>
                <div className=" md:items-center mb-6">
                    <div className="">
                        <label className="block text-black-500  mb-1  pr-4">
                            <b>False answers</b>
                        </label>
                        
                    </div>
                    <div className=" pb-1">
                        <textarea onChange={(event) => setFalseAnswers(event.target.value.split(","))}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="falseAnswers" type="text" placeholder="Gray,Red,Green,..." required/>
                    </div>
                    
                </div>
                <div className=" md:items-center">
                    <div className="">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            type="submit">
                            Create Question
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default QuestionForm;