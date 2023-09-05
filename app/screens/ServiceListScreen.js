import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SecondHeader from "../components/SecondHeader";
import ButtonWithIcon from "../components/ButtonWithIcon";

export default function ServiceListScreen({navigation}) {
  const [serviceList, setServiceList] = useState([
    {
      id: 1,
      name: "Home",
    },
    {
      id: 2,
      name: "Office",
    },
  ]);
  const ServiceItem = ({ item }) => (
    <ButtonWithIcon title={item.name} color="#F1F6FB" onPress={() => navigation.navigate("SubServiceList")} />
  );
  const renderServiceList = ({ item }) => <ServiceItem item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <SecondHeader></SecondHeader>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={styles.heading_text}>Services</Text>
      </View>
      <FlatList
        data={serviceList}
        renderItem={renderServiceList}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ marginHorizontal: 20 }}
      />
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
  cart_section: {
    position: "absolute",
    bottom: 20,
    width: "90%",
    height: 60,
    marginHorizontal: 20,
    backgroundColor: "#007AAF",
    // paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    color: "#ffffff",
    justifyContent: "space-between",
  },
  cart_text_section: {
    backgroundColor: "#ffffff",
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  cart_text: {
    color: "#ffffff",
  },
  bold_text: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
});
