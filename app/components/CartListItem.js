import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartListItem = ({ item }) => (
  <TouchableOpacity
    style={{
      height: Dimensions.get("window").height / 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#F1F6FB",
      borderRadius: 15,
      paddingHorizontal: 10,
      marginVertical: 8,
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={{ uri: item.image }}
        style={{ height: 40, width: 40, borderRadius: 10, marginRight: 10 }}
      ></Image>
      <Text
        style={{
          color: "#000000",
          fontWeight: "bold",
        }}
      >
        {item.name}
      </Text>
    </View>
    <View
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons name={item.icon} size={20} color="black" />
    </View>
  </TouchableOpacity>
);

export default CartListItem;

const styles = StyleSheet.create({});
