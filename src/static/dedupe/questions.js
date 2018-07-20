import React, { Component } from 'react';

class Questions extends Component {
    constructor() {
        super();
        this.state = {
            questions: [],
        }
    }

    updateQuestions(currentCategory) {
        fetch(`/api/questions?category=${encodeURIComponent(currentCategory)}`)
        .then(results => {
            return results.json();
        }).then(data => {
            let questions = data.data.map((result) => {
                return (
                    <li className="block-li">
                        <div className="question">
                            <div className="author">{result.author}</div>
                            <div className="text">{result.text}</div>
                        </div>
                    </li>
                );
            });
            this.setState({ questions })
        });
    }

    componentDidMount() {
        this.updateQuestions(this.props.currentCategory);
    }

    componentWillReceiveProps(nextProps) {
        if( this.props.currentCategory !== nextProps.currentCategory) {
            this.updateQuestions(nextProps.currentCategory);
        }
    }

    render() {
        return (
            <ul>
            {this.state.questions}
            </ul>
        );
    }
}

export default Questions;
