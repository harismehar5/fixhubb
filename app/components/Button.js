import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const Button = ({onPress, title, color, textColor}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{...styles.appButtonContainer, backgroundColor: color}}>
      <Text style={{...styles.appButtonText, color: textColor}}>{title}</Text>
    </TouchableOpacity>
  );
};
export default Button;

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical:5,
    marginHorizontal:20
  },
  appButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
