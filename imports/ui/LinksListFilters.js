import  { Meteor } from 'meteor/meteor';
import React from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

export default class LinksListFilters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showVisible: true
    }
  }

  componentDidMount() {
    this.linksListFiltersTracker = Tracker.autorun(() => {
      this.setState({ showVisible: Session.get('showVisible')})        
    });
  }

  componentWillUnmount() {
    this.linksListFiltersTracker.stop();
  }

  render() {
    return (
      <div>
        <label className="checkbox">
          <input className="checkbox__box" type="checkbox" checked={!this.state.showVisible} onChange={(event) => {
            console.log('event.target.checked = ', event.target.checked);
            Session.set('showVisible', !event.target.checked);
          }}/>
          show hidden links
        </label>
      </div>);
  }

};