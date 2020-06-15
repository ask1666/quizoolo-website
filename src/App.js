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
import DisplayYourQuiz from './Views/DisplayYourQuiz';

function App() {
  
  
  //console.log(username);
  return (
    <div>

      <Router>

      

      <Switch>
        <Route exact path="/" >
        <Header />              {/* Header needs to be inside because username in header needs to change upon sessionstorage change. */}
          <h1>home</h1>
        </Route>

        <Route path="/loginPage">
        <Header />
          <Login />
        </Route>

        <Route path="/createUserPage">
        <Header />
          <CreateUser />
        </Route>

        <Route path="/createQuizPage">
        <Header />
          <CreateQuiz />
        </Route>

        <Route path="/displayYourQuiz">
        <Header />
          <DisplayYourQuiz />
        </Route>
        
        <Route path="/aboutPage">
        <Header />
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
