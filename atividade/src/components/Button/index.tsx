import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ButtonProps } from "../../interfaces/Button.interface";
import colors from "../../styles/colors";

export default function Button({ size, title, onPress, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={size ? styles.buttonSize : styles.button}
      onPress={onPress}
      {...rest}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.gray,
    borderRadius: 5,
    margin: 10,
  },
  buttonSize: {
    backgroundColor: colors.gray,
    borderRadius: 5,
    margin: 10,
    width: 120,
  },
  text: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    fontSize: 18,
  },
});