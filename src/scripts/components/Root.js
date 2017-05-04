import React, {Component} from 'react';
import rehydrate from '../mobx-store/src/hydration/rehydrate';
// Components
import Route from '../routes.js';

global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

export default class Root extends Component {
    render() {
        const {
            children,
            store
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
            <script src="/js/app.js" defer="defer" type="text/javascript"></script>
            </body>
            </html>
        );
    }
}
