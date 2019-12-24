import React, { Component } from 'react'
import { View, StyleSheet, StatusBar, Image, Text, } from 'react-native'
import Color from '../../../public/Style/Color';
import { Button, Item, Input, Label, Form } from 'native-base';
import IconAnt from 'react-native-vector-icons/AntDesign';

export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }

        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        const { goBack } = this.props.navigation;
        goBack();
    }

    render() {
        return (
            <View style={style.container}>
                <IconAnt name="arrowleft" size={24} color={Color.TextLight} onPress={this.goBack} style={style.Back} />
                <StatusBar backgroundColor={Color.primary} barStyle="light-content" />
                <View style={style.topContent}>
                    <View style={style.imgContainer}>
                        <Image source={require('../../../public/Asset/Image/Arkademy-Putih.png')} style={style.img} />
                    </View>
                </View>
                <View style={style.bottomContent}>
                    <Form style={style.form}>
                        <Item floatingLabel style={{ marginBottom: 10 }}>
                            <Label >Username</Label>
                            <Input style={{ marginTop: 10 }} />
                        </Item>
                        <Item floatingLabel >
                            <Label>Password</Label>
                            <Input style={{ marginTop: 10 }} />
                        </Item>
                    </Form>
                    <Button style={style.btnLogin}>
                        <Text style={{ color: Color.TextLight, fontFamily: 'Roboto-Bold' }}>Login</Text>
                    </Button>
                    <Button style={style.btnLogin2}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                            <Image source={require('../../../public/Asset/Image/google.png')} style={style.Icon} />
                            <Text style={style.Text2}>Login With Google</Text>
                        </View>
                    </Button>
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomContent: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.TextLight
    },
    img: {
        width: null,
        height: null,
        flex: 1,
        resizeMode: "contain"
    },
    imgContainer: {
        width: 200,
        height: 70,
        justifyContent: 'center',
    },
    btnLogin: {
        width: 300,
        backgroundColor: Color.primary,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnLogin2: {
        width: 300,
        backgroundColor: Color.TextLight,
        borderRadius: 5,
        marginTop: 20
    },
    Text2: {
        color: '#bbb',
        fontFamily: 'Roboto-Bold'
    },
    form: {
        width: '80%',
        marginBottom: 50
    },
    Icon: {
        height: 30,
        width: 30,
        marginRight: 10
    },
    Back: {
        position: 'absolute',
        left: 0,
        top: 0,
        paddingLeft: 20,
        paddingTop: 10
    }
})

export default Login
