import React, { Component } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity, ScrollView, Modal, ActivityIndicator } from 'react-native'

import axios from 'axios';

import { Card, ListItem, Icon, List, Header, Button } from 'react-native-elements';
import firebase from 'firebase';
import styles from './style';

// import ModalPicker from 'react-native-modal-picker'
class CirclDetails extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
            circleTitle: '',
            heading: '',
            circleList: [],
            availCircle: []
        }
    }
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        const id = this.props.navigation.state.params.id
        console.log("id======>", id)
        firebase.database().ref('circles').child(id).on('value',data=>{
     console.log('code data',data.val())
     let array = [];
         array.push(data.val())
         this.setState({ users: array })
        })
        // var currentUser = firebase.auth().currentUser.uid;
        // var ref = firebase.database().ref("circles");
        // ref.child(id).on('value', (data) => {
        //     console.log('firebase data==>', data.val())
        //     const circleuser = data.val();
        //     let array = [];
        //     array.push(circleuser)
        //     this.setState({ users: array })

        // })

        // firebase.database().ref('circles/').on('child_added', (snap) => {
        //     var obj = snap.val();
        //     // console.log(obj)
        //     var circleList = this.state.circleList;
        //     circleList.push(obj);
        //     this.setState({
        //         circleList,

        //     })
        //     this.check();

        // })


    }
    check() {
        //   const { availCircle } = this.state ;
        var availCircle = [];
        let admin = firebase.auth().currentUser.uid;
        this.state.circleList.map((memkey, i) => {
            console.log("map data==", memkey);
            var a = memkey.members.indexOf(admin);
            if (a === -1) {
                console.log("Not a Member")

            } else {
                // console.log('you are a member', memkey)
                availCircle.push(memkey);
                this.setState({
                    availCircle
                })
            }
        })
    }

    render() {
        const { navigate } = this.props.navigation
        const id = this.props.navigation.state.params.id
        console.log(id)
        return (
            <View>

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
                        <Image
                            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCDYa8RmvAxhY9484Y9pWH7y3TqRmVg0yW7hNLL2tSU_WWap2E5A' }}
                            style={{ width: 20, height: 20, marginRight: 20, borderRadius: 50 }}

                        />
                    }
                    centerComponent={
                        <Text style={{ textAlign: 'center', color: 'white' }} onPress={() => navigate('MyCircleScreen')}>
                            Circles ({this.state.circlenum})

          </Text>

                    }
                    //  centerComponent={{ text: "Circles " + this.state.circlenum, style: { color: "#fff" } }}
                    outerContainerStyles={{ backgroundColor: "#009688" }}
                />
                {
                    this.state.users.map((u, i) => {
                        console.log("uuuuu", u.members)
                        return (
                            <View key={i} style={{ marginTop: 60 }}>
                                <Card title={u.circleName} >
                                    <Text style={{ textAlign: 'center' }}>{u.circleName}</Text>
                                    <Text style={{ textAlign: 'center' }}>Join Code {u.code}</Text>
                                    <Button title="JoinCircle" onPress={() => navigate('JoinCircleScreen')} />
                                </Card>
                                <Text style={{ textAlign: 'center' }}>Members</Text>
                                {/* <ListItem roundAvatar key={i} title={u.member.name}
                                onPress={()=>navigate('HomeScreen',{latitude:u.member.latitude,longitude:u.member.longitude})} 
                                /> */}
                            </View>
                        );
                    })
                }
            </View>
        )
    }
}

export default CirclDetails
