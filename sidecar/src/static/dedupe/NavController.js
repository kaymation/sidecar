import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';

import { Tab, AppBar, withStyles, Typography } from '@material-ui/core';
import QuestionView from './QuestionView';
import UploadView from './UploadView';



function TabContainer(props) {
    const { children, dir } = props;

    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    }
})

const PAGES = ['/' , '/new']

class NavController extends Component {

    handleChange = (_, value) => {
        const { history } = this.props;
        history.push(PAGES[value])
    };

    handleChangeIndex = index => {
        const { history } = this.props;
        history.push(PAGES[index])
    };

    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.props.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                        centered
                        >
                            <Tab label="View Questions" />
                            <Tab label="Upload Sum Questions" />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.props.value}
                    onChangeIndex={this.handleChangeIndex}
                    >
                    <TabContainer dir={theme.direction}>
                        <QuestionView {...this.props} />
                    </TabContainer>
                    <TabContainer dir={theme.direction}>
                        <UploadView {...this.props} />
                    </TabContainer>
                </SwipeableViews>
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(NavController);
