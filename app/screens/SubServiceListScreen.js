import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SecondHeader from "../components/SecondHeader";
import SmallButton from "../components/SmallButton";

const height = Dimensions.get("window").height / 5;

export default function SubServiceListScreen() {
  const [subServiceList, setSubServicList] = useState([
    {
      id: 1,
      heading: "AC Installations",
      description: "Non amet esse non nisi do sint qui irure labore incididunt sint. Quis pariatur commodo dolore deserunt ullamco. Reprehenderit esse consectetur aliqua ullamco ullamco id esse velit officia deserunt ea. Fugiat id velit enim occaecat quis exercitation reprehenderit Lorem excepteur.",
      price: "500",
      icon: "ios-trash-bin-outline",
    },
    {
      id: 2,
      heading: "AC Installations",
      description: "Non amet esse non nisi do sint qui irure labore incididunt sint. Quis pariatur commodo dolore deserunt ullamco. Reprehenderit esse consectetur aliqua ullamco ullamco id esse velit officia deserunt ea. Fugiat id velit enim occaecat quis exercitation reprehenderit Lorem excepteur.",
      price: "500",
      icon: "ios-trash-bin-outline",
    },
    {
      id: 3,
      heading: "AC Installations",
      description: "Non amet esse non nisi do sint qui irure labore incididunt sint. Quis pariatur commodo dolore deserunt ullamco. Reprehenderit esse consectetur aliqua ullamco ullamco id esse velit officia deserunt ea. Fugiat id velit enim occaecat quis exercitation reprehenderit Lorem excepteur.",
      price: "500",
      icon: "ios-trash-bin-outline",
    },
  ]);
  const SubServiceItem = ({ item }) => (
    <TouchableOpacity
      style={{
        height: height,
        flexDirection: "column",
        backgroundColor: "#F1F6FB",
        borderRadius: 15,
        paddingHorizontal: 10,
        marginVertical: 8,
      }}
    >
      <Text>{item.heading}</Text>
      <Text>{item.description}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            color: "#000000",
          }}
        >
          {item.price}
        </Text>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: "#ffffff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name={item.icon} size={24} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
  const renderSubServiceList = ({ item }) => <SubServiceItem item={item} />;
  return (
    <SafeAreaView style={styles.container}>
      <SecondHeader></SecondHeader>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.heading_text}>Sub Services</Text>
        <View style={{ marginRight: 20 }}>
          <SmallButton
            title={"Custom Query"}
            color={"#007AAF"}
            textColor={"#ffffff"}
          />
        </View>
      </View>
      <FlatList
        data={subServiceList}
        renderItem={renderSubServiceList}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{marginHorizontal:20}}
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
});
