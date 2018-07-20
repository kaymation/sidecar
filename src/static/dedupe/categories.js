import React, { Component } from 'react';

const Category = (props) => {
    return (
        <li className="block-li" onClick={() => props.onClick(props.result.category)} style={{borderColor: 'black'}} key={props.result.category}>
            <div className="category">
                <div className="category-name">{props.result.category}</div>
                <div className="count">{props.result.count}</div>
            </div>
        </li>
    )
}

class Categories extends Component {
    constructor() {
        super();
        this.state = {
            questions: [],
            categories: [],
        }
    }

    updateCategories() {
        fetch('/api/categories')
        .then(results => {
            return results.json();
        }).then(data => {
            let categories = data.data.map((result) => {
                return(
                    Category({ result, onClick: this.props.onClick})
                );
            });

            this.setState({categories: categories})
        });
    }

    renderCategories() {
        let highlightedCategories = this.state.categories.map((category) => {
            if(category.key == this.props.currentCategory) {
                return React.cloneElement(category, {
                    style: {borderColor: 'red'}
                });
            } else {
                return React.cloneElement(category, {
                    style: {borderColor: 'black'}
                });
            }
        });
        this.setState({ categories: highlightedCategories })
    }

    componentDidMount() {
        this.updateCategories();
    }

    componentWillReceiveProps() {
        this.renderCategories();
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
