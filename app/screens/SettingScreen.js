import React from "react";
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from "react-native";
import SecondHeader from "../components/SecondHeader";
import ButtonWithIcon from "../components/ButtonWithIcon";

export default function SettingScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <SecondHeader></SecondHeader>
      <Text style={styles.heading_text}>Settings</Text>
      <ButtonWithIcon title={"Change Password"} color="#F1F6FB" />
      <ButtonWithIcon title={"Contact Us"} color="#F1F6FB" onPress={()=> navigation.navigate("ContactUS")}/>
      <ButtonWithIcon title={"About Us"} color="#F1F6FB" onPress={()=> navigation.navigate("AboutUS")}/>
      <ButtonWithIcon title={"Privacy"} color="#F1F6FB" onPress={()=> navigation.navigate("Privacy")}/>
      <ButtonWithIcon title={"Share App"} color="#F1F6FB" />
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
