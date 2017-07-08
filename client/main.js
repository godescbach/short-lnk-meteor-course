import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { routes, onAuthChange } from '../imports/routes/routes';
import '../imports/startup/simple-schema-configuration.js';
import { Links } from '../imports/api/links';

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

// Session.set('name', 'Tom Mostyn');
// const name = Session.get('name')
// console.log('Name: ', name);

// Call tracker.autorun
// fetch all links using find method
// print links to console using console.log

/*// Stateless functional component
import React from 'react';
const MyComponent = (props) => {
  return (
    <div>
      <h1>MyComponent is here!{props.name}</h1>
    </div>
  );
}*/

Meteor.startup(() => {
  // Meteor.call('greetUser', (err, res) => {
  //   console.log('Greet User Arguments', err, res);
  // });
  // Meteor.call('addNumbers', 2, 3, (err, res) => {
  //   console.log('Add Numbers Arguments', err, res);
  // });
  Session.set('showVisible', true);
  ReactDOM.render(routes, document.getElementById('app'));
});