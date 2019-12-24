import React, { Component } from 'react'
import { View, StyleSheet, StatusBar, Image, Text, TouchableHighlight } from 'react-native'
import Color from '../../../public/Style/Color';
import { Button } from 'native-base';

class Landing extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
        this.onLogin = this.onLogin.bind(this);
    }


    onLogin() {
        this.props.navigation.navigate('login')
    }
    render() {
        return (
            <View style={style.container}>
                <StatusBar backgroundColor={Color.primary} barStyle="light-content" />
                <View style={style.topContent}>
                    <View style={style.imgContainer}>
                        <Image source={require('../../../public/Asset/Image/Arkademy-Putih.png')} style={style.img} />
                    </View>
                </View>
                <View style={style.bottomContent}>
                    <Button style={style.btnLogin} onPress={this.onLogin}>
                        <Text style={style.Text2}>Login</Text>
                    </Button>
                    <TouchableHighlight style={style.btnLogin2}>
                        <Text style={style.Text}>Register</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Color.primary
    },
    Text: {
        color: Color.TextLight
    },
    topContent: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: null,
        height: null,
        flex: 1,
        resizeMode: "contain"
    },
    imgContainer: {
        width: 400,
        height: 80,
        justifyContent: 'center',
    },
    btnLogin: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnLogin2: {
        width: 200,
        backgroundColor: Color.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    Text2: {
        color: Color.primary,
        fontFamily: 'Roboto-Bold'
    }
})

export default Landing

