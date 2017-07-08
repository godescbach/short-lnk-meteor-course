import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters'
//const browserHistory = createBrowserHistory();

export default () => {
    return (
        <div>
            <PrivateHeader title={"Short Lnk"} />
            <div className="page-content">
              <LinksListFilters/>
              <AddLink />
              <LinksList />
            </div>           
        </div>
    );
}