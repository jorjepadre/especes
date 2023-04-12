import { StackScreenProps } from '@react-navigation/stack';
import { SettingsStackParameterList } from './Settings';
import {
  Image,
  InteractionManager,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from '../components/Button';
import { screenHeight, screenWidth, typography } from '../assets';
import { resetStore } from '../store';
import { SafeAreaView } from 'react-native-safe-area-context';

const SettingsPage = (
  props: StackScreenProps<SettingsStackParameterList, 'SettingsPage'>
) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={typography.title1}>Settings</Text>
        </View>
        <View style={styles.list}>
          <Button
            type="settingsButton"
            onPress={() => props.navigation.navigate('AccountsInfo')}>
            Accounts Info
          </Button>
          <Button
            type="settingsButton"
            onPress={() => props.navigation.navigate('Management')}>
            Management
          </Button>
          <Button
            type="settingsButton"
            onPress={() => props.navigation.navigate('Network')}>
            Network
          </Button>
          <Button
            type="settingsButton"
            onPress={() => props.navigation.navigate('Security')}>
            Security
          </Button>
          <Button
            type="secondary"
            onPress={() => {
              InteractionManager.runAfterInteractions(resetStore);
              props.navigation.reset({
                index: 0,
                routes: [{ name: 'Register' }],
              });
            }}>
            Logout
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    alignItems: 'center',
    marginBottom: screenHeight * 0.03,
    padding: screenHeight * 0.03,
    backgroundColor: '#9b924d',
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
  list: {
    alignItems: 'center',
  },
});

export default SettingsPage;
