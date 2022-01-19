import React from "react";
import { registerRootComponent } from 'expo';
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ButtonProps } from "../../interfaces/Button.interface";

export default function ButtonText({ title, onPress, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} {...rest}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
  },
});
