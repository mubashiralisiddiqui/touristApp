import React, { Component } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity, ScrollView, Modal, ActivityIndicator } from 'react-native'

import axios from 'axios';
import { ButtonGroup, Grid, ToastAndroid, Row, Button, FormLabel, FormInput, Col } from 'react-native-elements'
import { Card, ListItem, Icon, List } from 'react-native-elements';
import firebase from 'firebase';
import styles from './style';

// import ModalPicker from 'react-native-modal-picker'
class MyCircles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MyCircles: [],
            users: [],
            key: null
        };
    }
    static navigationOptions = {
        title: 'my Circles ',
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

    componentDidMount() {
        // allUser() {
        var currentUser = firebase.auth().currentUser.uid;
        var ref = firebase.database().ref("circles");
        ref.orderByChild("createBy").equalTo(currentUser).on("child_added", (snapshot) => {
            console.log("snapshot==", snapshot.val());
            const Circle = {data:snapshot.val(), key:snapshot.key};
            const key = snapshot.key
            console.log("snap key",key)
            this.setState({
                list: this.state.users.push(Circle),
                key: key
            });
            console.log(this.state.users)
        })
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <View>
                <Text >MY circles</Text>
                <ScrollView style={{ marginTop: 10 }}>
                    {console.log("users=>", this.state.MyCircles)}
                    <List containerStyle={{ marginBottom: 20 }}>
                        {
                           this.state.users && this.state.users.map((l, i) => {
                               console.log('mmmm',l)
                               return(
                                <ListItem roundAvatar key={i} title={l.data.circleName} onPress={() => navigate('CirclDetailsScreen', { id: l.data.code })} />
                               )
                           }
                             
                             
                               
                            )
                        }

                    </List>
                </ScrollView>

            </View>
        )
    }
}

export default MyCircles
