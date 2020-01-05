import React, { Component } from 'react'
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native'
import { firebase } from '@react-native-firebase/auth';


export class Loading extends Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            console.log(user)
            if (!user) {
                this.props.navigation.navigate('Auth')
            } else {
                if (user.displayName) {
                    this.props.navigation.navigate('App')
                } else {

                }
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading..</Text>
                <ActivityIndicator size='large' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Loading
