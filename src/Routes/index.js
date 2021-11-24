import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from '../Pages'
import Artist from '../Pages/Artist'

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/artist/:artistName' component={Artist} />
      </Switch>
    </Router>
  )
}

export default AppRoutes
