import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Color from '../public/Style/Color'

import AppNavigators from './AppNavigator';
import Login from './Screen/Login/Login';
import Regis from './Screen/Regis/Regis';
import Home from './Screen/Home/Home';
import Profile from './Components/Profile/Profile';
import Landing from './Screen/Landing/Landing';
import Loading from './Components/Loading/Loading';

const AppStack = createStackNavigator({

    home: {
        screen: Home,
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
    initialRouteName: 'Apps',
})

const AuthStack = createStackNavigator({

    login: {
        screen: Login,
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
    landing: {
        screen: Landing,
        navigationOptions: {
            header: null
        }
    },
}, {
    initialRouteName: 'landing'
})

const Routes = createAppContainer(createSwitchNavigator({

    Auth: {
        screen: AuthStack
    },
    App: {
        screen: AppStack
    },
    LoadScreen: {
        screen: Loading
    }
}, {
    initialRouteName: 'LoadScreen',
    headerMode: 'none'
}))

export default Routes