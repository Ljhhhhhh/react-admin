import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import List from '../views/List/BasicList'
import Register from '../views/User/Register'
import Login from '../views/User/Login'

const Router = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/list" component={List} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router