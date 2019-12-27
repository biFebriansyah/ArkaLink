import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    Platform,
    PermissionsAndroid,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Color from '../../../public/Style/Color';
import { firebase } from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons'

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class Mapss extends Component {
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
        // const uid = await AsyncStorage.getItem('userid');
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
    } getUser = async () => {
        const uid = await AsyncStorage.getItem('userid');
        this.setState({ uid: uid });
        firebase.database().ref('/user').on('child_added', result => {
            let data = result.val();
            if (data !== null && data.id != uid) {
                // console.log(data);
                // let users = Object.values(data);
                // console.log(users);
                this.setState(prevData => {
                    return { userList: [...prevData.userList, data] };
                });
            }
        });
    };

    hasLocationPermission = async () => {
        if (
            Platform.OS === 'ios' ||
            (Platform.OS === 'android' && Platform.Version < 23)
        ) {
            return true;
        }
        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (hasPermission) {
            return true;
        }
        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }
        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show(
                'Location Permission Denied By User.',
                ToastAndroid.LONG,
            );
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show(
                'Location Permission Revoked By User.',
                ToastAndroid.LONG,
            );
        }
        return false;
    };

    getLocation = async () => {
        const hasLocationPermission = await this.hasLocationPermission();

        if (!hasLocationPermission) {
            return;
        }

        this.setState({ loading: true }, () => {
            Geolocation.getCurrentPosition(
                position => {
                    let region = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.00922,
                        longitudeDelta: 0.00421 * 1.5,
                    };
                    this.setState({
                        mapRegion: region,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        loading: false,
                    });
                    // console.warn(position);
                },
                error => {
                    this.setState({ errorMessage: error });
                    // console.warn(error);
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
                    style={{ width: '100%', height: '90%' }}
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
                                    latitude: item.latitude || 0,
                                    longitude: item.longitude || 0,
                                }}
                                onCalloutPress={() => {
                                    this.props.navigation.navigate('FriendProfile', {
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
                <TouchableOpacity onPress={() => this.getLocation()}>
                    <View style={styles.menuBottom}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon name="my-location" size={25} color={Color.textDark} />
                            <Text
                                style={styles.buttonText}
                            >
                                My Location
                </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.secondary,
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

export default Mapss;