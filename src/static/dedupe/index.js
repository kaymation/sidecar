import React, { Component} from 'react';
import ReactDOM from 'react-dom';

import Questions from './questions';
import Categories from './categories';

class Application extends Component {
    render() {
        return (
            
        )
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // do the app. doo it. you already know. f12
    const questions = document.getElementById('questions');
    const categories =  document.getElementById('categories');
    ReactDOM.render(<Questions />, questions);
    ReactDOM.render(<Categories />, categories);
});
