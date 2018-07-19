import React, { Component } from 'react';

class Categories extends Component {
    constructor() {
        super();
        this.state = {
            questions: [],
        }
    }

    componentDidMount() {
        fetch('/api/categories')
        .then(results => {
            return results.json();
        }).then(data => {
            let categories = data.data.map((result) => {
                return(
                    <li class="block-ui">
                        <div class="Category">
                            <div class="category">{result.category}</div>
                            <div class="count">{result.count}</div>
                        </div>
                    </li>
                );
            });

            this.setState({categories: categories})
        });
    }

    render() {
        return (
            <ul>
            {this.state.categories}
            </ul>
        );
    }
}

export default Categories;
