import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.scss'

import InstructionsPage from './components/InstructionsPage'
import SelectSizePage from './components/SelectSizePage'
import GamePage from './components/GamePage/GamePage'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 'instructions',
      tableSize: null,
      setState: (state) => this.setState(state)
    }
    window.addEventListener('resize', () => this.forceUpdate())
  }
  render () {
    return (
      <div>
        { this.state.page === 'instructions' && <InstructionsPage global={this.state} /> }
        { this.state.page === 'selectSize' && <SelectSizePage global={this.state} /> }
        { this.state.page === 'game' && <GamePage global={this.state} /> }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
