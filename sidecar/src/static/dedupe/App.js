import React  from 'react';
import { hot } from 'react-hot-loader'

import AppRouter from './AppRouter';


import {
    BrowserRouter as Router,
} from 'react-router-dom';

const App = () => (
    <Router>
        <AppRouter />
    </Router>
);

export default hot(module)(App);

