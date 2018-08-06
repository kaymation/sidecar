import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { Select, InputLabel, MenuItem, FormControl } from '@material-ui/core';
import withRouter from 'react-router-dom/withRouter';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: 'auto',
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});


class Debates extends Component {

    state = {
        currentDebate: this.props.currentDebate || '',
    };

    handleChange = event => {
        this.setState({ currentDebate: event.target.value });
        const { history } = this.props;

        history.push(`/debates/${event.target.value}`);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentDebate !== null && nextProps.currentDebate !== this.state.currentDebate) {
            this.setState( { currentDebate: nextProps.currentDebate } )
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="debate-select">Debate</InputLabel>
                            <Select
                                value={this.state.currentDebate}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'debate',
                                    id: 'debate-select',
                                }}>
                                    {this.props.debates.map((debate) => {
                                        const primaryText = debate.topic
                                        return (
                                            <MenuItem value={debate.topic} key={debate.topic}>
                                                {primaryText}
                                            </MenuItem>
                                        )
                                    })}
                            </Select>
                        </FormControl>
                    </form>
        );
    }
}

Debates.propTypes = {
    classes: PropTypes.object.isRequired,
};

const DebatesWithRouter = withRouter(Debates);

export default withStyles(styles)(DebatesWithRouter);
