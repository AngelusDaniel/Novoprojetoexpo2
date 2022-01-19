import React from "react";
import { Text, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { registerRootComponent } from 'expo';
import DiarioStack from "./diario.routes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../styles/colors";
import { File, Sair } from "../pages";

const Drawer = createDrawerNavigator();

export default function HomeRoute() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.gray },
        headerTintColor: colors.white,
        headerTitle: () => <Text style={styles.title}>Diario Online</Text>,
        drawerStyle: {
          backgroundColor: colors.gray,
        },
        drawerInactiveTintColor: colors.white,
        drawerActiveTintColor: colors.white,
      }}
    >
      <Drawer.Screen
        name="DiarioStack"
        component={DiarioStack}
        options={{
          drawerLabel: "Diarios",
          drawerIcon: () => (
            <MaterialCommunityIcons name="book" size={24} color={colors.white} />
          ),
        }}
      />
    
      <Drawer.Screen name="File" component={File} />
      <Drawer.Screen name="Sair" component={Sair} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 18,
  },
});
