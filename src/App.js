import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dijkstra from './pages/graphs/Dijkstra';

function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route exact path='/graphs' component={Dijkstra} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;
