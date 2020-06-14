import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Components/Header';
import Footer from './Components/Footer';
import Login from './Views/Login';
import CreateUser from './Views/CreateUser';
import CreateQuiz from './Views/CreateQuiz';

function App() {
  let username = localStorage.getItem('username');
  return (
    <div>

      <Router>

      <Header username={username ? username : "username"}/>
      
      <Switch>
        <Route exact path="/">
          <h1>home</h1>
        </Route>

        <Route path="/loginPage">
          <Login />
        </Route>

        <Route path="/createUserPage">
          <CreateUser />
        </Route>

        <Route path="/createQuizPage">
          <CreateQuiz />
        </Route>
        
        <Route path="/aboutPage">
          <h1 className="font-bold text-2xl">This is the about page!</h1>
        </Route>
      </Switch>

      <Footer/>

      </Router>
      {/* <CounterExample/> */}
    </div>
  );
}

export default App;
