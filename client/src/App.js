import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom'
import Router from './components/Router'
import getPlayers from './actions/getPlayers'
import getPayouts from './actions/getPayouts'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      players: []
    };
  }

  render() {

    const { players } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <div className="header-button-container">
            <Link to='/'>Poker Leaderboard</Link>
            <Link to='/createPlayer'>Create Player</Link>
          </div>
        </header>
        <Router players={players}/>
      </div>
    );
  }

  componentDidMount() {
    this.getStandings();
  }

  componentDidUpdate() {
    this.getStandings();
  }

  getStandings() {
    Promise.all([
      getPlayers(),
      getPayouts()
    ]).then(([players, payouts]) => {
      let playersWithWinnings = players.map(player => {
          let playerWinnings = this.getPlayerWinnings(payouts, player.id);
          return {
            winnings: playerWinnings,
            totalWinnings: this.calculateTotalWinnings(playerWinnings),
            ...player
          }
        }).sort((a, b) => b.totalWinnings - a.totalWinnings);
        this.setState({
          players: playersWithWinnings
        })
      });
  }

  getPlayerWinnings(payouts, id) {
    return payouts.filter((payout) => {
      return payout.playerId === id
    }).reverse();
  }

  calculateTotalWinnings(payouts) {
    return payouts.reduce((purse, player) => {
      return purse + parseInt(player.amount, 10);
    }, 0);
  }
}

export default App;
