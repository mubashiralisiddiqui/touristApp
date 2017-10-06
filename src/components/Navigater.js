import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Button
} from 'react-native';
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';

import RNGooglePlaces from 'react-native-google-places';

class RnDirections extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: null,
      lng: null,
      coords: []
    }
  }

  static navigationOptions = {
    header: null
  }
  // async getDirectin_handler() {
  //   let latlong = this.props.navigation.state.params
  //   console.log('get direc success')
  //   try {
  //     let url = 'https://maps.googleapis.com/maps/api/directions/json?origin=';
  //     let completeUrl = `${url}${latlong.latitude},${latlong.longitude}&destination=${this.state.lat},${this.state.lng}`;
  //     console.log('url', completeUrl)
  //     let resp = await fetch(completeUrl)
  //     let respJson = await resp.json();
  //     let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
  //     let coords = points.map((point, index) => {
  //       return {
  //         latitude: point[0],
  //         longitude: point[1]
  //       }
  //     })

  //     this.setState({ coords: coords })
  //     return coords
  //   } catch (error) {
  //     // alert(error)
  //     // return error
  //     console.log('get dir error', error);
  //   }
  // }
  async getDirections(startLoc, destinationLoc) {
    try {
        let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
        let respJson = await resp.json();
        let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
        let coords = points.map((point, index) => {
            return  {
                latitude : point[0],
                longitude : point[1]
            }
        })
        this.setState({coords: coords})
        return coords
    } catch(error) {
        return error
    }
}

  openSearchModal() {
    let latlong = this.props.navigation.state.params
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        this.setState({
          lat: place.latitude,
          lng: place.longitude
        })
        console.log('nav state', this.state)

      })
      .then(() => {
        this.getDirections(latlong.latitude,latlong.longitude,this.state.lat,this.state.lng);
      })
      .catch((error) => console.log(error));
  }

  render() {
    console.log('props', this.props)
    return (
      <View>
        {/* <MapView style={styles.map} region={this.props.location} > */}
        <MapView.Polyline 
        coordinates={this.state.coords}
        strokeWidth={2}
        strokeColor="red"/>

        {/* </MapView> */}
        <View>
          <Button title="Give your destination" onPress={() => this.openSearchModal()}
            color="#373F46"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  btnStyle: {
    backgroundColor: '#373F46',
    color: "#F8B71D",
  }
});




export default RnDirections
