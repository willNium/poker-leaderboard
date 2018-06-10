import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Leaderboard extends Component {

  render() {
    return (
      <div className={'leaderboard-table'}>
        <h1>ALL-TIME TOURNAMENT EARNINGS</h1>
        <div className='leaderboard-table-header'>
          <h2>Player</h2>
          <h2>Winnings</h2>
        </div>
        {this.renderPlayers()}
      </div>
    );
  }

  renderPlayers() {
    const {players} = this.props;
    return players.map((player, index) => {
      return (
        <Link to={{pathname: `/details/${player.id}`, state: player}} key={index} className='player-row'>
          <span className="player-place">{index + 1}</span>
          <span className="player-name">{player.firstName} {player.lastName}</span>
          <span className="player-winnings">${player.totalWinnings}</span>
        </Link>
      )
    });
  }
}

export default Leaderboard;