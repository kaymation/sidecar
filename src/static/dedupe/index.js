import React, { Component} from 'react';
import ReactDOM from 'react-dom';

import Questions from './questions';
import Categories from './categories';

class Application extends Component {
    constructor() {
        super();

        this.state = {
            currentCategory: null
        }

        // this makes me sad and is dumb
        this.onCategoryClick = this.onCategoryClick.bind(this);
    }
    onCategoryClick(currentCategory) {
        this.setState({ currentCategory })
    }

    render() {
        return (
            <div>
                <div id="header">
                    This div is the header lol check it out
                </div>

                <div id="sidebar">
                    <h3>this div is like the side bar where you can like, pick stuff</h3>
                    {/* <ul id="categories"></ul> */}
                    <Categories onClick={this.onCategoryClick} currentCategory={this.state.currentCategory} />
                </div>

                <div id="main-section">
                    <h3>results in this div. lol</h3>
                    {/* <div id="questions"></div> */}
                    <Questions currentCategory={this.state.currentCategory}/>
                </div>
            </div>
        )
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // do the app. doo it. you already know. f12
    // const questions = document.getElementById('questions');
    // const categories =  document.getElementById('categories');
    // ReactDOM.render(<Questions />, questions);
    // ReactDOM.render(<Categories />, categories);

    const appspace = document.getElementById('main-content');
    ReactDOM.render(<Application />, appspace);
});
