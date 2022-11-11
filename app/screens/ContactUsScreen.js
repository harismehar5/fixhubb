import React from "react";
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from "react-native";
import SecondHeader from "../components/SecondHeader";

export default function ContactUsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <SecondHeader></SecondHeader>
      <Text style={styles.heading_text}>Contact US</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: "#ffffff",
  },
  heading_text: {
    fontSize: 22,
    marginHorizontal: 20,
  },
});
