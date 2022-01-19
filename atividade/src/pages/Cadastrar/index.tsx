import { AxiosError } from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { Button, ButtonText, Loading } from "../../components";
import { useAuth } from "../../hook/auth";
import { IRegister, IUser } from "../../interfaces/User.interface";
import { LoginTypes } from "../../types/ScreenStack.types";

export default function Cadastrar({ navigation }: LoginTypes) {
  const { register } = useAuth();
  const [data, setData] = useState<IRegister>();
  const [isLoading, setIsLoading] = useState(true);
  function handleChange(item: IRegister) {
    setData({ ...data, ...item });
  }
  function handleLogin() {
    navigation.navigate("Login");
  }
  async function handleRegister() {
    try {
      setIsLoading(true);
      if (data?.email && data.name && data.password) {
        await register(data);
      } else {
        Alert.alert("Preencha todos os campos!!!");
      }
    } catch (error) {
      const err = error as AxiosError;
      const data = err.response?.data as IUser;
      let message = "";
      if (data.data) {
        for (const [key, value] of Object.entries(data.data)) {
          message = `${message} ${value}`;
        }
      }
      Alert.alert(`${data.message} ${message}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <KeyboardAvoidingView>
            <Text style={styles.title}>Diario Online</Text>
            <View style={styles.formRow}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="nome"
                onChangeText={(i) => handleChange({ name: i })}
              ></TextInput>
            </View>
            <View style={styles.formRow}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="e-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(i) => handleChange({ email: i })}
              ></TextInput>
            </View>
            <View style={styles.formRow}>
              <Text style={styles.label}>Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="senha"
                secureTextEntry={true}
                onChangeText={(i) => handleChange({ password: i })}
              ></TextInput>
            </View>
            <Button title="Salvar" onPress={handleRegister} />
            <ButtonText title="Voltar" onPress={handleLogin} />
          </KeyboardAvoidingView>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 36,
    color: "black",
    fontWeight: "500",
    marginBottom: 20,
    textAlign: "center",
  },
  formRow: {
    margin: 10,
    flexDirection: "row",
  },
  label: {
    fontSize: 18,
    color: "black",
    padding: 5,
  },
  input: {
    borderBottomWidth: 1,
    fontSize: 18,
    padding: 5,
    width: "50%",
    marginLeft: 5,
    marginBottom: 5,
  },
});
