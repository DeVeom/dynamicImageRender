import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './styles/reset.css';
import './styles/common.css';
import Router from './Router';
import { ApolloProvider } from '@apollo/client';
import client from './client';

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router />
  </ApolloProvider>,
  document.getElementById('root')
);
