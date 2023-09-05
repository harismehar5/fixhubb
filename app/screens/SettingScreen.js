import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, StatusBar } from "react-native";
import SecondHeader from "../components/SecondHeader";
import ButtonWithIcon from "../components/ButtonWithIcon";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingScreen({ navigation }) {
  const [accessToken, setAccessToken] = useState({});

  useEffect(() => {
    getData().then((accessObject) => {
      setAccessToken(accessObject.token);
    });
  }, []);

  const deleteAccount = (object) => {
    setLoading(true);
    console.log(accessToken);
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
            text2: "Successfully Deleted",
          });
          // storeData(response);
          navigation.navigate("Login");
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
      <SecondHeader></SecondHeader>
      <Text style={styles.heading_text}>Settings</Text>
      {/*  <Tab.Screen name="Profile" component={ProfileScreen} /> */}
      <ButtonWithIcon
        title={"Edit Profile"}
        color="#F1F6FB"
        onPress={() => navigation.navigate("Profile")}
      />
      <ButtonWithIcon
        title={"Change Password"}
        color="#F1F6FB"
        onPress={() => navigation.navigate("ChangePassword")}
      />
      <ButtonWithIcon
        title={"Contact Us"}
        color="#F1F6FB"
        onPress={() => navigation.navigate("ContactUS")}
      />
      <ButtonWithIcon
        title={"About Us"}
        color="#F1F6FB"
        onPress={() => navigation.navigate("AboutUS")}
      />
      <ButtonWithIcon
        title={"Privacy"}
        color="#F1F6FB"
        onPress={() => navigation.navigate("Privacy")}
      />
      <ButtonWithIcon title={"Share App"} color="#F1F6FB" />
      <Button
        title={"Logout"}
        color="#F5AC30"
        textColor={"#ffffff"}
        onPress={() => {
          // navigation.navigate("HomeTab");
          // validation();
        }}
      />
      <Button
        title={"Delete Account"}
        color="#F5AC30"
        textColor={"#ffffff"}
        onPress={() => {
          // navigation.navigate("HomeTab");
          // validation();
        }}
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
