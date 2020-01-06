import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableHighlight, Image, TouchableOpacity } from 'react-native'
import Color from '../../../public/Style/Color';
import { firebase } from '@react-native-firebase/auth';
import Iconaa from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/AntDesign';
import IonIcon from 'react-native-vector-icons/Ionicons';

export class Profile extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: <Text style={{ fontSize: 20, color: '#fff' }}>Profile</Text>,
            headerStyle: {
                backgroundColor: Color.primary,
            },
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.goBack()}
                    style={{ padding: 10 }}>
                    <Icon size={27} name='arrowleft' style={{ color: '#fff' }} type='AntDesign' />
                </TouchableOpacity>
            )
        };
    }

    constructor(props) {
        super(props)

        this.state = {
            data: {},
            avatar: 'https://res.cloudinary.com/cloudinara/image/upload/v1577427303/Avatar/boy_dcc9kc.png',
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
        console.log(data)
    }

    goMap = () => {
        const item = this.state.data
        this.props.navigation.navigate('maps', { item })
    }

    render() {
        return (
            <View style={style.container}>
                <View style={style.topContent}>
                    <View style={style.AvatarContainer}>
                        <Image source={{ uri: this.state.data.photo }} style={style.Avatar} />
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
                            <Text style={{ fontSize: 15, marginLeft: 6, color: '#888' }}>{this.state.data.name}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 40, marginLeft: 29, }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Iconaa name="email-box" size={20} style={{ width: 20, height: 20, color: "black" }} />
                            <Text style={{ fontSize: 16, marginLeft: 6 }}>Email</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Iconaa size={20} style={{ width: 20, height: 20, color: "black" }} />
                            <Text style={{ fontSize: 15, marginLeft: 6, color: '#888' }}>{this.state.data.email}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 40, marginLeft: 29, }} onPress={this.goMap}>
                        <View style={{ flexDirection: 'row' }}>
                            <Iconaa name="google-maps" size={20} style={{ width: 20, height: 20, color: "black" }} />
                            <Text style={{ fontSize: 16, marginLeft: 6 }}>Map</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon size={20} style={{ width: 20, height: 20, color: "black" }} />
                            <Text style={{ fontSize: 15, marginLeft: 6, color: '#888' }}>See on the map</Text>
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
        backgroundColor: Color.primary
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
        backgroundColor: Color.primary
    },
    AvatarContainer: {
        width: 120,
        height: 120,
    },
    dataUser: {
        flex: 2,
        paddingTop: 50,
        backgroundColor: Color.TextLight,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    }
})

export default Profile
