import 'babel-polyfill';
import React, { Component, lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Store, Config } from './utils';
import Splash from './components/structures/Splash';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; //hashHistory

import firebase from "firebase/app";

if (!firebase.apps.length) {
    firebase.initializeApp(Config.firebase);
}

const messaging = firebase.messaging();



const Landing = lazy(() => import("./components/structures/Landing"));
const Home    = lazy(() => import("./components/structures/Home"));
const IsAuth  = lazy(() => import("./components/structures/IsAuth"));

class App extends Component {
    render() {
        return (
            <Suspense fallback={<Splash stage="Loading..." />}>
                <Router>{/* history={hashHistory} */}
                    <Switch>
                        <Route path='/' component={Landing} exact />
                        <Route path='/join' component={Home} exact />
                        <Route path='/owe' component={IsAuth} />
                    </Switch>
                </Router>
            </Suspense>
        )
    }
}

/*if (module.hot) {
    module.hot.accept();
}*/

ReactDOM.render(<Provider store={Store}><App /></Provider>, document.getElementById('root'));