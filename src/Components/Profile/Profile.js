import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import IconAnt from 'react-native-vector-icons/AntDesign';
import { Header } from 'native-base';
import Color from '../../../public/Style/Color'

export class Profile extends Component {
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
            <View>
                <Header
                    androidStatusBarColor={Color.indicator}
                    style={style.Header}>
                    <IconAnt name="arrowleft" size={24} color={Color.TextLight} onPress={this.goBack} style={style.Icon} />
                    <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold' }}>
                        Febriansyah
                    </Text>
                </Header>
                <Text> Hello User </Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
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
