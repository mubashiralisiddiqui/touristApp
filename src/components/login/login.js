import React from 'react';
import { Image, View, Text, TextInput, ToastAndroid, TouchableHighlight, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button, Header } from 'react-native-elements';
import firebase from 'firebase';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import style from './style';
const location = {
    latitude: 24.8841584,
    longitude: 67.1379614,
    latitudeDelta: 0.0002,
    longitudeDelta: 0.0021,
}
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pasword: '',
            users: [],
            isLogin: false,
        };
    }
    static navigationOptions = {
        header: null
    }

    login() {
        const { navigate } = this.props.navigation
        let obj = {
            email: this.state.email,
            pasword: this.state.pasword,
        }

        firebase.auth()
            .signInWithEmailAndPassword(obj.email, obj.pasword)
            .then((user) => {
                var userId = firebase.auth().currentUser.uid;
                console.log( userId)
                    firebase.database().ref('users/' + userId).on('value', (data) => {
                        var obj = data.val();
                        console.log('user', obj)
                        this.setState({ isLogin: true })
                    })
                    navigate('HomeScreen');
                    ToastAndroid.show('lOGIN SUCCESSFUL !', ToastAndroid.SHORT);
                })
                .catch((error) => {
                    var errorMessage = error.message;
                    alert(errorMessage);
            });
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <KeyboardAwareScrollView contentContainerStyle={style.Container}>
                {console.log("lat long", this.state.latitude, this.state.longitude)}
                <Header
                    outerContainerStyles={{ backgroundColor: '#512DA8' }}
                    centerComponent={{ text: 'Family Tracker', style: { color: '#fff' } }}
                />
                <View style={style.InputField}>
                    <FormLabel>Email</FormLabel>
                    <FormInput
                        onChangeText={(email) => this.setState({ email })}
                    />
                    <FormLabel>Password</FormLabel>
                    <FormInput
                        onChangeText={(pasword) => this.setState({ pasword })}
                    />
                    <Button
                        onPress={() => this.login()}
                        title='LOGIN'
                        buttonStyle={{ backgroundColor: '#512DA8' }}
                    />
                </View>

                <TouchableOpacity style={style.askForAccount} onPress={() => navigate('SignupScreen')}>
                    <Text style={{ fontSize: 16, marginTop: 20 }}> Dont Have An Account ? .
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16, }}>
                            Register Now !
                        </Text>
                    </Text>
                </TouchableOpacity>
            </KeyboardAwareScrollView>
        )
    }
}

// firebase.auth().signOut()
// .then(function () {
//     browserHistory.push('/');
// }).catch(function (error) {
//     alert(error)
// });
// }