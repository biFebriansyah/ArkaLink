import React, { Component } from 'react'
import { View, StyleSheet, StatusBar, Image, Text, ToastAndroid, ActivityIndicator } from 'react-native'
import Color from '../../../public/Style/Color';
import { Button, Item, Input, Label, Form } from 'native-base';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import fcm from '@react-native-firebase/messaging';


export class Regis extends Component {
    constructor(props) {
        super(props)

        this.state = {
            latitude: '',
            longitude: '',
            fcmToken: '',
            name: '',
            email: '',
            password: '',
            errorMessage: null,
            Onprosess: false,
            visible: false,
            avatar: [
                'https://res.cloudinary.com/cloudinara/image/upload/v1577427303/Avatar/girl_iylyng.png',
                'https://res.cloudinary.com/cloudinara/image/upload/v1577427303/Avatar/boy_dcc9kc.png',
                'https://res.cloudinary.com/cloudinara/image/upload/v1577427303/Avatar/man-2_vhufzn.png',
                'https://res.cloudinary.com/cloudinara/image/upload/v1577427302/Avatar/girl-1_en0ah7.png',
                'https://res.cloudinary.com/cloudinara/image/upload/v1577427302/Avatar/boy-1_rhr0he.png',
                'https://res.cloudinary.com/cloudinara/image/upload/v1577427302/Avatar/man-3_vwm5af.png',
                'https://res.cloudinary.com/cloudinara/image/upload/v1577427302/Avatar/man-4_qvepsq.png',
                'https://res.cloudinary.com/cloudinara/image/upload/v1577427302/Avatar/man-1_qr0u7e.png',
                'https://res.cloudinary.com/cloudinara/image/upload/v1577427302/Avatar/man_jzqwnf.png'
            ]
        }
        this.goBack = this.goBack.bind(this)
        this.submitRegis = this.submitRegis.bind(this);
    }

    goBack() {
        const { goBack } = this.props.navigation;
        goBack();
    }

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

    async submitRegis() {
        this.setState({ Onprosess: true })
        const token = await this.getfcmToken()
        const { name, email, password } = this.state
        const random = Math.floor(Math.random() * 9)
        const ImageUser = this.state.avatar[random]

        if (!name || !email || !password) {
            this.setState({
                errorMessage: "name, email and password isEmpty",
                visible: true
            }, () => {
                this.hideToast()
            })
            this.setState({ Onprosess: false })
            return
        }
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => {
                database().ref('/users/' + res.user.uid)
                    .set({
                        name: this.state.name,
                        status: 'Online',
                        email: this.state.email,
                        photo: ImageUser,
                        latitude: this.state.latitude || null,
                        longitude: this.state.longitude || null,
                        fcmToken: token,
                        id: res.user.uid,
                    })
                res.user.updateProfile({
                    displayName: this.state.name,
                    photoURL: ImageUser
                })
            })
            .catch(err => {
                this.setState({
                    errorMessage: err.message,
                    visible: true
                }, () => {
                    this.hideToast()
                })
                this.setState({ Onprosess: false })
            })
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

export default Regis
