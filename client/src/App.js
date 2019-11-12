import React from 'react';
import { Route, NavLink } from "react-router-dom";
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Users from './components/Users';

function App() {
  
  return (
    <div className="App">
      <NavLink to='/login' >Login</NavLink>
      <NavLink to='/users' >GetUsers</NavLink>

      <Route exact path='/' component={Register} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/users' component={Users} />
    </div>
  );
}





export default App;
