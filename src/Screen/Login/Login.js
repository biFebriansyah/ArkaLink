import React, { Component } from 'react'
import { View, StyleSheet, StatusBar, Image, Text, ToastAndroid, ActivityIndicator } from 'react-native'
import Color from '../../../public/Style/Color';
import { Button, Item, Input, Label, Form } from 'native-base';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import fcm from '@react-native-firebase/messaging';

export class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            visible: false,
            errorMessage: null,
            Onprosess: false,
            latitude: '',
            longitude: '',
            fcmToken: ''
        }

        this.goBack = this.goBack.bind(this);
        this.loginSubmit = this.loginSubmit.bind(this)
    }

    goBack() {
        const { goBack } = this.props.navigation;
        goBack();
    }

    hideToast = () => {
        this.setState({
            visible: false,
        });
    };

    getfcmToken = async () => {
        try {
            let enable = await fcm().hasPermission()
            if (!enable) {
                const getPermission = await fcm().requestPermission()
                enable = getPermission
            }
            if (enable) {
                const token = await fcm().getToken()
                return token
            }
        } catch (error) {
            console.log(error)
        }
    }

    async componentDidMount() {
        try {
            const Location = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            const Storage = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
            if (Location === PermissionsAndroid.RESULTS.GRANTED) {
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

        } catch (error) {
            this.setState({
                errorMessage: "SomeThing Worng",
                visible: true
            }, () => {
                this.hideToast()
            })
        }
    }

    hideToast = () => {
        this.setState({
            visible: false,
        });
    };



    loginSubmit = () => {
        this.setState({ Onprosess: true })
        const { email, password } = this.state

        if (!email || !password) {
            this.setState({
                errorMessage: "name, email and password isEmpty",
                visible: true,
                Onprosess: false
            }, () => {
                this.hideToast()
            })
            return
        }
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                this.setState({ Onprosess: false })
                firebase.auth().onAuthStateChanged(user => {
                    this.props.navigation.navigate(user ? 'App' : 'Auth')
                })
            })
            .catch(err => {
                this.setState({
                    errorMessage: err.message,
                    Onprosess: false,
                    visible: true
                }, () => this.hideToast())
            })
    }

    loginGoole = async () => {
        this.setState({ Onprosess: true })
        try {
            const token = await this.getfcmToken()
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const { idToken, accessToken } = userInfo
            const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken)
            await firebase.auth().signInWithCredential(credential)
                .then(res => {
                    const data = database().ref(`/users/${res.user.uid}`)
                    if (data) {
                        database().ref('/users/' + res.user.uid)
                            .update({
                                name: userInfo.user.name,
                                status: 'Online',
                                email: userInfo.user.email,
                                photo: userInfo.user.photo,
                                latitude: this.state.latitude || null,
                                longitude: this.state.longitude || null,
                                id: res.user.uid,
                                fcmToken: token
                            })
                    } else {
                        database().ref('/users/' + res.user.uid)
                            .set({
                                name: userInfo.user.name,
                                status: 'Online',
                                email: userInfo.user.email,
                                photo: userInfo.user.photo,
                                latitude: this.state.latitude || null,
                                longitude: this.state.longitude || null,
                                id: res.user.uid,
                                fcmToken: token
                            })
                    }
                    firebase.auth().onAuthStateChanged(user => {
                        this.props.navigation.navigate(user ? 'App' : 'Auth')
                    })
                })
                .catch(err => {
                    this.setState({
                        errorMessage: err,
                        Onprosess: false,
                        visible: true
                    }, () => this.hideToast())
                })
            this.setState({ Onprosess: false })

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                this.setState({ Onprosess: false })
                return
            } else if (error.code === statusCodes.IN_PROGRESS) {
                this.setState({
                    errorMessage: "In Progress..",
                    visible: true,
                    Onprosess: false
                }, () => this.hideToast())
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                this.setState({
                    errorMessage: "Please Install Google Play Services",
                    visible: true,
                    Onprosess: false
                }, () => this.hideToast())
            } else {
                this.setState({
                    errorMessage: error.code || error.message,
                    visible: true,
                    Onprosess: false
                }, () => this.hideToast())
            }
        }


    }

    render() {
        if (this.state.Onprosess) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            );
        }
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
                            <Label >Email</Label>
                            <Input style={{ marginTop: 10 }} onChangeText={email => this.setState({ email })} />
                        </Item>
                        <Item floatingLabel >
                            <Label>Password</Label>
                            <Input style={{ marginTop: 10 }} secureTextEntry onChangeText={password => this.setState({ password })} />
                        </Item>
                    </Form>
                    <Button style={style.btnLogin} onPress={this.loginSubmit}>
                        <Text style={{ color: Color.TextLight, fontFamily: 'Roboto-Bold' }}>Login</Text>
                    </Button>
                    <Button style={style.btnLogin2} onPress={this.loginGoole}>
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

GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    webClientId: '321503427583-gef12gpoeg0ii8pcqldga97i4eimunu7.apps.googleusercontent.com',
})


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
        backgroundColor: Color.TextLight,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40
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
