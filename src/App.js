import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './Components/Header';
import Login from './Views/Login';
import CreateUser from './Views/CreateUser';
import CreateQuiz from './Views/CreateQuiz';
import DisplayYourQuiz from './Views/DisplayYourQuiz';
import DisplayQuiz from './Views/DisplayQuiz';
import PlayQuiz from './Views/PlayQuiz';
import Home from './Views/Home';

function App() {
  
  
  //console.log(username);
  return (
    <div>

      <Router>

      

      <Switch>
        <Route exact path="/" >
        <Header />              {/* Header needs to be inside because username in header needs to change upon sessionstorage change. */}
          <Home/>
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

        <Route path="/displayQuiz" >
          <Header/>
          <DisplayQuiz/>
        
        </Route>

        <Route path="/playQuiz" >
          <Header/>
          <PlayQuiz/>
        
        </Route>
        
      </Switch>

      </Router>
      {/* <CounterExample/> */}
    </div>
  );
}

export default App;
