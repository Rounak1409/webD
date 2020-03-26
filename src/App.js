import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import GraphsPage from './pages/graphs/GraphsPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/search/SearchPage';
import SortPage from './pages/sort/SortPage';
import DSPage from './pages/dataStructures/DSPage';

function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route exact path='/' component={HomePage} />
              <Route exact path='/graphs' component={GraphsPage} />
              <Route exact path='/search' component={SearchPage} />
              <Route exact path='/sort' component={SortPage} />
              <Route exact path='/ds' component={DSPage} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;
