import React from "react";
import { registerRootComponent } from 'expo';
import { StyleSheet, TouchableOpacity } from "react-native";
import { ButtonProps } from "../../interfaces/Button.interface";
import colors from "../../styles/colors";

export default function ButtonAction({
  children,
  type,
  onPress,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={type == "edit" ? styles.buttonEdit : styles.buttonRemove}
      onPress={onPress}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonEdit: {
    fontSize: 18,
    borderRadius: 30,
    margin: 10,
    padding: 10,
    backgroundColor: colors.blue,
  },
  buttonRemove: {
    fontSize: 18,
    borderRadius: 30,
    margin: 10,
    padding: 10,
    backgroundColor: colors.red,
  },
});
