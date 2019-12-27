import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native'
import IconAnt from 'react-native-vector-icons/AntDesign';
import { Header } from 'native-base';
import Color from '../../../public/Style/Color';
import { firebase } from '@react-native-firebase/auth';

export class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }
        this.goBack = this.goBack.bind(this);
    }

    goBack() {
        const { goBack } = this.props.navigation;
        goBack();
    }

    Logout = () => {
        firebase.auth().signOut()
    }

    componentDidMount() {
        const data = this.props.navigation.getParam('item')
        this.setState({ data })
    }

    render() {
        return (
            <View style={style.container}>
                <View style={style.topContent}>
                    <View style={style.AvatarContainer}>
                        <Image source={{ uri: this.state.avatar }} style={style.Avatar} />
                    </View>
                </View>
                <View style={style.dataUser}>
                    <TouchableOpacity style={{ marginLeft: 29, flexDirection: 'column', }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icons name="user" size={20} style={{ width: 20, height: 20, color: "black" }} />
                            <Text style={{ fontSize: 16, marginLeft: 6 }}>Nama</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Iconaa size={20} style={{ width: 20, height: 20, color: "black" }} />
                            <Text style={{ fontSize: 15, marginLeft: 6, color: '#888' }}>test</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 40, marginLeft: 29, }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Iconaa name="email-box" size={20} style={{ width: 20, height: 20, color: "black" }} />
                            <Text style={{ fontSize: 16, marginLeft: 6 }}>Email</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Iconaa size={20} style={{ width: 20, height: 20, color: "black" }} />
                            <Text style={{ fontSize: 15, marginLeft: 6, color: '#888' }}>{this.state.email}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 40, marginLeft: 29, }} onPress={this.goEdit}>
                        <View style={{ flexDirection: 'row' }}>
                            <IonIcon name="ios-options" size={20} style={{ width: 20, height: 20, color: "black" }} />
                            <Text style={{ fontSize: 16, marginLeft: 6 }}>Option</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon size={20} style={{ width: 20, height: 20, color: "black" }} />
                            <Text style={{ fontSize: 15, marginLeft: 6, color: '#888' }}>setting youre account</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 40, marginLeft: 29, }} onPress={this.signOutUser}>
                        <View style={{ flexDirection: 'row' }}>
                            <Iconaa name="logout" size={20} style={{ width: 20, height: 20, color: "black" }} />
                            <Text style={{ fontSize: 16, marginLeft: 6 }}>Logout</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon size={20} style={{ width: 20, height: 20, color: "black" }} />
                            <Text style={{ fontSize: 15, marginLeft: 6, color: '#888' }}>Logout user</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

export default Profile
