import React, { Component } from 'react';
import { List, ListItem, ListItemText, withStyles } from '@material-ui/core';

const styles = theme => ({
    questionLi: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        minHeight: 48,
        overflow: 'auto',
        padding: '5px 30px',
        margin: '10px auto',
        textAlign: 'right',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    author: {
        textAlign: 'left',
    }
});


const Question = (props) => {
    return (
        <ListItem className={props.classes.questionLi} key={props.text}>
                <ListItemText className={props.classes.author} primary={props.author} />
                <ListItemText primary={props.text} />
        </ListItem>
    )
}

class Questions extends Component {
    constructor() {
        super();
        this.state = {
            questions: [],
        }
    }

    render() {
        return (
            <List component='ul'>
                {this.props.questions.map((question) => {
                    const props = {
                        ...question,
                        classes: this.props.classes,
                    }
                    return Question(props);
                })}
            </List>
        );
    }
}

export default  withStyles(styles)(Questions);
