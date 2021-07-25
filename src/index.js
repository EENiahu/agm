import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import reportWebVitals from './reportWebVitals';
import App from "./components/App";
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <App/>
      </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
