import React from 'react';
import { Image, View, Text, TouchableHighlight, ToastAndroid, ActivityIndicator, TouchableOpacity, AsyncStorage } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button, Header } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'firebase'
import style from './style';

let AllUser = []

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            lastName: '',
            email: '',
            pasword: '',
            users: [],
            modalVisible: false,
            uri: ''
        };
    }
    static navigationOptions = {
        header: null
    }
    componentDidMount() {
        AsyncStorage.getItem('users', (err, user) => {
            if (user !== null) {
                AllUser.push(JSON.parse(user))
            }
        })
    }


    signup() {
        const { navigate } = this.props.navigation
        let obj = {
            name: this.state.username,
            lastName: this.state.lastName,
            email: this.state.email,
            pasword: this.state.pasword,
        }
        // let id = firebase.auth().currentUser.uid;
        // console.log("id==>", id)
        firebase
        .auth()
        .createUserWithEmailAndPassword(obj.email, obj.pasword)
        .then(user => {
          var userId = firebase.auth().currentUser.uid;
          let userDetails = {
            userId: userId,
            email: obj.email,
            name: obj.name,
          };
  
          firebase
          .database()
          .ref("users/" + userId)
          .set(userDetails).then(()=>{
            navigate("LoginScreen");
            ToastAndroid.show("SIGNUP SUCCESSFUL !", ToastAndroid.SHORT);
          }).catch((error)=>{
              console.log("Error during user creating on firebase",error);
          });
  
        });
    }



    render() {
        const { navigate } = this.props.navigation
        return (

            <KeyboardAwareScrollView contentContainerStyle={style.Container}>
                {/* //<View> */}
                <Header
                    outerContainerStyles={{ backgroundColor: '#512DA8' }}
                    centerComponent={{
                        text: 'Tourist Guide ',
                        style: { color: '#fff' }
                    }}
                />

                <View style={style.InputField}>
                    <KeyboardAwareScrollView>
                        <FormLabel>
                            Name
                    </FormLabel>
                        <FormInput
                            onChangeText={(username) => this.setState({ username })}
                        />
                        <FormLabel>
                            Email
                    </FormLabel>
                        <FormInput

                            onChangeText={(email) => this.setState({ email })}
                        />
                        <FormLabel>
                            PASSWORD
                    </FormLabel>
                        <FormInput
                            onChangeText={(pasword) => this.setState({ pasword })}
                        />
                    </KeyboardAwareScrollView>

                    <Button
                        onPress={() => this.signup()}
                        title='SIGNUP'
                        buttonStyle={{ backgroundColor: '#512DA8' }}
                    />
                </View>

                <TouchableOpacity onPress={() => navigate('LoginScreen')} style={style.askForAccount} >
                    <Text style={{ fontSize: 16 }}>
                        Already Have An Account ?
                        <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 16 }}>
                            Login !
                        </Text>
                    </Text>
                </TouchableOpacity>
                {/* </View> */}
            </KeyboardAwareScrollView >
        )
    }
}