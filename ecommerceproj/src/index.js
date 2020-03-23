import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './index.css';
import App from './App';
import ScrollToTop from './ScrollToTop';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
    <Provider store={store}>
        <Router onUpdate={() => window.scrollTo(0, 0)} history={createBrowserHistory()}>
            <ScrollToTop>
                <App />
            </ScrollToTop>
        </Router>
    </Provider>
    ,
document.getElementById('root'));
