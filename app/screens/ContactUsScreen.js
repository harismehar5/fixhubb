import React from "react";
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from "react-native";
import Button from "../components/Button";
import ContactInput from "../components/ContactInput";
import SecondHeader from "../components/SecondHeader";

export default function ContactUsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <SecondHeader></SecondHeader>
      <Text style={styles.heading_text}>Contact US</Text>
      <ContactInput placeholder={"Phone Number"} image="mobile-phone" />
      <ContactInput placeholder={"Email"} image="envelope-o" />
      <ContactInput placeholder={"Address"} image="map-marker" />
      <ContactInput placeholder={"Message"} image="comments" />
      <View style={{position:"absolute", bottom:0, marginBottom:20, width:"100%"}}>
        <Button title={"Send"} color="#007FB2" textColor={"#ffffff"} />
      </View>
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
