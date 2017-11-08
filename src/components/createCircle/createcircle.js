import React, { Component } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity, ScrollView, Modal, ActivityIndicator } from 'react-native'

import axios from 'axios';
import { ButtonGroup, Grid, ToastAndroid, Row, Button, FormLabel, FormInput, Col } from 'react-native-elements'
import { Card, ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
import styles from './style';

// import ModalPicker from 'react-native-modal-picker'
class NearbyPlaces extends Component {
    constructor() {
        super()
        this.state = {
            // users: [],
            // modalVisible: false,
            circleTitle: '',
            name: ''
        }
    }
    static navigationOptions = {
        title: 'Creat a Circle ',
        headerTitleStyle: {
            // color: 'white',
            fontFamily: 'times new roman',
            //   fontWeight: 'bold',
            fontSize: 20,
            justifyContent: 'center',
            textAlign: 'center',
            paddingLeft: 55
        },
        headerStyle: {
            // backgroundColor: '#2C3E50'
        }
    };
    setModalVisible(id) {
        let message = 'want to add you in a circle'
        firebase.database().ref('request/').push(message)
            .then(() => {
                ToastAndroid.show('created successfully SUCCESSFUL !', ToastAndroid.SHORT);
            })

        this.setState({ modalVisible: true });
    }
    componentDidMount() {
        // allUser() {
        let id = firebase.auth().currentUser.uid
        firebase.database().ref('users/' + id).on('value', (data) => {
            var obj = data.val();
            console.log(obj.name)//every thing is ok till this line data is retrieve
            let dbarray = [];
            let name = obj.name
            for (var prop in obj)
                dbarray.push(obj[prop])
            this.setState({
                users: dbarray,
                name: name
            })
        })
        // }
    }
    createCircle() {
        let uid = firebase.auth().currentUser.uid;

        var key = firebase.database().ref('circles/').push().key;
        // console.log(key, "keyyy")
        let circle = {
            circleName: this.state.circleTitle,
            createBy: uid,
            circleId: key,
            // members: [uid],
            code: `M3-${Math.floor(Math.random() * 1000)}`
        }
        let code = `M3-${Math.floor(Math.random() * 1000)}`
        // console.log('circless', circle)
        firebase.database().ref('circles/').child(circle.code).set(circle).then(() => {

            alert('Circle created')
        })

        // var userId = firebase.auth().currentUser.uid;
        // // let id = firebase.auth().currentUser.uid;
        // console.log(userId)
        // let obj = {
        //     createBy: userId,
        //     circleName: this.sJNtate.circleTitle,
        //     code: 'M3'+Math.floor(Math.random() * 1000)
        // }
        // console.log(obj.code)
        // firebase.database().ref('/circles').push(obj)
        //     .then(() => {
        //         alert('circle created successfully')
        //         ToastAndroid.show('created successfully SUCCESSFUL !', ToastAndroid.SHORT);
        //     })
    }


    render() {
        console.log(this.props)
        const buttons = ['Restautrants', 'Parks', 'Banks', 'Hospitals']
        const { selectedIndex } = this.state

        return (
            <View>
                {console.log('username', this.state.users)}
                <Text > Enter Your Circle Name</Text>
                <FormLabel labelStyle={{ textAlign: 'center', fontSize: 18, marginTop: 80 }}>Enter Circle Name</FormLabel>
                <FormInput onChangeText={(circleTitle) => this.setState({ circleTitle })} />
                <Button
                    title='Create'
                    /* buttonStyle={styles.button} */
                    onPress={() => { this.createCircle() }}
                />

            </View>
        )
    }
}

export default NearbyPlaces








// {/* <ScrollView>
//                     {this.state.users.map((d, i) => {
//                         console.log("map data", d)
//                         return (
//                             <ListItem
//                                 title={d.name}
//                                 key={i}
//                                 onPress={() => this.setModalVisible(d.id)}
//                             />
//                         )
//                     })}
//                 </ScrollView> */}
//                 {/* <Modal
//                     animationType="slide"
//                     transparent={false}
//                     visible={this.state.modalVisible}
//                     onRequestClose={() => { alert("Modal has been closed.") }}
//                 >
//                     <Text> Send Notification</Text>
//                     <View style={{}}>
//                         <Button onPress={() => this.setState({ modalVisible: false })} title="close" />
//                         <Button onPress={() => this.setState({ modalVisible: false })} title="Send" />
//                     </View>
//                 </Modal> */}

//                 {/* <Button title="Create circle" onPress={() => { console.log('button press') }} /> */}
