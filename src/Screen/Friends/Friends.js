import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Maaps from '../../Components/Mpas/Mpass';

export class Friends extends Component {

    goMaps = () => {
        const { uid } = auth().currentUser
        const data = database().ref('users/' + uid)
        data.on('value', (snapshot) => {
            console.log(snapshot.val())
        })
    }

    go = () => {
        this.props.navigation.navigate('maps')
    }

    render() {
        return (
            <View style={style.container}>
                <TouchableHighlight onPress={this.go}>
                    <Text>Go Maps</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Friends
