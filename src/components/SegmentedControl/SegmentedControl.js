import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SegmentedControl = () => {
  const [selectedOption, setSelectedOption] = useState('Günlük'); // Varsayılan seçenek

  const options = ['G', 'H', 'A', '6A', 'Y'];

  return (
    <View style={styles.segmentContainer}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedOption === option && styles.selectedOption,
          ]}
          onPress={() => setSelectedOption(option)}
        >
          <Text
            style={[
              styles.optionText,
              selectedOption === option && styles.selectedText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  segmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E0E0E0', // Arka plan rengi
    borderRadius: 10,
    padding: 5,
    marginVertical: 20,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  selectedOption: {
    backgroundColor: '#fff', // Seçilen butonun arka plan rengi
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 5,
  },
  optionText: {
    fontSize: 16,
    color: '#000', // Buton metin rengi
  },
  selectedText: {
    fontWeight: 'bold', // Seçilen buton metin rengi
  },
});

export default SegmentedControl;
