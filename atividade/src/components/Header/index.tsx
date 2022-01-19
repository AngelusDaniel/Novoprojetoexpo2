import React from "react";
import { Image, View, Text, StyleSheet } from "react-native";
import { registerRootComponent } from 'expo';
import { HeaderProps } from "../../interfaces/Header.interface";

export default function Header({ hello, name, image }: HeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.title}>
        {hello && <Text style={styles.hello}>{hello}</Text>}
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.image}>
        <Image source={{ uri: image }} style={styles.img} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
  },
  title: {
    width: "50%",
    marginLeft: 20,
    justifyContent: "center",
  },
  image: {
    width: "50%",
    alignItems: "center",
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  hello: {
    fontSize: 18,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
