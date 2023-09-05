import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import Header from "../components/Header";
import { Entypo } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { UPDATE_PROFILE } from "../config/config";

export default function ProfileScreen({ navigation }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState({});
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
      setBase64("data:image/jpeg;base64,"+result.base64);
    }
  };
  useEffect(() => {
    getData().then((accessObject) => {
      setAccessToken(accessObject.token);
      setName(accessObject.name);
      setEmail(accessObject.email);
      // setPassword(accessObject.password)
      setPhone(accessObject.phone);
    });
  }, []);
  const validation = () => {
    if (name === "" || name.length === 0) {
      console.log("world");
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please Enter Name",
      });
    } else {
      var userObject = {
        name: name,
        profile_picture: base64,
      };
      updateProfile(userObject);
    }
  };
  const updateProfile = (object) => {
    setLoading(true);
    console.log(accessToken)
    axios
      .post(UPDATE_PROFILE, object, {
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
          {/* <Text
            style={{
              marginHorizontal: 25,
              marginVertical: 5,
              fontSize: 18,
              fontWeight: "bold",
              color: "#ffffff",
            }}
          >
            Profile
          </Text> */}
          <TouchableOpacity
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: "#cdcdcd",
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
              marginVertical: 20,
            }}
            onPress={pickImage}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            ) : (
              <Entypo name="camera" size={24} color="black" />
            )}
          </TouchableOpacity>
          {/* <Text style={styles.continue_style}>create a new account</Text> */}
          <Input
            placeholder={"Full Name"}
            image={"user"}
            value={name}
            onChangeText={setName}
          />
          <Input
            placeholder={"Phone Number"}
            image={"mobile"}
            value={phone}
            onChangeText={setPhone}
            editable={false}
          />
          <Input
            placeholder={"Email"}
            image={"envelope-o"}
            value={email}
            onChangeText={setEmail}
            editable={false}
          />
          {/* <Input
            placeholder={"Password"}
            image={"lock"}
            value={password}
            onChangeText={setPassword}
          /> */}
          {/* <Text style={styles.forgot_style}>Forgot Password?</Text> */}
          <Button
            title={"Edit"}
            color="#F5AC30"
            textColor={"#ffffff"}
            onPress={() => {
              validation();
              // navigation.navigate("HomeTab");
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
      <Toast />
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
