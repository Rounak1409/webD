import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dijkstra from './pages/graphs/Dijkstra';
import HomePage from './pages/HomePage';
import SearchPage from './pages/search/SearchPage';

function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/graphs' component={Dijkstra} />
              <Route exact path='/search' component={SearchPage} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;
