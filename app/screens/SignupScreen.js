import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import Input from "../components/Input";
import Button from "../components/Button";
import Header from "../components/Header";

export default function SignupScreen({ navigation }) {
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
              color: "#ffffff",
            }}
          >
            Sign Up
          </Text>
          <Text style={styles.continue_style}>create a new account</Text>
          <Input placeholder={"Full Name"} image={"user"} />
          <Input placeholder={"Phone Number"} image={"mobile"} />
          <Input placeholder={"Username or Email"} image={"envelope-o"} />
          <Input placeholder={"Password"} image={"lock"} />
          <Text style={styles.forgot_style}>Forgot Password?</Text>
          <Button
            title={"Login"}
            color="#F5AC30"
            textColor={"#ffffff"}
            onPress={() => {
              navigation.navigate("HomeTab");
            }}
          />
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
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.signup_text_style}>Login</Text>
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
    color: "#ffffff",
    alignSelf: "flex-end",
    marginVertical: 10,
    marginRight: 20,
    fontSize: 12,
  },
  continue_style: {
    color: "#ffffff",
    marginVertical: 10,
    marginLeft: 25,
    fontSize: 12,
  },
  signup_text_style: {
    color: "#ffffff",
    marginVertical: 10,
    fontSize: 12,
    fontWeight: "bold",
  },
});
