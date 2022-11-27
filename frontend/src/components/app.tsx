import { h } from 'preact';
import { Route, Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from 'routes/home';
import ProjectView from 'routes/project/view';
import ProjectCreate from 'routes/project/create';
import ProjectUpdate from 'routes/project/update';
import Profile from 'routes/profile';
import ProfileUpdate from 'routes/profile/update';
import UserView from 'routes/profile/view';
import Login from 'routes/login';

const App = () => (
  <div id="app">
    <Header />
    <Router>
      <Route path="/" component={Home} />
      <Route path="/project/create" component={ProjectCreate} />
      <Route path="/project/:projectid" component={ProjectView} />
      <Route path="/project/:projectid/update" component={ProjectUpdate} />

      <Route path="/profile/" component={Profile} />
      <Route path="/profile/update" component={ProfileUpdate} />
      <Route path="/profile/:userid" component={UserView} />

      <Route path="/login" component={Login} />
    </Router>
  </div>
);

export default App;
