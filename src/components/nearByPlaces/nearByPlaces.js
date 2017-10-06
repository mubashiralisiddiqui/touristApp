import React, { Component } from 'react'
import { Text, View, Button, FlatList, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'

import axios from 'axios';
import { ButtonGroup, Grid, Row, Col } from 'react-native-elements'
import { Card, ListItem } from 'react-native-elements'
// import ModalPicker from 'react-native-modal-picker'
class NearbyPlaces extends Component {
    constructor() {
        super()
        console.disableYellowBox = true;
        this.state = {
            selectedIndex: 0,
            type: 'restaurant',
            nearByplaces: []
        }
    }
    static navigationOptions = {
        title: 'Near By Places',
        headerTitleStyle: {
            color: 'white',
            fontFamily: 'Courier New',
            fontWeight: 'bold',
            fontSize: 20,
            justifyContent: 'space-between',
            textAlign: 'center',
        },
        headerStyle: {
            backgroundColor: '#2C3E50'
        }
    };
    getNearbyPlaces(selectedIndex) {
        let latlong = this.props.navigation.state.params
        console.log("=======", latlong.latitude, latlong.longitude)
        let typesArray = ['restaurant', 'park', 'bank', 'hospital'];
        let type = typesArray[selectedIndex];
        const apiKey = 'AIzaSyDoFwV1tzmS-NOL3LYrllrwhcefv--qGJs';
        const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
        let lat = latlong.latitude;
        let lng = latlong.longitude;
        console.log(type);
        let completeUrl = `${url}location=${lat},${lng}&radius=1000&type=${type}&key=${apiKey}`;

        console.log('url', completeUrl)
        axios.get(completeUrl)
            .then(
            response => {
                console.log('fetch nearby success', response.data.results);
                let result = response.data.results
                this.setState({ nearByplaces: result })
            })
            .catch(
            error => {
                console.log('fetch nearby error', error)
            })
    }

    componentDidMount() {
        let latlong = this.props.navigation.state.params;
        this.getNearbyPlaces(0);
    }
    render() {
        console.log(this.props)
        const buttons = ['Restautrants', 'Parks', 'Banks', 'Hospitals']
        const { selectedIndex } = this.state

        return (
            <View style={{ marginBottom: 20, paddingBottom: 40 }}>
                <ScrollView>
                    {this.state.nearByplaces.map((d, i) => {
                        console.log("map data", d)
                        return (
                            <ListItem
                                key={i}
                                roundAvatar
                                title={d.name}
                                subtitle={"Rating " + d.rating}
                                avatar={{ uri: d.icon }}
                            >

                            </ListItem>
                        )
                    })}
                </ScrollView>



            </View>
        )
    }
}

export default NearbyPlaces

