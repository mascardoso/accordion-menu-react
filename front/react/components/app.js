import React, { Component } from 'react'
import MainMenu from './glass-main-menu/ui-main-menu.jsx'
import MainHeader from './ui-header/ui-header.jsx'

class App extends Component {
  render () {
    return (
      <div>
        <MainHeader />
        <MainMenu collapsable />
      </div>
    )
  }
}

export default App
