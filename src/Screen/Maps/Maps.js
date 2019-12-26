import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import Color from '../../../public/Style/Color';


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
            }
        }
    }


    markerOnPress = () => {
        const newRegion = { ...this.state.region }
        newRegion.latitudeDelta = 0.0043
        newRegion.longitudeDelta = 0.0034
        this.setState({ region: newRegion })
    }

    async componentDidMount() {
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


    render() {

        return (
            <View>
                <View style={styles.container}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={this.state.region}

                    >
                        <Marker
                            coordinate={this.state.marker}
                            title="ebiebi"
                            description="Im here"
                            onPress={this.markerOnPress}
                            pinColor={Color.primary}
                        />
                    </MapView>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        width: 500,
        height: 400,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default Maps
