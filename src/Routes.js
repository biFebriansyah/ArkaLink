import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Color from '../public/Style/Color'

import AppNavigators from './AppNavigator';
import Login from './Screen/Login/Login';
import Regis from './Screen/Regis/Regis';
import Home from './Screen/Home/Home';
import Profile from './Components/Profile/Profile';
import Landing from './Screen/Landing/Landing';

const App = createStackNavigator({

    home: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
    login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    landing: {
        screen: Landing,
        navigationOptions: {
            header: null
        }
    },
    regis: {
        screen: Regis,
        navigationOptions: {
            header: null
        }
    },
    profiles: {
        screen: Profile,
        navigationOptions: {
            header: null
        }
    },
    Apps: {
        screen: AppNavigators,
        navigationOptions: {
            headerStyle: {
                backgroundColor: Color.primary,
                elevation: 0
            },
            headerTitle: 'ArkaLink',
            headerTitleStyle: {
                color: 'white',
                fontFamily: 'Roboto-Bold',
                fontSize: 18
            }
        }
    },

}, {
    initialRouteName: 'landing',
})

const Routes = createAppContainer(App)

export default Routes