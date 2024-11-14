// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Logout from './components/Logout';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          {/* Home Page Route */}
          <Route exact path="/" component={Home} />
          
          {/* Logout Page Route */}
          <Route path="/logout" component={Logout} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
