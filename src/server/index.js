import express from 'express';
import React, {Component} from 'react';
import {renderToString} from 'react-dom/server';
import {fetchData} from '../scripts/mobx-store/dist/index';
import statusMonitor from 'express-status-monitor';
// Components
import routes from '../scripts/routes';
import Root from '../scripts/components/Root';
import {Provider} from 'mobx-react';

export const start = () => {
  const app = express();

  let redirectToDev = (req, res) => {
    res.redirect(`http://localhost:8080/${req.params.path}/${req.params.file}`);
  };

  // Dev
  app.use(require('connect-livereload')());
  app.get('/:path/:file', redirectToDev);
  app.use(statusMonitor());

  app.use((request, response) => {
      let match = require('react-router').match;
      let RouterContext = require('react-router').RouterContext;

      return match({
          routes,
          location: request.url
      }, (error, redirectLocation, renderProps) => {
          if (error) {
              return response.status(500).send('Something did not work');
          }

          let initialStore = [];

          if (!renderProps) {
              return response.status(500).send('SOMETHING WENT WRONG');
          }

          let {
              components,
              params,
              location: {query}
          } = renderProps;

          return fetchData({
              store: initialStore,
              components,
              params,
              query
            })
            .then(store => {
                console.log('STORE');
                console.log(store);
                return renderToString(
                    <Root
                        renderProps={renderProps}
                        store={store}>
                        <RouterContext {...renderProps} />
                    </Root>
                );
            })
            .then(html => response.status(200).send(html));
      });
  });

  return app.listen(3003);
};

export default {
  start
};
