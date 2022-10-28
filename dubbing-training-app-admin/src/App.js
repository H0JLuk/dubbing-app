import { Redirect, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'

import Login from './pages/Login'
import PrivateRoute from './wrappers/PrivateRoute'

  function App() {
  return (
    <>
      <Switch>
        <Route path='/login'>
          <Login />
        </Route>

        <PrivateRoute exact path='/'>
          <Home />
        </PrivateRoute>

        <Redirect to='/' />
      </Switch>
    </>
  );
}

export default App;
