import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'
import { Button } from 'native-base'
import Color from '../../../public/Style/Color'

export class ProfileUser extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
        this.go = this.go.bind(this);
    }

    go() {
        this.props.navigation.navigate('profiles')
    }

    render() {
        return (
            <View style={style.container}>
                <TouchableHighlight onPress={this.go}>
                    <Text>Profile</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ProfileUser
