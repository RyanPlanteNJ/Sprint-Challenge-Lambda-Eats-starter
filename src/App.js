import React from "react";
import { Route, Link } from 'react-router-dom';
import PizzaForm from './components/PizzaForm';
import Home from "./components/Home";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <nav>
        <h1>The Pizza Shop</h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to ="/pizza">Order</Link>
        </div>
      </nav>
      <Route exact path = "/" component={Home} />
      <Route exact path ="/pizza" component={PizzaForm} />
      </div>
  );
};
export default App;
