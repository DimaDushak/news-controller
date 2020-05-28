import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import App from './js/containers/App';
import newsController from './js/reducers';
import './scss/main.scss';

const initialState = {
    categories: [],
    categoriesId: 0,
    pageNumber: 0,
    news: [],
    newsText: ''
}

const store = createStore(newsController, initialState);

ReactDOM.render((
    <App store={store} />
), document.getElementById('root'));