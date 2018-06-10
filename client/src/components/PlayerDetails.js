import React, { Component } from 'react';
import postPayout from '../actions/postPayout'

class PlayerDetails extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      player: this.props.location.state
    };
  }

  render () {
    const { player } = this.state;
    return (
      <div className='player-details-container'>
        <h1 className='player-details-name'>{player.firstName} {player.lastName}</h1>
        <div className='player-winnings-container'>
          <div className='player-details-winnings'>
            <div className='total'>
              <h3>Total Winnings</h3>
              <span>${player.totalWinnings}</span>
            </div>
            {this.renderWinnings()}
          </div>
        </div>
        <div className='post-payout-container'>
          <form onSubmit={this.handleSubmit}>
            <label>
              Post Winnings:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input id="button" type="submit" value="Cashout" name="cashout"/>
          </form>
        </div>
      </div>
    );
  }

  renderWinnings() {
    const { winnings } = this.state.player;
    return (
      <div className='latest'>
        <h3>Last 5 Tournaments</h3>
        {
          winnings.map((elem, index) => {
            return <div key={index} >${elem.amount}</div>
          }).slice(0, 5)
        }
      </div>
    )
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const { value, player } = this.state;
    if(value === "" || value === 0) {
      alert("Please enter a non-zero value for payout.")
    } else {
      postPayout(player.id, value)
        .catch(err => alert(err))
        .then(response => response.json())
        .then(data => {
          this.setState({
            player: {
              winnings: player.winnings.concat([data]),
              totalWinnings: parseInt(player.totalWinnings, 10) + parseInt(value, 10),
              firstName: player.firstName,
              lastName: player.lastName
             }
           })
           this.props.history.push('/')
        });
    }
  }
}

export default PlayerDetails;