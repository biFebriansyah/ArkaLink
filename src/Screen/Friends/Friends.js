import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    PermissionsAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Color from '../../../public/Style/Color';
import { firebase } from '@react-native-firebase/auth';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class Friends extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initial: 'state',
            mapRegion: null,
            latitude: 0,
            longitude: 0,
            userList: [],
            uid: null,
        };
    }

    componentDidMount = async () => {
        await this.getUser();
        await this.getLocation();
    };

    markerOnPress = () => {
        const newRegion = { ...this.state.region };
        newRegion.latitudeDelta = 0.0043;
        newRegion.longitudeDelta = 0.0034;
        this.setState({ region: newRegion });
    };

    async componentDidMount() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    position => {
                        const { latitude, longitude } = position.coords;
                        const newMarker = { ...this.state.marker };
                        const newRegion = { ...this.state.region };
                        newRegion.latitude = latitude;
                        newRegion.longitude = longitude;
                        newMarker.latitude = latitude;
                        newMarker.longitude = longitude;
                        this.setState({ marker: newMarker, region: newRegion });
                    },
                    error => {
                        console.log(error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                );
            } else {
                console.log('permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }
    getUser = async () => {
        const uid = await AsyncStorage.getItem('userid');
        this.setState({ uid: uid });
        firebase.database().ref('/users').on('child_added', result => {
            let data = result.val();
            if (data !== null && data.id != uid) {
                this.setState(prevData => {
                    return { userList: [...prevData.userList, data] };
                });
            }
        });
    };



    getLocation = async () => {

        this.setState({ loading: true }, () => {
            Geolocation.getCurrentPosition(
                position => {
                    let region = {
                        latitude: Number(position.coords.latitude),
                        longitude: Number(position.coords.longitude),
                        latitudeDelta: 0.00922,
                        longitudeDelta: 0.00421 * 1.5,
                    };
                    this.setState({
                        mapRegion: region,
                        latitude: Number(position.coords.latitude),
                        longitude: Number(position.coords.longitude),
                        loading: false,
                    });
                },
                error => {
                    this.setState({ errorMessage: error });
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 10000,
                    distanceFilter: 50,
                    forceRequestLocation: true,
                },
            );
        });
    };

    render() {
        return (


            <View
                style={[
                    styles.container,
                    {
                        justifyContent: 'flex-start',
                        paddingHorizontal: 10,
                        paddingTop: 10,
                    },
                ]}>
                <MapView
                    style={{ width: '100%', height: '100%' }}
                    showsMyLocationButton={true}
                    showsIndoorLevelPicker={true}
                    showsUserLocation={true}
                    zoomControlEnabled={true}
                    showsCompass={true}
                    showsTraffic={true}
                    region={this.state.mapRegion}
                    initialRegion={{
                        latitude: -7.755322,
                        longitude: 110.381174,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}>
                    {this.state.userList.map(item => {
                        // console.warn(item);
                        return (
                            <Marker
                                key={item.id}
                                title={item.name}
                                description={item.status}
                                coordinate={{
                                    latitude: Number(item.latitude) || 0,
                                    longitude: Number(item.longitude) || 0,
                                }}
                                onCalloutPress={() => {
                                    this.props.navigation.navigate('PerofileFriends', {
                                        item,
                                    });
                                }}>
                                <View style={{ alignItems: 'center' }}>
                                    <Image
                                        source={{ uri: item.photo }}
                                        style={{ width: 40, height: 40, borderRadius: 50, }}
                                    />
                                    <Text style={{ fontSize: 10 }}>{item.name}</Text>
                                </View>
                            </Marker>
                        );
                    })}
                </MapView>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.TextLight,
    },
    menuBottom: {
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: 5,
        marginVertical: 10,
        borderRadius: 10,
        width: width - 16,
        height: 50,
        backgroundColor: Color.lightAcent,
    },
    buttonText: {
        color: Color.textDark,
        fontSize: 16,
        marginLeft: 5,
        fontWeight: 'bold'
    },
});

export default Friends;