import React, { Component } from 'react'
import MainMenu from './ui-main-menu/ui-main-menu.jsx'
import './base.scss'

class App extends Component {
  render () {
    return <MainMenu collapsable />
  }
}

export default App
