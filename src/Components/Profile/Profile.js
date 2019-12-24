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
            name: ''
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
        const { displayName } = firebase.auth().currentUser
        this.setState({ name: displayName })
    }

    render() {
        return (
            <>
                <Header
                    androidStatusBarColor={Color.indicator}
                    style={style.Header}>
                    <IconAnt name="arrowleft" size={24} color={Color.TextLight} onPress={this.goBack} style={style.Icon} />
                    <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold' }}>
                        {this.state.name}
                    </Text>
                </Header>
                <View style={style.container}>
                    <TouchableHighlight onPress={this.Logout}>
                        <Text>Logout</Text>
                    </TouchableHighlight>
                </View>
            </>
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
