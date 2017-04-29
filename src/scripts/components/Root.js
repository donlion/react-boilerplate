import React, {Component} from 'react';
// Components
import App from './App';

global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

export default class Document extends Component {
    render() {
        const {children} = this.props;

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
            <script src="/js/app.js" defer="defer" type="text/javascript"></script>
            </body>
            </html>
        );
    }
}
