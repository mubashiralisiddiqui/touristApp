import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
// import Details from '../components/details/details';
import NearByPlace from '../components/nearByPlaces/nearByPlaces';
import App from '../../App';
// import Login from '../components/login/login';
// import Signup from '../components/signup/signup';

const Navigations = StackNavigator({
    // locationDetails: { screen: Details },
    NearByPlaceScreen: { screen: NearByPlace },
    HomeScreen: { screen: App },
    // LoginScreen: { screen: Login },
    // SignupScreen: { screen: Signup }
},
    {
        headerMode: 'screen',
        initialRouteName: 'HomeScreen'
    }

);

export default Navigations;