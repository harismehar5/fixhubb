import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SecondHeader = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo003.png')} />
    </View>
  );
};

export default SecondHeader;

const styles = StyleSheet.create({
  container: {
    justifyContent:"center",
    alignItems:"center",
    padding : 10
  },
});
