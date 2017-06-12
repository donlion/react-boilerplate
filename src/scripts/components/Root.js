import React, {Component} from 'react';
// Components
import Route from '../routes.js';
import {store} from '../mobx-store/dist/index';

global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

export default class Root extends Component {
    constructor(props) {
        super(props);

        if (props.store) {
            console.log('setting store', props.store);
            store.setStore(props.store);
            console.log('sat store', store.store);
        }
    }

    render() {
        const {
            children,
            store,
            renderProps
        } = this.props;

        return (
            <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>React boilerplate</title>
                <link rel="stylesheet" href="/css/app.css" />
            </head>
            <body>
            <div id="root">
                {children || <App />}
            </div>
            {store && (
                <script
                    type="text/javascript"
                    dangerouslySetInnerHTML={{__html: `
                        window._mobx_store = ${JSON.stringify(store)};`
                    }} />
            )}
            {renderProps && (
                <script
                    dangerouslySetInnerHTML={{__html: `
                        window.renderProps = ${JSON.stringify(renderProps)};
                        `}}/>
            )}
            <script src="/js/app.js" defer="defer" type="text/javascript"></script>
            </body>
            </html>
        );
    }
}
