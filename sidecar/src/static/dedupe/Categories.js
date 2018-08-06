import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import { ListItem, ListItemText, withStyles, Button } from '@material-ui/core';


const styles = theme => ({
    catgoryName: {
        float: 'left',
        width: '80%',
        textAlign: 'left',
    },
    listItem: {
        background: 'linear-gradient(66deg, #AE6BEB 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        minHeight: 48,
        overflow: 'auto',
        padding: '5px 30px',
        margin: '10px -5px',
        textAlign: 'right',
    },
    unselected: {
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    selected: {
        boxShadow: '1px -1px 10px 5px rgba(100, 255, 135, .7)',
    },
    categoryName: {
        textAlign: 'left',
    },
    count: {
        float: 'right',
        width: '20%',
    }
});

const Category = (props) => {
    const borderClass = (props.currentCategory === props.category) ? props.classes.selected : props.classes.unselected;
    const className = [props.classes.listItem, borderClass].join(' ');

    return (
        <ListItem className={className} key={props.category}>
            <Button variant="contained"
              component={Link}
              to={`/debates/${props.currentDebate}/categories/${props.category}`}>
                <ListItemText className={props.classes.catgoryName} primary={props.category} />
                <ListItemText className={props.classes.count} primary={props.count} />
            </Button>
        </ListItem>
    )
}

class Categories extends Component {

    render() {
        return (
            <List component='ul'>
                {this.props.categories.map((category) => {
                    const props = {
                        ...category,
                        onClick: this.props.onClick,
                        currentCategory: this.props.currentCategory,
                        currentDebate: this.props.currentDebate,
                        classes: this.props.classes,
                    };
                    return Category(props);
                })}
            </List>
        );
    }
}

export default withStyles(styles)(Categories);
