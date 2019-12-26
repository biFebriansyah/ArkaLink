import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export class Friends extends Component {

    goMaps = () => {
        this.props.navigation.navigate('maps')
    }

    render() {
        return (
            <View style={style.container}>
                <TouchableHighlight onPress={this.goMaps}>
                    <Text> Hello Fromm Frineds </Text>
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
