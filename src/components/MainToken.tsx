import { Image, StyleSheet, Text, View } from 'react-native';
import { fontScale, screenHeight, screenWidth } from '../assets';
import { TokenData } from '../store/reducers/chain';
import React from 'react';
import { useTokenList } from '../utils/hooks';

type MainTokenProps = {
  name: string;
  logo: string;
  ticker: string;
  token_id: string;
};

const MainToken = (props: MainTokenProps) => {
  const tokenList = useTokenList();
  const { logo, name, ticker, token_id } = tokenList[0];
  return (
    <View style={styles.container}>
      <Image source={{ uri: logo }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    height: screenHeight * 0.13,
    width: screenWidth * 0.4,
    resizeMode: 'contain',
  },
});

export default MainToken;
