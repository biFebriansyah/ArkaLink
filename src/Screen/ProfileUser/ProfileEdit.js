import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, PermissionsAndroid, ActivityIndicator } from 'react-native'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { Header } from 'native-base';
import { Button, Item, Input, Label, Form } from 'native-base';
import Color from '../../../public/Style/Color'
import ImagePicker from 'react-native-image-crop-picker';
import { firebase } from '@react-native-firebase/storage';
import uuid from 'uuid/v4';

export class ProfileEdit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loding: false,
            displayName: '',
            uid: '',
            email: '',
            password: '',
            photoURL: 'https://res.cloudinary.com/cloudinara/image/upload/v1577427303/Avatar/boy_dcc9kc.png',
            imgSource: ''
        }
    }

    componentDidMount() {
        const { displayName, email, photoURL, uid } = auth().currentUser
        this.setState({ displayName, email, photoURL, uid })
    }

    goBack = () => {
        const { goBack } = this.props.navigation;
        goBack();
    }

    uploadImage = async () => {
        if (!this.state.imgSource) { return }
        this.setState({ loding: true })
        const ext = this.state.imgSource.path.split('.').pop(); // Extract image extension
        const filename = `${uuid()}.${ext}`; // Generate unique name
        this.setState({ uploading: true });
        const dataRef = firebase.storage().ref(`userImages/${filename}`)
        dataRef.putFile(this.state.imgSource.path)
            .then(async () => {
                const url = await dataRef.getDownloadURL()
                await auth().currentUser.updateProfile({ displayName: this.state.displayName, photoURL: url })
                await database()
                    .ref('users/' + this.state.uid)
                    .update({ photo: url, name: this.state.displayName });

                this.goBack()
            })
    };

    selectImage = async () => {
        try {
            const Camera = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)
            if (Camera === PermissionsAndroid.RESULTS.GRANTED) {
                ImagePicker.openPicker({
                    width: 200,
                    height: 200,
                    cropping: true
                }).then(image => {
                    console.log(image.path);
                    this.setState({ imgSource: image, photoURL: image.path })
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        if (this.state.loding) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <>
                <Header
                    androidStatusBarColor={Color.indicator}
                    style={style.Header}>
                    <IconAnt name="arrowleft" size={24} color={Color.TextLight} onPress={this.goBack} style={style.Icon} />

                </Header>
                <View style={style.container}>
                    <View style={style.topContent}>
                        <TouchableOpacity style={style.AvatarContainer} onPress={this.selectImage}>
                            <Image style={style.Avatar} source={{ uri: this.state.photoURL }} />
                        </TouchableOpacity>
                    </View>
                    <View style={style.dataUser}>
                        <Form style={style.form}>
                            <Item floatingLabel style={{ marginBottom: 10 }}>
                                <Label >Full Name</Label>
                                <Input style={{ marginTop: 10 }} onChangeText={displayName => this.setState({ displayName })} value={this.state.displayName} />
                            </Item>
                        </Form>
                        <Button style={style.btnLogin} onPress={this.uploadImage}>
                            <Text style={{ color: Color.TextLight, fontFamily: 'Roboto-Bold' }}>save</Text>
                        </Button>
                    </View>
                </View>
            </>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    btnLogin: {
        width: 200,
        backgroundColor: Color.primary,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Avatar: {
        width: null,
        height: null,
        resizeMode: "cover",
        flex: 1,
        borderRadius: 110
    },
    topContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    AvatarContainer: {
        width: 150,
        height: 150,
    },
    dataUser: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        width: '80%',
        marginBottom: 50,
    },
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
    },
    Icon: {
        marginRight: 20
    },

})

export default ProfileEdit
