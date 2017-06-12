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

class Dummy extends Component {
    render() {
        return (<h1>Dummy</h1>);
    }
}

export default (
    <Router history={browserHistory}>
        <Route path="/">
            <IndexRoute
                name="home"
                component={App} />

            <Route
                path="/dummy"
                component={Dummy} />
        </Route>
    </Router>
);
