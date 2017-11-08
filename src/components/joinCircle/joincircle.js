import React from 'react';
import { View, Text, TextInput, ToastAndroid } from 'react-native';
import { Button, Header, Icon } from 'react-native-elements';
import * as firebase from 'firebase';

import styles from './style'
export default class JoinCircle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: '',
            circleList: [],
            keyval: '',
            loading: false,
            message: '',
            userinfo: [],
            name: '',
            latitude: 0,
            longitude: 0
        }

    }
    componentDidMount() {

        let admin = firebase.auth().currentUser.uid;
        firebase.database().ref('users').child(admin).on('value', data => {
            console.log('didmountdata', data.val().name)
            let userinfo = data.val();
            let username = data.val().name
            let arr = [];
            arr.push(userinfo)
            this.setState({
                userinfo: arr,
                name: username
            })
        })
    }
    joinCircle() {
        let latlong = this.props.navigation.state.params
        console.log('didmountlatlong', latlong)
        console.log("long====", this.state.latitude, this.state.longitude)
        if (this.state.code.length <= 3) {
            alert('please enter valid code')
        }
        else {
            let admin = firebase.auth().currentUser.uid;
            console.log('admin', admin)
            firebase.database().ref('circles').child(this.state.code).on('value', data => {
                console.log(data.val().createBy)
                let owner = data.val().createBy;

            })
            // if (owner == admin) {
            //     alert('already a admin at this group ')
            // }
            // else {

            obj = {
                name: this.state.name,
                latitude: latlong.latitude,
                longitude: latlong.longitude

            }
            firebase.database().ref('circles/' + this.state.code + '/member').push(obj)
            alert('joined')
            // }

        }

        // const { navigate } = this.props.navigation
        // const { keyval, circleList } = this.state;
        // var availCircle = [];
        // let admin = firebase.auth().currentUser.uid;
        // this.state.circleList.map((memkey, i) => {
        //     var a = memkey.circleId.indexOf(keyval);
        //     console.log(a);
        //     if (a === -1) {
        //         this.setState({
        //             // message: 'You Type Wrong Key' ,
        //             loading: false
        //         })
        //     } else {
        //         var check = memkey.members.indexOf(admin);
        //         if (check === -1) {
        //             //    console.log(memkey)
        //             let memberkey = memkey.circleId;
        //             let mem = memkey.members;
        //             mem.push(admin);

        //             //   console.log(mem)
        //             var b = firebase.database().ref('circles/' + memberkey)
        //             b.update({ members: mem })
        //             navigate('HomeScreen')
        //         } else {
        //             this.setState({
        //                 message: 'You are Already a Member',
        //                 loading: false
        //             })
        //             alert('already a member')
        //         }
        //     }
        // })

    }
    // joinCircle() {

    //     // var currentUser = firebase.auth().currentUser.uid;
    //     // var ref = firebase.database().ref("circles");
    //     // ref.orderByChild("createBy").equalTo(currentUser).on("child_added", (snapshot) => {
    //     //     console.log("snapshot==", snapshot.val());
    //     //     const Circle = { data: snapshot.val(), key: snapshot.key };
    //     //     const key = snapshot.key
    //     //     console.log("snap key", key)
    //     //     // this.setState({
    //     //     //     list: this.state.users.push(Circle),
    //     //     //     key: key
    //     //     // });
    //     //     console.log(this.state.users)
    //     // })
    //     // firebase.database().ref('circles/').on('child_added', data => {
    //     //     console.log("key==>", data.key)
    //     //     let array = this.state.list;

    //     //     array.push(data.key)
    //     //     array.map((d) => {
    //     //         console.log("map data", d)
    //     //         firebase.database().ref('circles/' + d).on('value', data => { console.log('extract==>', data.val().keyval) })
    //     //     })
    //     //     console.log('array', array)
    //     // })
    //     // let id = firebase.auth().currentUser.uid;
    //     // let obj = {
    //     //     id: id,
    //     //     cod: this.state.code
    //     // }
    //     // console.log(obj)
    //     // firebase.database().ref('circles/' + id + '/ members/').push(obj)
    // // }
    static navigationOptions = {
        header: null
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={styles.container}>
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

                    centerComponent={
                        <Text
                            style={{ textAlign: 'center', color: 'white' }} onPress={() => navigate('MyCircleScreen')}
                        >
                            Circles ({this.state.circlenum})

                         </Text>
                    }
                    outerContainerStyles={{ backgroundColor: "#009688" }}
                />
                <View style={styles.content}>
                    {console.log(this.state.userinfo, 'userinfo')}
                    <TextInput
                        placeholder="Enter the Invite Code"
                        style={{ color: '#000', width: 300, fontSize: 20, textAlign: 'center', marginLeft: 30 }}
                        onChangeText={(text) => { this.setState({ code: text }) }}
                        underlineColorAndroid='#0b5f88'
                    />

                    <Button
                        raised
                        buttonStyle={{ backgroundColor: '#512DA8' }}
                        icon={{ name: 'cached' }}
                        onPress={() => this.joinCircle()}
                        title='JOIN' />
                </View>

            </View>
        )
    }
}