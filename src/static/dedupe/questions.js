import React, { Component } from 'react';

const fetchQuestions = (category=null) => {
    fetch(`/api/questions?category=${encodeURIComponent(category)}`)
    .then(results => {
        return results.json();
    }).then(data => {
        return data.data.map((result) => {
            return(
                <li class="block-ui">
                    <div class="question">
                        <div class="author">{result.author}</div>
                        <div class="text">{result.text}</div>
                    </div>
                </li>
            );
        });
    });
}


class Questions extends Component {
    constructor() {
        super();
        this.state = {
            questions: [],
        }
    }

    componentDidMount() {
        let questions = fetchQuestions();
        this.setState({ questions: questions})
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
