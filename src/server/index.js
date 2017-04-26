import express from 'express';
import React, {Component} from 'react';
import {renderToString} from 'react-dom/server';
import {match} from 'react-router';
// Components
import Root from '../scripts/components/Root';
import routes from '../scripts/routes';

export const start = () => {
  const app = express();

  let redirectToDev = (req, res) => {
    res.redirect(`http://localhost:8080/${req.params.path}/${req.params.file}`);
  };

  // Dev
  app.use(require('connect-livereload')());
  app.get('/:path/:file', redirectToDev);

  app.use((request, response) => {
      match({
          routes,
          location: request.url
      }, (error, redirectLocation, renderProps) => {
          if (error) {
              return response.status(500).send('Something did not work');
          }

          if (renderProps) {
              const render = renderToString(<Root />);

              response.status(200).send(render);
          }
      });
  });

  return app.listen(3003);
};

export default {
  start
};
