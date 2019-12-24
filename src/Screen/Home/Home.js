import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Color from '../../../public/Style/Color'

export class Home extends Component {
    render() {
        return (
            <>
                <Text> Home here </Text>
            </>
        )
    }
}

const style = StyleSheet.create({
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
