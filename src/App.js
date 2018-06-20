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
    value:    '',
    message:  ''
  }

  onSubmit = async (e) => {
    e.preventDefault()
    
    const accounts = await web3.eth.getAccounts()
    this.setState({message: 'Waiting on transaction success...'})

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    })

    this.setState({message: 'You have been entered.'})
  }

  onClick = async () => {
    const accounts = await web3.eth.getAccounts()

    this.setState({message: 'waiting on transaction success.'})

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    })
    
    this.setState({message: 'Winner has been picked.'})
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
        <hr />
        <h4>Ready to pick a winner.</h4>
        <button onClick={this.onClick}>Pick a winner!</button>
        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
