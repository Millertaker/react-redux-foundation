import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Map as map } from 'immutable';

import Home from './pages/home';
import NotFound from './pages/not-found';
import About from './pages/about';

import Header from './components/containers/header';
import reducer from './reducers';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';

const store = createStore(
  reducer,
  map({}),
  composeWithDevTools(
    applyMiddleware(
      //logger,
      thunk
      //all the new middlewares
    )
  )
);

const appContainer = document.getElementById('app');
render(
    <Provider store={store}>
      <HashRouter>
        <Fragment>
          <h1 className="text-center h1">VIDEO VIEWVER</h1>
          <Header />
          <Switch>
            <Route string exact sensitive path="/" component={Home} />
            <Route string exact sensitive path="/about" component={About} />
            <Route string exact sensitive path="/video/:id" component={Home} />
            <Route string exact sensitive path="/404" component={NotFound} />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </HashRouter>
    </Provider>, appContainer
);
