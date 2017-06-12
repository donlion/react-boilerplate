import React, {
    Component
} from 'react';
import request from 'axios';
import {connect} from '../mobx-store/dist/index';
// Store
import AppStore from './App.store.js';
// Components
import Post from './Post';
// Dev
import DevTools from 'mobx-react-devtools';

@connect
export default class App extends Component {
    static fetchData() {
        return request.get('http://google.com')
            .catch(() => {})
            .then(() => ({
                visitedGoogle: 'yes'
            }));
    }

    render() {
        const {store} = this.props;

        return (
            <div>
                {/*<DevTools />*/}
                {store && store.title && <h1>{store.title}</h1>}

                <Post query="dog" />
                <Post query="cat" />
            </div>
        );
    }
}
