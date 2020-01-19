import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import GraphsPage from './pages/GraphsPage';
import Dijkstra from './pages/graphs/Dijkstra';
import logo from './logo.svg';

function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route exact path='/graphs' component={GraphsPage} />
              <Route exact path='/graphs/dijkstra' component={Dijkstra} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;
