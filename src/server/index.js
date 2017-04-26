import express from 'express';
import React, {Component} from 'react';
import {renderToString} from 'react-dom/server';
// Components
import Root from '../scripts/components/Root';

export const start = () => {
  const app = express();

  let redirectToDev = (req, res) => {
    res.redirect(`http://localhost:8080/${req.params.path}/${req.params.file}`);
  };

  // Dev
  app.use(require('connect-livereload')());
  app.get('/:path/:file', redirectToDev);

  console.log(__dirname);

  app.get('/', (req, res) => {
    const render = renderToString(<Root />);

    res.status(200).send(render);
  });


  return app.listen(3003);
};

export default {
  start
};
