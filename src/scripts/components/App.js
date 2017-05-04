import React, {
    Component
} from 'react';
import {observer} from 'mobx-react';
// Store
import AppStore from './App.store.js';
// Components
import Post from './Post';
// Dev
import DevTools from 'mobx-react-devtools';

@observer
export default class App extends Component {
    constructor() {
        super();

        this.store = new AppStore({
            title: 'Homepage'
        });
    }
    
    render() {
        const {title} = this.store;

        return (
            <div>
                {/*<DevTools />*/}
                <h1>{title}</h1>

                <Post query="dog" />
                <Post query="cat" />
            </div>
        );
    }
}
