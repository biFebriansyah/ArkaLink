
import React, { Component } from 'react'
import Routes from './src/Routes';
import { StatusBar, AppState } from 'react-native'
import 'react-native-gesture-handler'
import Color from './public/Style/Color'
import { firebase } from '@react-native-firebase/auth';

export class App extends Component {
  state = {
    appState: AppState.currentState
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = () => {
    if (AppState.currentState == 'active') {
      console.log('Active')
    }
    if (AppState.currentState == 'background') {
      console.log('background')
    }
  };

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
