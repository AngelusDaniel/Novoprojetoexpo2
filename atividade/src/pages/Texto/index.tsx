import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/core";
// import { useNavigation } from "@react-navigation/core";
import { registerRootComponent } from 'expo';
import { Button, ButtonText, Header, Loading } from "../../components";
import { StyleSheet, SafeAreaView, Text, TextInput, Alert } from "react-native";
import {
  TextoParam,
  TextoParamProps,
} from "../../interfaces/Texto.interface";
import colors from "../../styles/colors";
import { DiarioTypes } from "../../types/ScreenStack.types";
import { apiTexto } from "../../services/data";
import { AxiosError } from "axios";

export default function Texto({ navigation }: DiarioTypes) {
  const route = useRoute();
  const data = route.params as TextoParamProps;
  const [isLoading, setIsLoading] = useState(true);
  const [dataTexto, setDataTexto] = useState<TextoParam | undefined>({
    ...data.textos,
  });

  function dataChange(item: TextoParam) {
    setDataTexto({ ...dataTexto, ...item });
  }
 
  async function onSubmit() {
    try {
      setIsLoading(true);
      if (dataTexto?.data && dataTexto.nome) {
        const dataEnvia = dataTexto.data.split("/");

        if (data.textos && data.textos.id > 0) {
          await apiTexto.update(data.textos.id, {
            nome: dataTexto.nome,
            data: `${dataEnvia[2]}-${dataEnvia[1]}-${dataEnvia[0]}`,
            diario_id: data.id,
          });
        } else {
          await apiTexto.store({
            nome: dataTexto.nome,
            data: `${dataEnvia[2]}-${dataEnvia[1]}-${dataEnvia[0]}`,
            diario_id: data.id,
          });
        }
        navigation.navigate("Diario", { id: data.id });
      } else {
        Alert.alert("Preencha todos os campos!!!");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      const err = error as AxiosError;
      console.log(err.response?.data);
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
        <SafeAreaView style={styles.container}>
          <Header name={data.nome} image={data.imagem} />
          <Text style={styles.text}>Textos</Text>
          <TextInput
            style={styles.input}
            placeholder="nome"
            value={dataTexto && dataTexto.nome}
            onChangeText={(i) => dataChange({ nome: i })}
          />
          <TextInput
            style={styles.input}
            placeholder="dia/mês/ano"
            value={dataTexto && dataTexto.data}
            onChangeText={(i) => dataChange({ data: i })}
          />
          <Button size="define" title="Salvar" onPress={onSubmit} />
          <ButtonText
            onPress={() => navigation.navigate("Diario", { ...data })}
            title="Voltar"
          />
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    width: "50%",
    margin: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.black,
    fontSize: 16,
    padding: 10,
    width: "50%",
    marginTop: 20,
    marginBottom: 20,
  },
});