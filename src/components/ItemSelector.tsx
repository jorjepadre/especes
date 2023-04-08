import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { screenHeight, screenWidth } from '../assets';

interface Props {
  data: string[];
  selected: string | undefined;
  setSelected: React.Dispatch<React.SetStateAction<any>>;
}

const ItemSelector: React.FC<Props> = ({ data, selected, setSelected }) => {
  const handleItemPress = (item: string) => {
    setSelected(item);
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        {data.map((item) => (
          <TouchableOpacity key={item} onPress={() => handleItemPress(item)}>
            <View style={[styles.item, selected === item && styles.selectedItem]}>
              <Text>{item}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: screenWidth * 0.05,
  },
  modal: {
    backgroundColor: '#252525',
    width: screenWidth * 0.46,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: screenWidth * 0.025,
    paddingVertical: screenHeight * 0.01,
    flexDirection: 'row',
  },
  item: {
    width: screenWidth * 0.2,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#9b924d',
  },
});

export default ItemSelector;
