import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

const ButtonWithIcon = ({onPress, title, color}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{...styles.appButtonContainer, backgroundColor: color}}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};
export default ButtonWithIcon;

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
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});
