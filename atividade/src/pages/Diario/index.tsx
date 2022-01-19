import React, { useCallback, useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
// import { useNavigation } from "@react-navigation/core";
import { SafeAreaView, Image, StyleSheet, Alert } from "react-native";
import {
  Header,
  Textos,
  ButtonText,
  Loading,
} from "../../components";
import {
  DiarioProps,
  IInterfaceDiario,
} from "../../interfaces/Diario.interface";
import {
  ITextoParam,
  TextoParamProps,
} from "../../interfaces/Texto.interface";
import { DiarioTypes } from "../../types/ScreenStack.types";
import { AxiosError } from "axios";
import { IResponse } from "../../interfaces/Response.interface";
import { apiDiario, apiTexto } from "../../services/data";
import api from "../../services/api";

export default function Diario({ navigation }: DiarioTypes) {
  const route = useRoute();
  const { id } = route.params as DiarioProps;
  const [data, setData] = useState<IInterfaceDiario>();
  const [isLoading, setIsLoading] = useState(true);
  // const navigation = useNavigation();

  function handleTextoDiario() {
    navigation.navigate("Texto", {
      id: data?.id,
      nome: data?.nome,
    });
  }

  function textoEdit(item: ITextoParam) {
    navigation.navigate("Texto", {
      id: data?.id,
      nome: data?.nome,
      textos: { ...item },
    });
  }
  async function castraRemove() {
    console.log("Castra", { ...data });
    try {
      if (data) {
        await fetchData();
      }
    } catch (error) {
      const err = error as AxiosError;
      const data = err.response?.data as IResponse;
      let message = "";
      if (data.data) {
        for (const [key, value] of Object.entries(data.data)) {
          message = `${message} ${value}`;
        }
      }
      Alert.alert(`${data.message} ${message}`);
    }
  }
  const fetchData = useCallback(async () => {
    try {
      const response = await apiDiario.show(id);
  
      const diario = {
        id: response.data.data.id,
        nome: response.data.data.nome,
        imagem: response.data.data.imagem,
        textos: response.data.data.textos
          ? response.data.data.textos.map((item) => {
              const dataTexto = item.data.split("-");
              return {
                id: item.id,
                nome: item.nome,
                data: `${dataTexto[2]}/${dataTexto[1]}/${dataTexto[0]}`,
              };
            })
          : undefined,
      };
      setData(diario);
    } catch (error) {
      const err = error as AxiosError;
      const data = err.response?.data as IResponse;
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
  }, []);

  async function textoRemove(item: ITextoParam) {
    try {
      setIsLoading(true);
      await apiTexto.destroy(item.id);
      await fetchData();
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }
  }
  function voltar() {
    navigation.navigate("Home");
  }

  useEffect(() => {
    navigation.addListener("focus", () => fetchData());
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <SafeAreaView>
          {data && (
            <>
              <Header name={data.nome} image={data.imagem} />
              <Textos
                title="Texto"
                onPress={handleTextoDiario}
                buttonEdit={textoEdit}
                buttonRemove={textoRemove}
                textos={data.textos}
              />
              <ButtonText onPress={voltar} title="Voltar" />
            </>
          )}
        </SafeAreaView>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  image: {
    width: "10%",
    height: "10%",
  },
});
