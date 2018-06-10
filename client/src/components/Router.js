import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import '../App.css';
import Leaderboard from './Leaderboard'
import PlayerDetails from './PlayerDetails'
import CreatePlayer from './CreatePlayer'

class Router extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' render={(props) =><Leaderboard players={this.props.players}/>} />
          <Route path='/details/:id' component={PlayerDetails} />
          <Route path='/createPlayer' component={CreatePlayer} />
        </Switch>
      </main>
    );
  }
}

export default Router;
