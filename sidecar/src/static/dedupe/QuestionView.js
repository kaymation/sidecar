import React, { Component} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core';

import Categories from './Categories';
import Questions from './Questions';
import Debates from './Debates';
import makeSafeForWork from './services.js/safeForWork';


const styles = theme => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    toolbar: {
        width: 'auto',
        display: 'flex',
        margin: '0 auto',
    },
    header: {
        margin: '0 auto',
    }
});


class QuestionView extends Component {
    constructor() {
        super();

        this.state = {
            currentCategory: null,
            currentDebate: null,
            debates: [],
            categories: [],
            questions: [],
        }

        // this makes me sad and is dumb
        this.onCategoryClick = this.onCategoryClick.bind(this);
        this.onDebateChange = this.onDebateChange.bind(this);
    }

    componentDidMount = this.handleRoute;

    componentWillReceiveProps = (props) => this.handleRoute(props);

    handleRoute(props = this.props) {
        const urlState = {
            currentCategory: null,
            currentDebate: null,
        }

        const { match: { params: { debate, category } } } = props;

        if(debate) {
            urlState.currentDebate = debate;
            if(category) {
                urlState.currentCategory = category;
            }
        }

        const updateFunction = this.determineUpdateFunction(debate);

        this.setState(urlState, updateFunction);
    }

    fetchQuestions() {
        return fetch(apiUrl('questions', {
            debate: this.state.currentDebate,
            category: this.state.currentCategory
        })).then(results => {
            return results.json();
        }).then(data => {
            let questions = data.data.map((result) => {
                return {
                    author: result.author,
                    text: makeSafeForWork(result.text),
                };
            });
            this.setState({ questions })
        });
    }

    fetchCategories() {
        return fetch(apiUrl('categories', {
            debate: this.state.currentDebate,
        })).then(results => {
                return results.json();
            }).then(data => {
                let categories = data.data.map((result) => {
                    return {
                        category: makeSafeForWork(result.category),
                        count: result.count,
                        borderColor: 'black',
                    };
                });

                this.setState({ categories })
            });
    }

    fetchDebates(callback = () => {}) {
        return fetch(apiUrl('debates', {}))
        .then(results => {
            return results.json()
        }).then(data => {
            let debates = data.data.map((result) => {
                return {
                    topic: result,
                }
            });

            if(debates.length === 0){
                alert('Looks like your index is empty, head on over to the\nUpload tab to upload!')
            }

            this.setState({ debates });

            const currentDebate = this.state.currentDebate || debates[0].topic

            // set as current as newest if doesnt exist
            if (this.state.currentDebate === null) {
                history.replaceState({}, '', `/debates/${currentDebate}`)
            }
            this.setState({ currentDebate }, callback);

        })
    }

    onCategoryClick(currentCategory) {
        this.setState({ currentCategory }, this.fetchQuestions);
    }

    onDebateChange(currentDebate) {
        this.setState({ currentDebate, currentCategory: null }, () => {
            this.fetchQuestions();
            this.fetchCategories();
        });
    }

    determineUpdateFunction(debate = null) {
        var actions = [];

        if(!debate || debate !== this.state.currentDebate) {
            actions.push('fetchCategories');
        }
        actions.push('fetchQuestions');
        const updateFunction = () => {
            actions.forEach((action) => {
                this[action]();
            });
        }
        if(this.state.currentDebate == null) {
            return () => {
                // fetches debates, defaults if null then updates other state variables
                this.fetchDebates(updateFunction);
            }
        }

        return updateFunction;
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Toolbar className={classes.toolbar}>
                    <div id="header" className={classes.header}>
                        Welome to Sidecar
                        <Debates className={classes.toolbar}
                            currentDebate={this.state.currentDebate}
                            debates={this.state.debates}
                            onDebateChange={this.onDebateChange}/>
                    </div>
                </Toolbar>

                <div id="sidebar">
                    <h3>Categories</h3>
                    <Categories onClick={this.onCategoryClick}
                        currentCategory={this.state.currentCategory}
                        currentDebate={this.state.currentDebate}
                        categories={this.state.categories} />
                </div>

                <div id="main-section">
                    <h3>Questions</h3>
                    <Questions currentCategory={this.state.currentCategory}
                        currentDebate={this.state.currentDebate}
                        questions={this.state.questions} />
                </div>
            </div>
        )
    }
}

const apiUrl = (path, params) => {
    return '/api/' + path + '?' + Object.keys(params).reduce( (queryString, key) => {
        if (params[key]){
            return queryString.concat(`${key}=${encodeURIComponent(params[key])}`)
        }
        return queryString;
    }, []).join('&');
};

export default withStyles(styles)(QuestionView)
