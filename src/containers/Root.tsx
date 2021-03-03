import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Faq from './Faq';
import Collection from './Collection';
import Application from './Application';
import Artists from './Artists';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact component={Collection} path="/"/>
                <Route component={Faq} path="/faq"/>
                <Route component={Application} path="/application"/>
                <Route component={Artists} path="/artists"/>
            </Switch>
        </Router>
    );
}

export default App;
