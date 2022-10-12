import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
} from "react-native";
import Button from "../components/Button";
export default function OnboardingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/background_image.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Image source={require("../assets/logo001.png")} />
        <View
          style={{
            position: "absolute",
            bottom: 0,
            marginBottom: 20,
            width: "100%",
          }}
        >
          <Button
            title={"Get Started"}
            color={"#F1F6FB"}
            textColor={"#2E3E5C"}
            onPress={() => {
              navigation.navigate("Login");
            }}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
