import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'
import database from '@react-native-firebase/database';

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

    async componentDidMount() {
        const userId = 'CHkPaqoeHFXpG560ZMZxLiZuwgj1'
        database()
            .ref(`users/`)
            .on("value", snapshot => {
                console.log(snapshot)
                if (snapshot && snapshot.exists()) {
                    //Set values in state which can be extracted in jsx in render. 
                }
            })
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
