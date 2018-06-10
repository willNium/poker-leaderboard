import React, { Component } from 'react';
import postPlayer from '../actions/postPlayer'

class CreatePlayer extends Component {
  constructor(props) {
      super(props);
      this.state = {
        firstName: '',
        lastName: ''
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
      event.preventDefault();
      let data = new FormData(event.target);
      let requestBody = {
        firstName: data.get('firstName'),
        lastName: data.get('lastName')
      }
      postPlayer(requestBody)
        .then(data => this.props.history.push('/'));
    }

  render() {
    return (
      <form className="create-player-form" onSubmit={this.handleSubmit}>
        <label>
          First Name:
          <input type="text" value={this.state.firstName} name="firstName" onChange={this.handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" value={this.state.lastName} name="lastName" onChange={this.handleChange} />
        </label>
        <input id="button" type="submit" value="Create Player"/>
      </form>
    );
  }

}

export default CreatePlayer;