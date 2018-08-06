import React from 'react'

import { Switch, Route } from "react-router-dom";
import NavController from './NavController';


const LoadQuestionViewWithParams = (props) => LoadApplicationWithParams({value: 0, ...props})

const LoadUploadViewWithParams = (props) => LoadApplicationWithParams({value: 1, ...props})

const LoadApplicationWithParams = (props) => (<NavController {...props} />)


export default () => (
    <Switch>
        {/* QuestionView Paths */}
        <Route exact path='/' render={LoadQuestionViewWithParams} />
        <Route exact path='/debates/:debate' render={LoadQuestionViewWithParams} />
        <Route path='/debates/:debate/categories/:category' render={LoadQuestionViewWithParams} />

        {/* UploadView Path */}
        <Route path='/new' render={LoadUploadViewWithParams} />

        {/* Default */}
        <Route render={() => <h2>Not found idiot</h2>} />
    </Switch>
)
