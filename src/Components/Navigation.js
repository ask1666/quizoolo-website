import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useTransition, animated } from 'react-spring';
import {
    
    Link
  } from "react-router-dom";

function Navigation() {
    const [showMenu, setShowMenu] = useState(false);

    const maskTransitions = useTransition(showMenu, null, {
        from: { position: 'absolute', opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    })

    const menuTransitions = useTransition(showMenu, null, {
        from: { opacity: 0, transform: 'translateX(-100%)' },
        enter: { opacity: 1, transform: 'translateX(0%)' },
        leave: { opacity: 0, transform: 'translateX(-100%)' },
    })


    return (
        <nav>
            <span className="text-xl text-red-700">
                <FontAwesomeIcon
                    icon={faBars}
                    onClick={() => setShowMenu(!showMenu)}
                />
            </span>

            {
                maskTransitions.map(({ item, key, props }) =>
                    item &&
                    <animated.div
                        key={key}
                        style={props}
                        className="bg-black-t-50 fixed top-0 left-0 w-full h-full z-50"
                        onClick={() => setShowMenu(false)}
                    >

                    </animated.div>
                )
            }

            {
                menuTransitions.map(({ item, key, props }) =>
                    item &&
                    <animated.div
                        key={key}
                        style={props}
                        className="fixed bg-white top-0 left-0 w-1/5 h-full z-50 shadow p-3 bg-orange-300"
                    >
                        <span className="font-bold">
                            Menu
                        </span>
                        <ul>
                            <li className="pt-2">
                                <Link onClick={() => setShowMenu(false)} to="/" className="  bg-green-500 text-center hover:bg-green-700 px-2 text-white py-3 block" >Home</Link>
                            </li>
                            <li className="pt-2">
                                <Link onClick={() => setShowMenu(false)} to="/aboutPage" className="  bg-green-500 hover:bg-green-700 px-2 text-center text-white py-3 block">About</Link>
                            </li>
                            <li className="pt-2">
                                <Link onClick={() => setShowMenu(false)} to="/loginPage" className="  bg-green-500 hover:bg-green-700 px-2 text-center text-white py-3 block">Login</Link>
                            </li>
                            <li className="pt-2">
                                <Link onClick={() => setShowMenu(false)} to="/createUserPage" className="  bg-green-500 hover:bg-green-700 px-2 text-center text-white py-3 block">Create User</Link>
                            </li>
                            <li className="pt-2">
                                <Link onClick={() => setShowMenu(false)} to="/createQuizPage" className="  bg-green-500 hover:bg-green-700 px-2 text-center text-white py-3 block">Create Quiz</Link>
                            </li>
                            <li className="pt-2">
                                <Link onClick={() => setShowMenu(false)} to="/displayYourQuiz" className="  bg-green-500 hover:bg-green-700 px-2 text-center text-white py-3 block">My quiz</Link>
                            </li>
                        </ul>
                    </animated.div>
                )
            }
        </nav>
    )
}

export default Navigation;