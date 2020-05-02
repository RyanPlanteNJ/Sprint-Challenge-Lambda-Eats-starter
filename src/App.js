import React from "react";
import { Route } from 'react-router-dom';
import PizzaFrom from './components/PizzaForm'

const App = () => {
  return (
    <div>
      <Route exact path = "/">
        <PizzaForm />
      </Route>
    </div>
  );
};
export default App;
