import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
// import Details from '../components/details/details';
import NearByPlace from '../components/nearByPlaces/nearByPlaces';
import App from '../../App';
import Cirlce from '../components/createCircle/createcircle';
import { Login, Signup, MyCircles, CirclDetails, JoinCircle } from '../components'

const Navigations = StackNavigator({
    // PolyLineScreen: { screen: PolyLine },
    NearByPlaceScreen: { screen: NearByPlace },
    HomeScreen: { screen: App },
    LoginScreen: { screen: Login },
    SignupScreen: { screen: Signup },
    CircleSreen: { screen: Cirlce },
    MyCircleScreen: { screen: MyCircles },
    CirclDetailsScreen: { screen: CirclDetails },
    JoinCircleScreen: { screen: JoinCircle }

},
    {
        headerMode: 'screen',
        initialRouteName: 'LoginScreen'
    }

);

export default Navigations;
