import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Toast from "react-native-toast-message";
import Input from "../components/Input";
import Button from "../components/Button";
import Header from "../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { UPDATE_PASSWORD } from "../config/config";

export default function ChangePasswordScreen({ navigation }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accessToken, setAccessToken] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData().then((accessObject) => {
      setAccessToken(accessObject.token);
    });
  }, []);
  const validation = () => {
    if (oldPassword === "" || oldPassword.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter Old Password",
      });
    } else if (newPassword === "" || newPassword.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter Old Password",
      });
    } else if (confirmPassword === "" || confirmPassword.length === 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter Password To Confirm",
      });
    } else if (newPassword !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Reconfirm Password",
      });
    } else {
      var userObject = {
        password: oldPassword,
        new_password: newPassword,
      };
      updatePassword(userObject);
    }
  };
  const updatePassword = (object) => {
    setLoading(true);
    console.log(accessToken);
    axios
      .post(UPDATE_PASSWORD, object, {
        headers: {
          "x-api-key": "sd4fji2378gi3urg",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (response) {
        // setLoading(false);
        // console.log(response)
        if (response.status === 200) {
          Toast.show({
            type: "success",
            text1: "Success",
            text2: "Successfully Updated",
          });
          // storeData(response);
          // navigation.navigate("Login");
        } else {
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "Something went wrong...!",
          });
        }
      })
      .catch(function (error) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: error.toString(),
        });
        setLoading(false);
        console.log("error: " + error);
      });
  };
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@access_Key");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.toString(),
      });
      console.log(e.toString());
    }
  };
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
            Change Password
          </Text>
          {/* <Text style={styles.continue_style}>create a new account</Text> */}
          <Input
            placeholder={"Old Password"}
            image={"lock"}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <Input
            placeholder={"New Password"}
            image={"lock"}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <Input
            placeholder={"Confirm Password"}
            image={"lock"}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {/* <Input placeholder={"Password"} image={"lock"} /> */}
          {/* <Text style={styles.forgot_style}>Forgot Password?</Text> */}
          <Button
            title={"Change"}
            color="#F5AC30"
            textColor={"#ffffff"}
            onPress={() => {
              // navigation.navigate("HomeTab");
              validation()
            }}
          />
          {/* <View
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
          </View> */}
        </View>
      </ImageBackground>
      <Toast></Toast>
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
