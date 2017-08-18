import React, { Component } from 'react'
import MainMenu from './ui-main-menu/ui-main-menu.jsx'
import './base.scss'

class App extends Component {
  constructor () {
    super()
    this.state = {
      isCollapsable: true
    }

    this.handleCollapsableCheck = this.handleCollapsableCheck.bind(this)
  }

  handleCollapsableCheck () {
    this.setState({
      isCollapsable: !this.state.isCollapsable
    })
  }

  render () {
    return <MainMenu collapsable={this.state.isCollapsable} handleCollapsableCheck={this.handleCollapsableCheck}/>
  }
}

export default App
