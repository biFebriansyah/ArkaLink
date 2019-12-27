import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, } from 'react-native'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import IconAnt from 'react-native-vector-icons/AntDesign';
import { Header } from 'native-base';
import { Button, Item, Input, Label, Form } from 'native-base';
import Color from '../../../public/Style/Color'

export class ProfileEdit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayName: '',
            email: '',
            password: '',
            photoURL: 'https://res.cloudinary.com/cloudinara/image/upload/v1577427303/Avatar/boy_dcc9kc.png'
        }
    }

    componentDidMount() {
        const { displayName, email, photoURL } = auth().currentUser
        this.setState({ displayName, email, photoURL })
    }

    goBack = () => {
        const { goBack } = this.props.navigation;
        goBack();
    }

    render() {
        return (
            <>
                <Header
                    androidStatusBarColor={Color.indicator}
                    style={style.Header}>
                    <IconAnt name="arrowleft" size={24} color={Color.TextLight} onPress={this.goBack} style={style.Icon} />

                </Header>
                <View style={style.container}>
                    <View style={style.topContent}>
                        <TouchableOpacity style={style.AvatarContainer}>
                            <Image style={style.Avatar} source={{ uri: this.state.photoURL }} />
                        </TouchableOpacity>
                    </View>
                    <View style={style.dataUser}>
                        <Form style={style.form}>
                            <Item floatingLabel style={{ marginBottom: 10 }}>
                                <Label >Full Name</Label>
                                <Input style={{ marginTop: 10 }} onChangeText={displayName => this.setState({ displayName })} value={this.state.displayName} />
                            </Item>
                            <Item floatingLabel style={{ marginBottom: 10 }}>
                                <Label >Email</Label>
                                <Input style={{ marginTop: 10 }} onChangeText={email => this.setState({ email })} value={this.state.email} />
                            </Item>
                            <Item floatingLabel >
                                <Label>Password</Label>
                                <Input style={{ marginTop: 10 }} secureTextEntry onChangeText={password => this.setState({ password })} />
                            </Item>
                        </Form>
                        <Button style={style.btnLogin}>
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
