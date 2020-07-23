import React from 'react'
import {Link} from 'react-router-dom'

function Navigation2() {
    return (
        <div className="flex w-full justify-center">
            
                <Link
                 to="/" className=" text-white bg-blue-500 hover:bg-blue-700 shadow-xl text-center w-2/12 py-3 " >Home/Quiz</Link>
                <div className="px-1"/>
                <Link
                 to="/loginPage" className=" text-white bg-blue-500 hover:bg-blue-700 shadow-xl w-2/12 text-center texb-black py-3 ">Login</Link>
                <div className="px-1"/>
                <Link
                 to="/createQuizPage" className=" text-white bg-blue-500 hover:bg-blue-700 shadow-xl w-2/12 text-center texb-black py-3 ">Create Quiz</Link>
                <div className="px-1"/>
                <Link
                 to="/displayYourQuiz" className=" text-white bg-blue-500 hover:bg-blue-700 shadow-xl w-2/12 text-center texb-black py-3 ">My Quiz</Link>
            
        </div>
    );
}

export default Navigation2