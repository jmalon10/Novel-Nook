// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Homepage.tsx';
import Logout from './components/Logout.tsx';

const App: React.FC = () => {
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

