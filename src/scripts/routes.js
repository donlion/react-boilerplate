import React, {Component} from 'react';
import {
    IndexRoute,
    Route,
    Router,
    browserHistory
} from 'react-router';
import App from './components/App';

export class RouteContainer extends Component {
    render() {
        console.log('RouteContainer', this.props);
        return this.props.children;
    }
}

export default (
    <Router history={browserHistory}>
        <Route path="/">
            <IndexRoute
                name="home"
                component={App} />
        </Route>
    </Router>
);
