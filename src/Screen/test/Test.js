import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Color from '../../../public/Style/Color';
import Material from 'react-native-vector-icons/MaterialCommunityIcons'
import { SearchBar } from 'react-native-elements';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            uid: '',
            id: '',
            email: '',
            displayName: '',
            loding: false
        };
    }

    componentDidMount() {
        const { email, displayName, uid } = firebase.auth().currentUser;
        this.setState({ email, displayName, uid: uid, loding: true });
        this.getDataUser(uid)
        this.setStatus(uid)
    }

    async getDataUser(uid) {
        this.setState({ uid: uid, refreshing: true });
        await database().ref('/users').on('child_added', data => {
            let person = data.val();
            if (person.id !== uid) {
                this.setState(prevData => {
                    return { userList: [...prevData.userList, person] };
                });
            }
            this.setState({ loding: false })
        });
    }

    async setStatus(uid) {
        try {
            database()
                .ref('users/' + uid)
                .update({ status: 'Online' });
        } catch (error) {
            console.log(error)
        }
    }

    searchFilterFunction = text => {
        this.setState({
            value: text,
        });

        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.name.toUpperCase()} ${item.skill.toUpperCase()} ${item.location.toUpperCase()}`;
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData,
        });
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '86%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '14%',
                }}
            />
        );
    };

    renderHeader = () => {
        return (
            <SearchBar
                placeholder="Search"
                lightTheme
                round
                onChangeText={text => this.searchFilterFunction(text)}
                autoCorrect={false}
                value={this.state.value}
            />
        );
    };

    render() {
        if (this.state.loding) {
            return (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.userList}
                    renderItem={({ item }) =>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('PersonalChat', { item })}>
                            <View style={styles.listItem}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('maps', { item })}>
                                    <Image source={{ uri: item.photo }} style={styles.pic} />
                                </TouchableOpacity>

                                <View style={styles.Listtitle}>
                                    <Text style={{ fontWeight: "bold", fontSize: 18, color: Color.textDark }}>{item.name}</Text>
                                    <Text style={styles.email}>{item.email}</Text>
                                    <Text style={styles.email}> </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                                    {item.status == 'Online' ? (
                                        <Material name='circle-slice-8' size={20} color='#13e82f' />
                                    ) : (
                                            <Material name='circle-slice-8' size={20} color='#ff1100' />
                                        )}

                                </View>
                            </View>
                        </TouchableOpacity>

                    }
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.TextLight,
        marginTop: 0,
    },
    listItem: {
        padding: 10,
        backgroundColor: "#fafafafa",
        width: "100%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        alignItems: 'center'
    },
    Listtitle: {
        borderBottomWidth: 1,
        borderColor: '#E9ECEF',
        flex: 8,
        marginLeft: 10,
    },
    divider: {
        marginVertical: 5,
        width: "99%",
        borderWidth: 1,
        borderColor: "#E9ECEF"
    },
    fieldRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        padding: 10,
    },
    pic: {
        borderRadius: 30,
        width: 55,
        height: 55,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '600',
        color: '#222',
        fontSize: 18,
        width: 170,
    },
    status: {
        fontWeight: '200',
        color: '#ccc',
        fontSize: 13,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
    },
    statusol: {
        fontWeight: '400',
        color: Color.primary,
        fontSize: 12,
        marginLeft: 15,
    },
    email: {
        fontWeight: '400',
        color: Color.textDark,
        fontSize: 12,
    },
});
