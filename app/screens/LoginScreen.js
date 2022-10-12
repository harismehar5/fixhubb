import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from "react-native";

import Input from "../components/Input";
import Button from "../components/Button";
import Header from "../components/Header";
export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/background_image.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Header />
        <View style={styles.inner_container}>
          <Text
            style={{
              marginHorizontal: 25,
              marginVertical: 5,
              fontSize: 18,
              fontWeight: "bold",
              color:"#ffffff"
            }}
          >
            Welcome!
          </Text>
          <Text style={[styles.continue_style, styles.text_style]}>
            sign in to continue
          </Text>
          <Input placeholder={"Username or Email"} image={"envelope-o"} />
          <Input placeholder={"Password"} image={"lock"} />
          <Text style={[styles.forgot_style, styles.text_style]}>
            Forgot Password?
          </Text>
          <Button title={"Login"} color="#F5AC30" textColor={"#ffffff"} />
          {/* <Text style={[styles.center_text_style, styles.text_style]}>
          OR LOGIN WITH
        </Text>
        <Button title={"Login via Facebook"} color="#3E89FB" /> */}
          <View
            style={{
              flexDirection: "row",
              position: "absolute",
              bottom: 0,
              right: 0,
              left: 0,
              marginBottom: 20,
              justifyContent: "center",
            }}
          >
            <Text style={[styles.forgot_style, styles.text_style]}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Signup");
              }}
            >
              <Text style={styles.signup_text_style}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
  },
  image: {
    flex: 1,
  },
  inner_container: {
    flex: 1,
    justifyContent: "center",
  },
  forgot_style: {
    alignSelf: "flex-end",
    marginRight: 20,
  },
  continue_style: {
    marginLeft: 25,
  },
  text_style: {
    color: "#ffffff",
    marginVertical: 10,
    fontSize: 12,
  },
  center_text_style: {
    alignSelf: "center",
  },
  signup_text_style: {
    color: "#ffffff",
    marginVertical: 10,
    fontSize: 12,
    fontWeight: "bold",
  },
});
