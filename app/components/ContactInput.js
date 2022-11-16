import * as React from "react";
import { Text, View, StyleSheet, TextInput, Image } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const ContactInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  image,
  keyboardType,
  onEndEditing,
  error,
  errorMessage,
}) => {
  //const {inputStyle, labelStyle, containerStyle} = styles;
  return (
    <View style={{ marginHorizontal: 20 }}>
      <View style={styles.sectionStyle}>
        {image !== null || image !== "" ? (
          <FontAwesome
            name={image}
            size={18}
            color={"grey"}
            style={styles.imageStyle}
          />
        ) : null}
        <TextInput
          style={{ flex: 1, marginHorizontal: 7.5, paddingVertical: 5 }}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          keyboardType={keyboardType}
          underlineColorAndroid="transparent"
          onEndEditing={onEndEditing}
          secureTextEntry={secureTextEntry}
        />
      </View>
      {error ? <Text style={{ color: "#FF0000" }}>{errorMessage}</Text> : null}
    </View>
  );
};
export default ContactInput;
const styles = StyleSheet.create({
  sectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F1F6FB",
    borderWidth: 1,
    borderColor: "#F1F6FB",
    height: 54,
    borderRadius: 15,
    marginVertical: 5,
    padding: 10,
  },
  imageStyle: {
    margin: 5,
    height: 20,
    width: 20,
    alignItems: "center",
  },
});
