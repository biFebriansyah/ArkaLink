
import React, { Component } from 'react'
import Routes from './src/Routes';
import { StatusBar } from 'react-native'
import 'react-native-gesture-handler'
import Color from './public/Style/Color'

export class App extends Component {
  render() {
    return (
      <>
        <StatusBar backgroundColor={Color.indicator} barStyle="light-content" />
        <Routes />
      </>
    )
  }
}

export default App
