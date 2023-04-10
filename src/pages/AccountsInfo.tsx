import { StackScreenProps } from '@react-navigation/stack';
import { SettingsStackParameterList } from './Settings';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAccount } from '../utils/hooks';
import store from '../store';
import { useDispatch } from 'react-redux';
import { fontScale, screenHeight, screenWidth, typography } from '../assets';
import Button from '../components/Button';

const AccountsInfo = (props: StackScreenProps<SettingsStackParameterList, 'AccountsInfo'>) => {
  const { name, nonce, pub, pri } = useAccount();
  // console.log(name, nonce, pub, pri);
  // console.log('Chain', store.getState().chain['eth']);
  // console.log('Wallet', store.getState().wallet);

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={typography.title1}>Settings</Text>
      </View>

      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={() => {}}>
          <Text style={styles.label}>{name}</Text>
        </TouchableOpacity>
        <Text style={styles.label}>{pub.slice(0, 8) + '...' + pub?.slice(-8)}</Text>
        <Button type="settingsButton">Change Account Name</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    alignItems: 'center',
    marginBottom: screenHeight * 0.03,
    padding: screenHeight * 0.03,
    backgroundColor: '#9b924d',
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
  label: {
    marginTop: screenHeight * 0.02,
    marginBottom: screenHeight * 0.03,
    color: '#ffffff',
    fontFamily: 'OpenSans-Bold',
    fontSize: fontScale * 26,
  },
});

export default AccountsInfo;
