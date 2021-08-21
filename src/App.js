import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; // new imports
import Navbar from './components/layout/Navbar';
import Dashboard from './views/app/Dashboard';
import Login from './views/auth/Login'; 
import Logout from './views/auth/Logout';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/login' component={Login} exact />
          <Route path='/logout' component={Logout} exact />
          <Route path='/' component={Dashboard} exact />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

