import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Clipboard } from 'react-native';
import { AppStackParameterList } from '../app';
import { useDispatch } from 'react-redux';
import { screenHeight, screenWidth, typography } from '../assets';
import Button from '../components/Button';
import { addTimeout, showPopup, countDown } from '../store/reducers/popup';
import { setMnemonic } from '../store/reducers/chain';
import { addAccount } from '../store/reducers/wallet';

const Seed = (props: StackScreenProps<AppStackParameterList, 'Seed'>) => {
  const dispatch = useDispatch();
  const { accountName, mnemonic } = props.route.params;

  return (
    <SafeAreaView>
      <View>
        <View style={styles.title}>
          <Text style={typography.title1}>Mnemonic Phrase</Text>
        </View>

        <View style={styles.mnemonic}>
          <TouchableOpacity
            onPress={async () => {
              Clipboard.setString(mnemonic);
              if (props.route.params) dispatch(showPopup('Secret Backup Phrase has been copied!'));
              dispatch(addTimeout(setTimeout(() => dispatch(countDown()), 2000)));
            }}>
            <View>
              <Text style={{ fontSize: 16 }}>{mnemonic}</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.guides}>1. Click on the mnemonic phrase to copy</Text>
          <Text style={styles.guides}>2. Write down the phrase on a piece of paper and securely store it</Text>
          <Text style={styles.guides}>3. Remember to keep the correct order of words</Text>
          <Text style={styles.guides}>4. You can use this phrase to get access to your account on any device and wallet</Text>
        </View>
      </View>

      <View style={styles.items}>
        <Button
          type="secondary"
          onPress={() => {
            dispatch(setMnemonic(mnemonic));
            dispatch(addAccount({ name: accountName, nonce: 0 }));
            setTimeout(() => props.navigation.navigate('Main'));
          }}>
          Remind me later
        </Button>
        <Button type="primary">Continue</Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    marginBottom: screenHeight * 0.03,
    padding: screenHeight * 0.03,
    backgroundColor: '#9b924d',
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
  items: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
    height: '24%',
    top: '50%',
    justifyContent: 'space-evenly',
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
  guides: {
    marginHorizontal: screenWidth * 0.1,
    marginVertical: screenHeight * 0.01,
    paddingHorizontal: screenWidth * 0.01,
    paddingVertical: screenHeight * 0.01,
  },
});

export default Seed;
