import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo002.png')} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    justifyContent:"center",
    alignItems:"center",
    padding : 10
  },
});
