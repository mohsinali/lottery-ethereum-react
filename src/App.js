import React, { Component } from 'react'
import logo from './logo.svg'
import web3 from './web3'
import lottery from './lottery'

import './App.css';

class App extends Component {
  state = {
    manager:  '',
    players:  [],
    balance:  '',
    value:    ''
  }

  onSubmit = async (e) => {
    e.preventDefault()
    
  }
  
  componentDidMount = async () =>  {
    const manager = await lottery.methods.manager().call()
    const players = await lottery.methods.getPlayers().call()
    const balance = await web3.eth.getBalance(lottery.options.address)

    this.setState({manager, players, balance})
  }

  render() {    
    return (
      <div>
        <h1>Lottery Contract</h1>
        <p>
          This contract is managed by {this.state.manager}
        </p>

        <p>There are currently {this.state.players.length} entered completing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!</p>
      
        <hr />
        <form name="entry" onSubmit={this.onSubmit}>
          <h4>Wanna try your luck?</h4>

          <div>
            <label>Amount of ether to enter: </label>
            <input 
              value={this.state.value}
              onChange={event => this.setState({value: event.target.value})}
            />
          </div>
          <button>Enter</button>
        </form>
      </div>
    );
  }
}

export default App;
