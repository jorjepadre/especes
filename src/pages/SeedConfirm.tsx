import { StackScreenProps } from '@react-navigation/stack';
import { AppStackParameterList } from '../app';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useState } from 'react';
import { fontScale, screenHeight, screenWidth, typography } from '../assets';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import { addAccount } from '../store/reducers/wallet';
import { setMnemonic } from '../store/reducers/chain';

const SeedConfirm = (
  props: StackScreenProps<AppStackParameterList, 'SeedConfirm'>
) => {
  const dispatch = useDispatch();
  const mix = (vector: unknown[]) => {
    for (let i = vector.length - 1; i > 0; --i) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = vector[i];
      vector[i] = vector[j];
      vector[j] = temp;
    }
    return vector;
  };

  const { mnemonic: seed } = props.route.params;
  const seedProcessed = mix(
    seed.split(' ').map((e: string) => ({ word: e, selected: false }))
  ) as { word: string; selected: boolean }[];

  const [chosen, setChosen] = useState<string[]>([]);
  const [words, setWords] = useState(seedProcessed);
  const [wordsLeft, setWordsLeft] = useState(words.length);
  const isEqual = chosen.join(' ') === seed;
  const isWrong = wordsLeft === 0 && !isEqual;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={typography.title1}>Confirm Seed</Text>
        </View>
        <View style={styles.elemContainer}>
          <Text style={typography.title1}>
            Confirm your Secret Backup Phrase
          </Text>
        </View>
        <View style={styles.elemContainer}>
          <Text style={typography.title2}>
            Please select each phrase in order to make sure it is correct.
          </Text>
        </View>
        <View style={styles.elemContainer}>
          <View
            style={[
              styles.seedBox,
              isWrong ? { borderColor: '#451919' } : { borderColor: '#9b924d' },
            ]}>
            <Text style={[typography.title2, { padding: screenWidth * 0.03 }]}>
              {chosen.join(' ')}
            </Text>
          </View>
          {isWrong && (
            <Text style={styles.error}>
              Wrong Secret Backup Phrase. Please, try again.
            </Text>
          )}
        </View>
        <View style={[styles.wordsContainer]}>
          {words.map((value, index) => (
            <TouchableOpacity
              key={index}
              style={
                value.selected ? styles.wordButtonActive : styles.wordButton
              }
              onPress={() => {
                const wordFlagList = [...words];
                wordFlagList[index].selected = !wordFlagList[index].selected;
                setWords(wordFlagList);
                const wordChosenList = [...chosen];
                if (value.selected) {
                  setWordsLeft((prev) => prev - 1);

                  wordChosenList.push(words[index].word);
                } else {
                  setWordsLeft((prev) => prev + 1);
                  wordChosenList.splice(
                    wordChosenList.indexOf(words[index].word),
                    1
                  );
                }
                setChosen(wordChosenList);
              }}>
              <Text
                style={
                  value.selected ? styles.wordTextActive : styles.wordText
                }>
                {value.word}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          type="outline"
          style={{ width: '40%' }}
          onPress={() => {
            const temp = [...words];
            temp.forEach((word) => (word.selected = false));
            setWords(temp);
            setChosen([]);
            setWordsLeft(words.length);
          }}>
          Clear and try again
        </Button>
        <Button
          type="primary"
          style={{ width: '40%' }}
          disabled={!isEqual}
          onPress={() => {
            dispatch(setMnemonic(seed));
            dispatch(
              addAccount({
                name: props.route.params.accountName.trim(),
                nonce: 0,
              })
            );
            props.navigation.reset({ index: 0, routes: [{ name: 'Splash' }] });
          }}>
          Continue
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    alignItems: 'center',
  },
  container: {},
  title: {
    alignItems: 'center',
    padding: screenHeight * 0.03,
    backgroundColor: '#9b924d',
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
  elemContainer: {
    alignItems: 'center',
    marginTop: screenHeight * 0.03,
    marginLeft: screenWidth * 0.075,
    marginRight: screenWidth * 0.07,
  },
  wordsContainer: {
    alignItems: 'center',
    marginVertical: screenHeight * 0.05,
    marginHorizontal: screenWidth * 0.12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wordButton: {
    alignItems: 'center',
    paddingHorizontal: 20,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  wordButtonActive: {
    paddingHorizontal: 20,
    borderColor: '#9b924d',
    borderWidth: 1,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  wordText: {
    lineHeight: screenHeight * 0.04,
    color: '#E0E0E0',
    fontSize: fontScale * 16,
    fontFamily: 'OpenSans-Regular',
  },
  wordTextActive: {
    lineHeight: screenHeight * 0.04,
    color: '#9b924d',
    fontSize: fontScale * 16,
    fontFamily: 'OpenSans-Regular',
  },
  seedBox: {
    alignItems: 'center',
    width: '100%',
    height: screenHeight * 0.2,
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: screenWidth * 0.95,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: '-30%',
  },
  error: {
    color: '#FF6969',
    fontSize: fontScale * 12,
    fontFamily: 'OpenSans-Regular',
    marginTop: 5,
    marginLeft: 5,
  },
});
export default SeedConfirm;
