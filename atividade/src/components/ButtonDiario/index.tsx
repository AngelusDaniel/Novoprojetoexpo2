import React from "react";
import { StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { ButtonProps } from "../../interfaces/Button.interface";
import colors from "../../styles/colors";

export default function ButtonDiario({
  title,
  image,
  onPress,
  ...rest
}: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} {...rest}>
      {image && <Image style={styles.image} source={image} />}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    borderRadius: 5,
    margin: 20,
  },
  text: {
    color: colors.black,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  image: {
    margin: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});
