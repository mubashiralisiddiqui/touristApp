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
            // textInputValue: ''
            // textInputValue: 'restaurant'p

        }
    }

    getNearbyPlaces(selectedIndex) {
        let latlong = this.props.navigation.state.params
        console.log("=======", latlong.latitude, latlong.longitude)
        let typesArray = ['restaurant', 'park', 'bank', 'hospital'];
        let type = typesArray[selectedIndex];
        const apiKey = 'AIzaSyDoFwV1tzmS-NOL3LYrllrwhcefv--qGJs';
        // AIzaSyCDmDjoJ3kSzqn5Lj15SH63Ky3hdOUc6VU
        axios.get(url)
            .then(
            response => {
                console.log('fetch nearby success', response);
              
            })

            .catch(
            error => {
                console.log('fetch nearby error', error)
               
            })
        const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
        let lat = latlong.latitude;
        let lng = latlong.longitude;
        console.log(type);
        let completeUrl = `${url}location=${lat},${lng}&radius=1000&type=${type}&key=${apiKey}`;

        console.log('url', completeUrl)
        // this.props.fetch_data_nearby(completeUrl);
        axios.get(url)
            .then(
            response => {
                console.log('fetch nearby success', response.data);
               
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
            // <ScrollView>
            <View style={{ marginBottom: 20, paddingBottom: 40 }}>
                <Text> this is places</Text>
                {/* <ButtonGroup
                        onPress={()=>this.getNearbyPlaces()}
                        selectedIndex={selectedIndex}
                        buttons={buttons}
                        containerStyle={{ height: 50 }} /> */}


            </View>
            // </ScrollView>
        )
    }
}

export default NearbyPlaces

