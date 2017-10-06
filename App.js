import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  View,
  ScrollView
} from 'react-native';
import MapView from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import Polyline from '@mapbox/polyline';

// import PolyLine from './src/components/Navigater'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});
const location = {
  latitude: 24.8841584,
  longitude: 67.1379614,
  latitudeDelta: 0.0002,
  longitudeDelta: 0.0021,
}
let copy = Object.assign({}, location)
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: 67.0099,
      latitude: 24.8615,
      modalVisible: false,
      placeRating: 'n/a',
      placeAddress: 'n/a',
      placeName: 'n/a',
      placePhone: 'n/a',
      placeWebsite: 'n/a',
      isPlaceInfo: false,
      lat: null,
      lng: null,
      coords: []
    }
  }
  static navigationOptions = {
    header: null
  }
  componentDidMount() {
  //  this.getDirections("40.1884979, 29.061018", "41.0082,28.9784")
    console.log("didmount runinig")
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        console.log("position cords", position)
        this.setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        })
      },
      (error) => {
        console.log('error', error)
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  async getDirections(startLoc, destinationLoc) {
    console.log("getDirection==>",startLoc,destinationLoc)
    const key = 'AIzaSyACp-ZZT3Oxc8zltot-o2fU5PkSjda0Its'
    // 'https://maps.googleapis.com/maps/api/directions/json?origin=24.9077065,67.0632784&destination=24.9077065,67.0632784&key=AIzaSyACp-ZZT3Oxc8zltot-o2fU5PkSjda0Its'
    let url =`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${key}`;
    console.log('url ready',url)
    try {
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${key}`)
      let respJson = await resp.json();
      console.log("response",respJson)
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        }
      })
      this.setState({ coords: coords })
      return coords
    } catch (error) {
      return error
    }
  }
  openSearchModal() {
    console.log("serach modal")
    RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
        console.log('place info', place);
        let location = {
          latitude: place.latitude,
          longitude: place.longitude,
          latitudeDelta: copy.latitudeDelta,
          longitudeDelta: copy.longitudeDelta,
        }
        this.setState({
          latitude: place.latitude,
          longitude: place.longitude,
          placeRating: place.rating,
          placeName: place.name,
          placeAddress: place.address,
          placePhone: place.phoneNumber,
          placeWebsite: place.website,
          isPlaceInfo: true
        })
        this.getDirections(`${location.latitude},${location.longitude},`,`${this.state.latitude},${this.state.longitude}`)
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        {console.log("lat lon==>", this.state.latitude, this.state.longitude)}
        <MapView
          style={styles.map}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <MapView.Marker draggable
            coordinate={{
              latitude: this.state.latitude,
              longitude: this.state.longitude
            }}
            onDragEnd={(e) => console.log('onDragEnd', e.nativeEvent)}
          />
          <MapView.Polyline
          
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red" />
          {console.log("coordsss=>", this.state.coords)}
        </MapView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button
            raised
            title='Search location'
            onPress={() => this.openSearchModal()}
            style={{ width: 150, height: 50, backgroundColor: 'powderblue', color: "#F8B71D" }}
          />

          <Button
            desabled
            raised
            title='Place Info'
            onPress={() => navigate('NearByPlaceScreen', { latitude: this.state.latitude, longitude: this.state.longitude })}
            style={{
              backgroundColor: '#373F46', color: "#F8B71D",
              marginLeft: 50
            }}
          />
          <Button
            raised
            title='Navigate'
            onPress={() => navigate('PolyLineScreen', { latitude: this.state.latitude, longitude: this.state.longitude })}
            style={{ width: 150, height: 50, backgroundColor: 'powderblue', color: "#F8B71D" }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  map: {
    marginTop: 50,
    position: 'absolute',
    width: 400,
    height: 300
  },
});



