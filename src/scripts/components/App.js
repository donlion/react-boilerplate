import React, {
    Component
} from 'react';
import {observer} from 'mobx-react';
// Devtool
import DevTools, {configureDevtool} from 'mobx-react-devtools';
// Store
import AppStore from './App.store.js';

configureDevtool({
    logEnabled: true
});

@observer
export default class App extends Component {
    constructor() {
        super();

        this.store = new AppStore({
            title: 'Homepage'
        });
    }

    componentDidMount() {
        setTimeout(() => {
            this.store.updateTitle('Frontpage');
        }, 2000);
    }

    render() {
        const {title} = this.store;

        return (
            <div>
                {global.window && (
                    <DevTools />
                )}
                <h1>{title}</h1>
            </div>
        );
    }
}
