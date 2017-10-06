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
      isPlaceInfo: false
    }
  }
  static navigationsOption = {
    header: null
  }
  componentDidMount() {
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
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
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
        </MapView>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Button
            raised
            title='Search'
            onPress={() => this.openSearchModal()}
            style={{ width: 150, height: 50, backgroundColor: 'powderblue', color: "#F8B71D" }}
          />

          <Button
            desabled
            raised
            title='Place Info'
            onPress={() => navigate('NearByPlaceScreen',{ latitude: this.state.latitude, longitude: this.state.longitude })}
            style={{
              backgroundColor: '#373F46', color: "#F8B71D",
              marginLeft: 50
            }}
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
    position: 'absolute',
    width: 400,
    height: 300
  },
});
