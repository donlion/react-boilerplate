import React, {Component} from 'react';

import App from '../scripts/components/App';

export default class Document extends Component {
    render() {
        return (
            <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <title>Future Finance</title>
                <link rel="stylesheet" href="/css/app.css" />
            </head>
            <body>
            <div id="root">
                <App />
            </div>
            <script src="/js/app.js" defer="defer" type="text/javascript"></script>
            </body>
            </html>
        );
    }
}
