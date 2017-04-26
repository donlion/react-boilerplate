import React from 'react';
import {
    IndexRoute,
    Route,
    Router,
    browserHistory
} from 'react-router';
import App from './components/App';

export default (
    <Router history={browserHistory}>
        <Route path="/">
            <IndexRoute
                name="home"
                component={App} />
        </Route>
    </Router>
);
