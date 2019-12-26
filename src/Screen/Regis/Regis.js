import React, { Component } from 'react'
import { View, StyleSheet, StatusBar, Image, Text, ToastAndroid } from 'react-native'
import Color from '../../../public/Style/Color';
import { Button, Item, Input, Label, Form } from 'native-base';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { PermissionsAndroid } from 'react-native';

export class Regis extends Component {
    constructor(props) {
        super(props)

        this.state = {
            latitude: '',
            longitude: '',
            name: '',
            email: '',
            password: '',
            errorMessage: null,
            visible: false
        }
        this.goBack = this.goBack.bind(this)
        this.submitRegis = this.submitRegis.bind(this);
    }

    goBack() {
        const { goBack } = this.props.navigation;
        goBack();
    }

    async componentDidMount() {
        try {
            const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords
                        this.setState({ latitude, longitude })
                    },
                    (error) => {
                        this.setState({
                            errorMessage: "Check youre GPS",
                            visible: true
                        }, () => {
                            this.hideToast()
                        })
                        return
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            } else {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    Geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords
                            this.setState({ latitude, longitude })
                        },
                        (error) => {
                            this.setState({
                                errorMessage: "Check youre GPS",
                                visible: true
                            }, () => {
                                this.hideToast()
                            })
                            return
                        },
                        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                    );
                } else {
                    this.setState({
                        errorMessage: "location denied",
                        visible: true
                    }, () => {
                        this.hideToast()
                    })
                    return
                }
            }
        } catch (err) {
            this.setState({
                errorMessage: err,
                visible: true
            }, () => {
                this.hideToast()
            })
            return
        }
    }

    hideToast = () => {
        this.setState({
            visible: false,
        });
    };

    submitRegis() {
        const { name, email, password } = this.state

        if (!name || !email || !password) {
            this.setState({
                errorMessage: "name, email and password isEmpty",
                visible: true
            }, () => {
                this.hideToast()
            })
            return
        }
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => {
                console.log(res)
                database().ref('/users/' + res.user.uid)
                    .set({
                        name: this.state.name,
                        status: 'Online',
                        email: this.state.email,
                        photo: 'https://res.cloudinary.com/erdinsuharyadi/image/upload/v1577315841/hiringapp/assets/ava1.png',
                        latitude: this.state.latitude || null,
                        longitude: this.state.longitude || null,
                        id: res.user.uid,
                    })
                return res.user.updateProfile({
                    displayName: this.state.name
                })
            })
            .catch(err => {
                this.setState({
                    errorMessage: err.message,
                    visible: true
                }, () => {
                    this.hideToast()
                })
            })
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
                    <Toast visible={this.state.visible} message={this.state.errorMessage} />
                    <Form style={style.form}>
                        <Item floatingLabel style={{ marginBottom: 10 }}>
                            <Label >Full Name</Label>
                            <Input style={{ marginTop: 10 }} onChangeText={name => this.setState({ name })} />
                        </Item>
                        <Item floatingLabel style={{ marginBottom: 10 }}>
                            <Label >Email</Label>
                            <Input style={{ marginTop: 10 }} onChangeText={email => this.setState({ email })} />
                        </Item>
                        <Item floatingLabel >
                            <Label>Password</Label>
                            <Input style={{ marginTop: 10 }} secureTextEntry onChangeText={password => this.setState({ password })} />
                        </Item>
                    </Form>
                    <Button style={style.btnLogin} onPress={this.submitRegis}>
                        <Text style={{ color: Color.TextLight, fontFamily: 'Roboto-Bold' }}>Register</Text>
                    </Button>
                </View>
            </View>
        )
    }
}

const Toast = (props) => {
    if (props.visible) {
        ToastAndroid.showWithGravityAndOffset(
            props.message,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            1,
            800,
        );
        return null;
    }
    return null;
};

const style = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Color.primary,
    },
    Text: {
        color: Color.TextLight
    },
    topContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

export default Regis
