import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Image,
  Button,
  View,
  ScrollView
} from 'react-native';
import { Header, Icon, SideMenu, List, ListItem } from "react-native-elements";
import MapView from 'react-native-maps';
import ActionButton from 'react-native-action-button';
import RNGooglePlaces from 'react-native-google-places';
import Polyline from '@mapbox/polyline';
import firebase from 'firebase';
// import PolyLine from './src/components/Navigater'

const location = {
  latitude: 24.8841584,
  longitude: 67.1379614,
  latitudeDelta: 0.0002,
  longitudeDelta: 0.0021,
}
let copy = Object.assign({}, location)
// const { navigate } = this.props.navigation
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: 67.0099,
      latitude: 24.8615,
      modalVisible: false,
      isPlaceInfo: false,
      lat: null,
      lng: null,
      coords: [],
      circlenum: 0,
      users: []
    }
  }

  static navigationOptions = {
    header: null

  };
  componentDidMount() {
    console.log('didmount runing')
    const latlong = this.props.navigation.state.params;
    //  this.getDirections("40.1884979, 29.061018", "41.0082,28.9784")
    var currentUser = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("circles");
    ref.orderByChild("createBy").equalTo(currentUser).on("child_added", (snapshot) => {
      console.log("snapshot==", snapshot.val());
      let array = []

      const Circle = snapshot.val().member;

      for (var prop in Circle) {
        array.push(Circle[prop])
        console.log('prop map==>', Circle[prop])
      }
      console.log('arrayyyyy', array)
      
      // console.log("circle member", Circle.member)
      const key = snapshot.key
      console.log("snap key", key)
      this.setState({
        users: array,
        key: key
      });
      console.log(this.state.users)
    })


    var currentUser = firebase.auth().currentUser.uid;
    var ref = firebase.database().ref("circles");
    ref.orderByChild("createBy").equalTo(currentUser).on("child_added", function (snapshot) {
      console.log("snapshot==", snapshot.val());

      // const Circle = snapshot.val();
      var obj = snapshot.val();
      console.log(obj)
      obj = Object.keys(obj).length
      console.log("object length", obj)
      if (obj) {
        this.setState({
          circlenum: obj
        })
      }

    }.bind(this))

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
    console.log("getDirection==>", startLoc, destinationLoc)
    const key = 'AIzaSyACp-ZZT3Oxc8zltot-o2fU5PkSjda0Its'
    //https://maps.googleapis.com/maps/api/directions/json?origin=24.882830499999997,67.0680423,&destination=24.882830499999997,67.0680423&key=AIzaSyACp-ZZT3Oxc8zltot-o2fU5PkSjda0Its
    // 'https://maps.googleapis.com/maps/api/directions/json?origin=24.882830499999997,67.0680423&destination=24.882830499999997,67.0680423&key=AIzaSyACp-ZZT3Oxc8zltot-o2fU5PkSjda0Its'
    let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=AIzaSyACp-ZZT3Oxc8zltot-o2fU5PkSjda0Its`;
    console.log('url ready', url)
    try {
      let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${key}`)
      let respJson = await resp.json();
      console.log("response", respJson)
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        console.log('ponts==>', point)
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
        this.getDirections(`${location.latitude},${location.longitude}`, `${this.state.latitude},${this.state.longitude}`)
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { navigate } = this.props.navigation
    const latlong = this.props.navigation.state.params;
    const array = [];
    array.push(latlong)
    console.log(array, 'array latlong')
    return (
      <View style={styles.container}>
        {console.log(this.state.users, 'state arrray')}
        <Header
          leftComponent={
            <Icon
              name="menu"
              color="white"
            /* onPress={() => {
              navigate("DrawerOpen");
           }} */
            />
          }
          rightComponent={
            <Button title="join circle"
              onPress={() => navigate('JoinCircleScreen', obj = { latitude: this.state.latitude, longitude: this.state.longitude })}
            >
              <Image
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCDYa8RmvAxhY9484Y9pWH7y3TqRmVg0yW7hNLL2tSU_WWap2E5A' }}
                style={{ width: 20, height: 20, marginRight: 20, borderRadius: 50 }}


              />
            </Button>
          }
          centerComponent={
            <Text style={{ textAlign: 'center', color: 'white' }} onPress={() => navigate('MyCircleScreen')}>
              Circles ({this.state.circlenum})

          </Text>
          }
          //  centerComponent={{ text: "Circles " + this.state.circlenum, style: { color: "#fff" } }}
          outerContainerStyles={{ backgroundColor: "#009688" }}
        />
        {console.log("lat lon==>", this.state.latitude, this.state.longitude)}
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          overlays={[{
            coordinates: this.state.coords,
            strokeColor: '#19B5FE',
            lineWidth: 10,
          }]}
          showsUserLocation={true}
          followUserLocation={true}
        >

          {/* {this.state.users.map((a, i) => {
            console.log('mapdata--', a)
            return (
              <MapView.Marker
                coordinate=
                {{
                  latitude: a.latitude,
                  longitude: a.longitude,
                  latitudeDelta: 0.0002,
                  longitudeDelta: 0.0021,
                }}
                pinColor="blue"
                title="me"
              />
            )
          })} */}



        </MapView>




        <ActionButton buttonColor="rgba(231,76,60,1)" onPress={() => { navigate('CircleSreen') }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    height: 700,
    width: 400,
    flex: 1,
    display: 'flex'
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  map: {
    marginTop: 70,
    position: 'absolute',
    width: 400,
    height: 550
  },
});



