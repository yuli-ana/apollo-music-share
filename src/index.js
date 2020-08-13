import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      {/* CssBaseline enables to have dark theme */}
      <CssBaseline /> 
      <App />
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


