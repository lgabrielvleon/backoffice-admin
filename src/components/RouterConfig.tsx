import { Switch, Route } from 'react-router-dom'
import Service from '../services/Service'

const RouterConfig = () => {
    return(
        <Switch>
            <Route exact path="/service" component={Service} />
        </Switch>
    )
}

export default RouterConfig;