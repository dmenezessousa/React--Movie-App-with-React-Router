import React from "react";
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";

import "./App.css";
import Movie from "./components/Movie/Movie";
import MovieDetail from "./components/Movie/MovieDetail";

function App() {
    return (
      <div className="App" style={{backgroundColor: "#252525"}}>
          <Router>
            <Switch>
              <Route exact path="/movie-detail/:name" component={MovieDetail}/>
              <Route exact path="/" component={Movie}/>
              <Route render={()=><h1>Not Found 404</h1>}/>
            </Switch>
          </Router>
      </div>
    );
};

export default App;
