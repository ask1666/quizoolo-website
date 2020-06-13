import React from 'react';
import Navigation from './Navigation';

function Header(props) {
    return (
        <header className="border-b-2 p-3 flex justify-between items-center border-opacity-25 border-black">
            <Navigation/>
            
            <span className=" font-bold ">
                Quizoolo
            </span>
            <span className=" font-bold">
                {props.username}
            </span>

        </header>
    )
}

export default Header;