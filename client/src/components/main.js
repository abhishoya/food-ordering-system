import React from 'react';
import { Switch, Route} from 'react-router-dom';

import Menu1 from './Menu/menu';
import Landing from './Landing/landingpage';
import Admin from './Admin/admin';
import Login from './Admin/login';

const Main= () => (
    <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/menu" component={Menu1} />
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={Login} />
    </Switch>
)

export default Main;