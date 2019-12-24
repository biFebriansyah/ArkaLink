import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation'

import Home from './Screen/Home/Home';
import Friends from './Screen/Friends/Friends';
import ProfileUser from './Screen/ProfileUser/ProfileUser';


const tabNavigate = createMaterialTopTabNavigator({

    home: {
        screen: Home,
        navigationOptions: {
            title: 'Home'
        }
    },
    friends: {
        screen: Friends,
        navigationOptions: {
            title: 'Friends'
        }
    },
    ProfileUser: {
        screen: ProfileUser,
        navigationOptions: {
            title: 'Profile'
        }
    }

}, {
    initialLayout: 'home',
    swipeEnabled: true,
    tabBarOptions: {
        style: {
            backgroundColor: '#25594A',
        },
        indicatorStyle: {
            backgroundColor: 'white'
        },
        labelStyle: {
            fontFamily: 'Roboto-Bold',
            fontSize: 14
        }
    }
})

const AppNavigator = createAppContainer(tabNavigate)


export default AppNavigator
