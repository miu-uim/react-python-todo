import React from 'react';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';

import TodoList from './TodoList.js';
import Navi from './Navi.js';
import Update from './Update.js';

const App = () => {

  return(
    <React.Fragment>
      <Router>
        <Navi />
        <Switch>
          <Route path='/update/:Id' exact component={Update}/>
          <Route path='/'component={TodoList} />
            <Update/>
        </Switch>
      </Router>
    </React.Fragment>
  )
}
export default App;
