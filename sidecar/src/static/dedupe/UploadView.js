import React from 'react';
import { TextField, Divider, Button, withStyles} from '@material-ui/core';


const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
    }
})

const uploadQuestions = (event) => {
    event.preventDefault();
    const { elements: { debate, rawHtml } } = event.target
    postData('/api/bulkUpload', { debate: debate.value, rawHtml: rawHtml.value }).then(data => {
        alert(data.data.msg);
    });
}

const postData = (url = ``, data = {}) => {
    // Default options are marked with *
        return fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(response => response.json()) // parses response to JSON
        .catch(error => console.error(`Fetch Error =\n`, error));
    };


const UploadView = (props) => (
    <form onSubmit={uploadQuestions} className={props.classes.root}>
        <TextField name="debate"
            placeholder='e.g Sports'
            label="Debate Topic"
            margin="normal"
            fullWidth />
        <Divider />
        <TextField multiline={true}
            name="rawHtml"
            rows={16}
            fullWidth
            placeholder="Paste your Html here" />
        <Button type="submit">upload!</Button>
    </form>
);

export default withStyles(styles)(UploadView);
