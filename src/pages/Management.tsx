import { StackScreenProps } from '@react-navigation/stack';
import { SettingsStackParameterList } from './Settings';
import { Clipboard, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { screenHeight, screenWidth, typography } from '../assets';
import store, { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { addTimeout, countDown, showPopup } from '../store/reducers/popup';
import { SafeAreaView } from 'react-native-safe-area-context';

const Management = (props: StackScreenProps<SettingsStackParameterList, 'Management'>) => {
  const dispatch = useDispatch();
  const chainType = useSelector((state: RootState) => state.chain.type);
  const mnemonic = store.getState().chain[chainType].mnemonic!;
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.title}>
          <Text style={typography.title1}>Management</Text>
        </View>
      </SafeAreaView>
      <View style={{ alignItems: 'center' }}>
        <Text style={typography.title1}>Mnemonic Phrase</Text>
        <View style={styles.mnemonic}>
          <TouchableOpacity
            onPress={async () => {
              Clipboard.setString(mnemonic);
              if (props.route.params) dispatch(showPopup('Copied Backup Phrase'));
              dispatch(addTimeout(setTimeout(() => dispatch(countDown()), 2000)));
            }}>
            <View>
              <Text style={{ fontSize: 16, color: '#ffffff' }}>{mnemonic}</Text>
            </View>
          </TouchableOpacity>
        </View>
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
  mnemonic: {
    alignItems: 'center',
    marginHorizontal: screenWidth * 0.1,
    marginVertical: screenHeight * 0.025,
    paddingHorizontal: screenWidth * 0.01,
    paddingVertical: screenHeight * 0.01,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#9b924d',
  },
});

export default Management;
