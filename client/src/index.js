import React from 'react';
import ReactDOM from 'react-dom';
import './styles/bootstrap.min.css';
import './styles/index.css';
import './styles/App.css';
import './styles/genpass.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();
