import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import Color from '../../../public/Style/Color';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export class Maps extends Component {

    constructor(props) {
        super(props)

        this.state = {
            region: {
                latitude: -6.200000,
                longitude: 106.816666,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            marker: {
                latitude: 0,
                longitude: 0,
            },
            user: {},
        }
    }


    markerOnPress = () => {
        const newRegion = { ...this.state.region }
        newRegion.latitudeDelta = 0.0043
        newRegion.longitudeDelta = 0.0034
        this.setState({ region: newRegion })
    }

    gateUserCoordinate = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords
                        const newMarker = { ...this.state.marker }
                        const newRegion = { ...this.state.region }
                        newRegion.latitude = latitude
                        newRegion.longitude = longitude
                        newMarker.latitude = latitude
                        newMarker.longitude = longitude
                        this.setState({ marker: newMarker, region: newRegion })
                    },
                    (error) => {
                        console.log(error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            } else {
                console.log("permission denied")
            }
        } catch (err) {
            console.warn(err)
        }
    }

    async componentDidMount() {
        const data = this.props.navigation.getParam('item')
        const lat = Number(data.latitude)
        const log = Number(data.longitude)
        const newMarker = { ...this.state.marker }
        const newRegion = { ...this.state.region }
        newMarker.latitude = lat
        newMarker.longitude = log
        newRegion.latitude = lat
        newRegion.longitude = log

        this.setState({ marker: newMarker, user: data, region: newRegion })
    }


    render() {
        console.log(this.state.marker)
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
                        latitude: Number(this.state.region.latitude),
                        longitude: Number(this.state.region.longitude),
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}>
                    <Marker
                        key={this.state.user.id}
                        title={this.state.user.name}
                        description={this.state.user.status}
                        coordinate={{
                            latitude: Number(this.state.marker.latitude) || 0,
                            longitude: Number(this.state.marker.longitude) || 0,
                        }}
                    >
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                source={{ uri: this.state.user.photo }}
                                style={{ width: 40, height: 40, borderRadius: 50, }}
                            />
                            <Text style={{ fontSize: 10 }}>{this.state.user.name}</Text>
                        </View>
                    </Marker>
                </MapView>
            </View>
        )
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

export default Maps
