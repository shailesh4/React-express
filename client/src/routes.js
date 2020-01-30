import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './containers/Home';
import ModifyBook from './containers/ModifyBook';


export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/add" exact component={ModifyBook} />
      <Route component={Home} />
    </Switch>
  );
}