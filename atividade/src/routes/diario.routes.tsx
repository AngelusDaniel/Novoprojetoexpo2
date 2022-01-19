import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { registerRootComponent } from 'expo';
import { Home, Diario, Texto, CadastraDiario } from "../pages";
import { DiarioStackParamList } from "../types/ScreenStack.types";

const Stack = createStackNavigator<DiarioStackParamList>();

export default function DiarioRoute() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Diario" component={Diario} />
      <Stack.Screen name="Texto" component={Texto} />
      <Stack.Screen name="CadastraDiario" component={CadastraDiario} />
    </Stack.Navigator>
  );
}