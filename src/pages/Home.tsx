import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabBarParameterList } from './TabBar';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { TokenData } from '../store/reducers/chain';
import Offline from '../components/Offline';
import HomePage from './HomePage';
import Receive from './Receive';
import Send from './Send';
import Scan from './Scan';
import SendConfirm from './SendConfirm';

export type HomeStackParameterList = {
  HomePage: undefined;
  Send: {
    tokenData: TokenData;
    balance: number;
    rate: number;
    address?: string;
  };
  Scan: {
    tokenData: TokenData;
    balance: number;
    rate: number;
    address?: string;
  };
  // QRConfirm: { tokenData: TokenData; balance: number; SOLRate: number; SOLBalance: number; address: string; barcode: string };
  SendConfirm: {
    tokenData: TokenData;
    amount: number;
    fee: number;
    address: string;
  };
  Receive: { tokenData: TokenData };
};

const HomeStack = createStackNavigator<HomeStackParameterList>();

const Home = (props: BottomTabScreenProps<TabBarParameterList, 'Home'>) => {
  const networkInfo = useNetInfo();
  if (networkInfo.isConnected || !networkInfo) {
    return (
      <HomeStack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <HomeStack.Screen name="HomePage" component={HomePage} />
        <HomeStack.Screen name="Receive" component={Receive} />
        <HomeStack.Screen name="Send" component={Send} />
        <HomeStack.Screen name="Scan" component={Scan} />
        <HomeStack.Screen name="SendConfirm" component={SendConfirm} />
        {/* <HomeStack.Screen name="QRConfirm" component={QRConfirm} /> */}
      </HomeStack.Navigator>
    );
  } else {
    return <Offline />;
  }
};

export default Home;
