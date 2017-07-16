import 'framework7/dist/css/framework7.ios.min.css';
import 'framework7/dist/css/framework7.ios.colors.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import registerServiceWorker from './registerServiceWorker';
import {
    browserHistory,
    IndexRoute,
    Redirect,
    Route,
    Router
} from 'react-router';

/* OR for Material Theme:
 import 'framework7/dist/css/framework7.material.min.css'
 import 'framework7/dist/css/framework7.material.colors.min.css'
 */

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={ App } >
            <IndexRoute component={ App } />
        </Route>
        <Redirect from="*" to="/" />
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
