import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Favorites from './pages/Favorites';

class App extends React.Component {
  render() {
    return (
      <div className="Container">
        <p>TrybeTunes</p>
        <BrowserRouter>
          <Switch>
            <Route path="/profile/edit">
              <ProfileEdit />
            </Route>

            <Route path="/profile">
              <Profile />
            </Route>

            <Route path="/favorites">
              <Favorites />
            </Route>

            <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />

            <Route path="/search" render={ (props) => <Search { ...props } /> } />

            <Route path="/" exact>
              <Login />
            </Route>

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
