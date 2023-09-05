import React from "react";
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from "react-native";
import SecondHeader from "../components/SecondHeader";

export default function PrivacyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <SecondHeader></SecondHeader>
      <Text style={styles.heading_text}>Privacy</Text>
      <View
        style={{
          flex: 1,
          backgroundColor: "#F1F6FB",
          borderRadius: 10,
          marginVertical: 10,
          marginHorizontal: 20,
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 16 }}>
          In adipisicing dolor proident enim incididunt reprehenderit nisi
          pariatur culpa. Tempor amet et qui do ea. Veniam magna commodo nostrud
          elit dolor do enim exercitation nisi tempor esse pariatur. Mollit
          aliqua esse exercitation aliquip ea consectetur commodo in minim
          minim. 
          {"\n"}
          {"\n"}
          Lorem commodo elit commodo ea. Exercitation esse eiusmod elit
          veniam tempor cupidatat ad id ad reprehenderit. Minim voluptate dolor
          labore eu consectetur veniam sunt irure do anim dolore voluptate ex
          voluptate. Pariatur ipsum irure ullamco enim reprehenderit nostrud
          eiusmod consectetur voluptate laborum.
          {"\n"}
          {"\n"}
          Anim do quis elit ullamco aute
          exercitation mollit ullamco officia pariatur tempor tempor. Cillum
          consequat magna ad non occaecat mollit sint et aliqua adipisicing.
          Tempor nulla velit occaecat proident sunt sit aliqua officia
          exercitation nostrud ex deserunt. Exercitation ut aliquip adipisicing
          esse nisi do aliqua.
        </Text>
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
