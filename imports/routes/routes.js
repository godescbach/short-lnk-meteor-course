import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import Login from './../ui/Login';
import Signup from './../ui/Signup';
import Link from './../ui/Link';
import NotFound from './../ui/NotFound';

//export const browserHistory = createBrowserHistory();

//window.browserHistory = browserHistory;
const unauthenticatedPages = ['/', '/signup', '/signup/'];
const authenticatedPages = ['/links', '/links/'];

const onEnterPublicPage = () => {
  console.log('In onEnterPublicPage.');
  if(!!Meteor.userId()) {
    browserHistory.replace('/links');
    console.log('In onEnterPublicPage and pushed "/links".');
  }
};

const onEnterPrivatePage = () => {
  if(!Meteor.userId()) {
    browserHistory.replace('/');
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  // if on unauthenciated page and user is logged in then redirect to links
    // browserHistory.push
  // if on authenticated page and not logged in then redirect to /
    // browserHistory.push
  // No else
  if (isUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/links');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
  console.log('isAuthenticated', isAuthenticated);
};

export const routes = (
  <Router history={browserHistory}>
    {/*<Switch>*/}
      <Route path="/" onEnter={onEnterPublicPage} component={Login}/>
      <Route path="/signup" onEnter={onEnterPublicPage} component={Signup}/>
      <Route path="/links" component={Link} onEnter={onEnterPrivatePage}/>
      <Route path="*" component={NotFound} />
    {/*</Switch>*/}
  </Router>
);
