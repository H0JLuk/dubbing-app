
import { Redirect, Switch, Route } from 'react-router-dom'

import UserPlayer from './pages/UserPlayer'
import UserLogin from './pages/UserLogin'
import PrivateRoute from './wrappers/PrivateRoute'
import WatcherPage from './pages/WatcherPage'

function App() {
  return (
    <>
      <Switch>
        <Route path='/login'>
          <UserLogin />
        </Route>

        <PrivateRoute exact path='/'>
          <UserPlayer />
        </PrivateRoute>

        <PrivateRoute exact path="/session/:id">
          <WatcherPage />
        </PrivateRoute>

        <Redirect to='/login' />
      </Switch>
    </>
  );
}

export default App;
