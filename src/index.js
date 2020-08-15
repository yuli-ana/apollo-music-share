import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './theme';
import { ApolloProvider } from '@apollo/client';
import client from './graphQL/client';


ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline enables to have dark theme */}
        <CssBaseline />
        <App />
      </MuiThemeProvider>
    </React.StrictMode >
  </ApolloProvider>,

  document.getElementById('root')
);


