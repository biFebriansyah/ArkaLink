import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Color from '../../../public/Style/Color';
import { firebase } from '@react-native-firebase/auth';

export class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: ''
        }
    }

    componentDidMount() {
        const { displayName } = firebase.auth().currentUser;
        this.setState({ name: displayName })
    }

    render() {
        return (
            <View style={style.container}>
                <Text>Haii {this.state.name}</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Header: {
        backgroundColor: Color.primary,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 20
    },
    HeaderText: {
        color: Color.TextLight,
        fontFamily: 'Roboto-Bold',
        fontSize: 20
    }

})

export default Home
