import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Home from './Home';
import Secret from './Secret';
import Login from './Login';
import withAuth from './withAuth';


class App extends Component{
  render() {
    return (
      <Router>
        <div>
         <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/secret'>Secret</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>    
          </li>
         </ul>  
          <Route  path='/' exact component={Home}/>
          <Route path='/secret' component={withAuth(Secret)}/>
          <Route path='/login' component={Login}/>
        </div>
      </Router>
    )
  }
}

export default App;
