import React from 'react';
import Navigation from './Navigation';
import Navigation2 from './Navigation2';


class Header extends React.Component {
    state = {
        mobileView: null
    }

    componentDidMount() {
        window.addEventListener("resize", this.resize.bind(this));
        this.resize();
    }
    
    resize() {
        
        if (window.innerWidth <= 768) {
            this.setState({mobileView: true});
        } else {
            this.setState({mobileView: false});
        }
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.resize.bind(this));
    }

    render() {
        if (this.state.mobileView) return (
            <header className="border-b-2 p-3 flex justify-between content-center border-opacity-25 border-black shadow-lg">
                <Navigation/>
                <span className=" font-bold text-blue-500">
                    Quizoolo
                </span>
                
                <span className=" font-bold" >
                    {sessionStorage.getItem('username') ? sessionStorage.getItem('username') : sessionStorage.getItem('username')}
                </span>

            </header>
        );
         else return (
            <div className="flex flex-col border-opacity-25 border-black border-b-2 p-3 shadow-lg">
                <header className=" flex flex-col w-full">
                    
                    <span className="text-center font-bold w-full text-blue-500">
                        Quizoolo
                    </span>
                    <span className="text-right font-bold w-full" >
                        {sessionStorage.getItem('username') ? sessionStorage.getItem('username') : sessionStorage.getItem('username')}
                    </span>

                </header>
                <Navigation2/>
            </div>
        );
    }
}



export default Header;