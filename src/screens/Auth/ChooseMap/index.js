import React, { useEffect, Component, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from 'react-native-geolocation-service';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { openSettings } from 'react-native-permissions';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'
import { Appbar, TextInput, ActivityIndicator } from 'react-native-paper'
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import CardView from 'react-native-cardview';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import partyAPI from 'src/api/party';
import { Button } from 'react-native-elements'
import Spinner from 'react-native-spinkit'
import Icon from 'react-native-vector-icons/MaterialIcons';
const ContentTitle = ({ title, style }) => (
    <Appbar.Content
        title={<Text style={style}> {title} </Text>}
        style={{ alignItems: 'center' }}
    />
);

// Disable yellow box warning messages
// console.disableYellowBox = true;

class ChooseMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            region: {
                latitude: 10,
                longitude: 10,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
            },
            isMapReady: false,
            marginTop: 1,
            userLocation: "",
            regionChangeProgress: false
        };
    }

    componentWillMount() {
        check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
            result => {
                if (result === RESULTS.GRANTED) {
                    if (this.props.route.params.lat === 0 && this.props.route.params.long === 0) {
                        Geolocation.getCurrentPosition(
                            (position) => {
                                const region = {
                                    latitude: position.coords.latitude,
                                    longitude: position.coords.longitude,
                                    latitudeDelta: 0.001,
                                    longitudeDelta: 0.001
                                };
                                this.setState({
                                    region: region,
                                    loading: false,
                                    error: null,
                                });
                            },
                            (error) => {
                                alert(error);
                                this.setState({
                                    error: error.message,
                                    loading: false
                                })
                            },
                            { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 },
                        );
                    } else {
                        const region = {
                            latitude: this.props.route.params.lat,
                            longitude: this.props.route.params.long,
                            latitudeDelta: 0.001,
                            longitudeDelta: 0.001
                        };
                        this.setState({
                            region: region,
                            loading: false,
                            error: null,
                        });
                    }
                    return
                }
                if (result === RESULTS.DENIED) {
                    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
                        if (result === RESULTS.GRANTED) {
                            if (this.props.route.params.lat === 0 && this.props.route.params.long === 0) {
                                Geolocation.getCurrentPosition(
                                    (position) => {
                                        const region = {
                                            latitude: position.coords.latitude,
                                            longitude: position.coords.longitude,
                                            latitudeDelta: 0.001,
                                            longitudeDelta: 0.001
                                        };
                                        this.setState({
                                            region: region,
                                            loading: false,
                                            error: null,
                                        });
                                    },
                                    (error) => {
                                        alert(error);
                                        this.setState({
                                            error: error.message,
                                            loading: false
                                        })
                                    },
                                    { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 },
                                );
                            } else {
                                const region = {
                                    latitude: this.props.route.params.lat,
                                    longitude: this.props.route.params.long,
                                    latitudeDelta: 0.001,
                                    longitudeDelta: 0.001
                                };
                                this.setState({
                                    region: region,
                                    loading: false,
                                    error: null,
                                });
                            }
                            return
                        } if (result === RESULTS.DENIED) {
                            alert('Please')
                        } if (result === RESULTS.BLOCKED) {
                            alert('Bye')
                        }
                        return
                    });
                }
                if (result === RESULTS.BLOCKED) {
                    Alert.alert(
                        'Alert Title',
                        'Pesaseee',
                        [
                            {
                                text: 'Open settings', onPress: () => openSettings()
                            },
                            {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false },
                    );
                }
            }
        )
    }

    onMapReady = () => {
        this.setState({ isMapReady: true, marginTop: 0 });
    }

    // Update state on region change
    onRegionChange = region => {
        this.setState({
            region,
            regionChangeProgress: true
        });
    }
    back = () => {
        const { goBack } = this.props.navigation
        this.props.route.params.onGoBack(this.state.region.latitude, this.state.region.longitude)
        goBack()
    }
    render() {
        const { navigation } = this.props;


        if (this.state.loading) {
            return (
                <View style={styles.spinnerView}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        } else {
            return (
                <>
                    <SafeAreaView>
                        <Appbar.Header>
                            <Appbar.BackAction
                                onPress={() => navigation.goBack()}
                            />
                            <ContentTitle title='Choose Map' style={styles.contentTitle} />
                            <Appbar.Action />
                        </Appbar.Header>
                    </SafeAreaView>
                    <View style={styles.container}>
                        <View style={{ flex: 3 }}>
                            {!!this.state.region.latitude && !!this.state.region.longitude &&
                                <MapView
                                    style={{ ...styles.map, marginTop: this.state.marginTop }}
                                    initialRegion={this.state.region}
                                    showsUserLocation={true}
                                    onMapReady={this.onMapReady}
                                    onRegionChangeComplete={this.onRegionChange}
                                >
                                    <MapView.Marker
                                        coordinate={{ "latitude": this.state.region.latitude, "longitude": this.state.region.longitude }}
                                        title={"Your Location"}
                                        draggable
                                    />
                                </MapView>
                            }
                            <View style={styles.mapMarkerContainer}>
                                <Image
                                    // style={styles.logo}
                                    resizeMode="contain"
                                    source={require('src/assets/location.png')}
                                />
                            </View>
                        </View>
                        <View style={styles.deatilSection}>
                            <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "roboto", marginBottom: 20 }}>Move map for location</Text>
                            <Text style={{ fontSize: 10, color: "#999" }}>LOCATION</Text>
                            <Text style={{ fontSize: 14, paddingVertical: 5, borderBottomColor: "silver", borderBottomWidth: 0.5 }}>
                                latitude:{this.state.region.latitude} </Text>
                            <Text style={{ fontSize: 14, paddingVertical: 5, borderBottomColor: "silver", borderBottomWidth: 0.5 }}>
                                longitude : {this.state.region.longitude}
                            </Text>
                            <Button
                                color="#F2F1F0"
                                buttonStyle={styles.btn}
                                title="PICK THIS LOCATION"
                                onPress={this.back}
                            
                            >
                            </Button>
                        </View>
                    </View>
                </>
            );
        }
    }
}
export default function (props) {
    const navigation = useNavigation();

    return <ChooseMap {...props} navigation={navigation} />;
}