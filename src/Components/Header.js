import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';

class Header extends React.Component {

    
    render() {
        return (
            <header className="border-b-2 p-3 flex justify-between items-center border-opacity-25 border-black">
                <Navigation />

                <span className=" font-bold ">
                    Quizoolo
            </span>
                <span className=" font-bold" >
                    {sessionStorage.getItem('username') ? sessionStorage.getItem('username') : sessionStorage.getItem('username')}
                </span>

            </header>
        )
    }
}



export default Header;