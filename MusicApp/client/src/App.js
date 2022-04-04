
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
function App() {
  return (
    <Router>
       <Switch>
          <Route exact path="/home/:id">

            <Home />
          </Route>
          <Route exact path="/">
            <Login></Login>
           
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
  </Router>
  )
}

export default App;
