import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ButtonProps } from "../../interfaces/Button.interface";
import colors from "../../styles/colors";

export default function ButtonAula({
  children,
  onPress,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} {...rest}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 18,
    borderRadius: 30,
    margin: 10,
    padding: 10,
    backgroundColor: colors.gray,
  },
});
