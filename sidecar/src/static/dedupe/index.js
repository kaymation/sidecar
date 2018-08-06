import React, { Component} from 'react';
import ReactDOM from 'react-dom';

import App from './App'

document.addEventListener("DOMContentLoaded", function() {
    // do the app. doo it. you already know. f12
    const appspace = document.getElementById('main-content');
    ReactDOM.render(<App />, appspace);
});
