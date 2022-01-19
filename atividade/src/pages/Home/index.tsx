import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Header, ButtonDiario, Loading } from "../../components";
import {
  DiarioProps,
  IDiario,
  IInterfaceDiario,
} from "../../interfaces/Diario.interface";
import { DiarioTypes } from "../../types/ScreenStack.types";
import { useAuth } from "../../hook/auth";
import apiDiario from "../../services/data/Diario";
import { AxiosError } from "axios";
import colors from "../../styles/colors";

export default function Home({ navigation }: DiarioTypes) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IInterfaceDiario[]>();
  function handleDiario(item: DiarioProps) {
    navigation.navigate("Diario", { ...item });
  }

  function cadastraDiario() {
    navigation.navigate("CadastraDiario", {
      nome: user?.name,
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiDiario.index();
        setData(response.data.data);
      } catch (error) {
        const err = error as AxiosError;
        const data = err.response?.data as IDiario;
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
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <SafeAreaView style={styles.container}>
          {user && (
            <Header
              hello="Olá"
              name={user?.name}
              image={user.profile_photo_url}
            />
          )}
          {data && (
            <>
              <Text style={styles.message}>
                Você possui {data.length} diarios feitos
              </Text>
              <View>
                <FlatList
                  data={data}
                  renderItem={({ item }) => (
                    <ButtonDiario
                      key={item.id}
                      title={item.nome}
                      onPress={() => handleDiario(item)}
                      image={{ uri: item.imagem }}
                    />
                  )}
                  numColumns={2}
                />
              </View>
              <TouchableOpacity style={styles.button} onPress={cadastraDiario}>
                <Text style={styles.text}>+</Text>
              </TouchableOpacity>
            </>
          )}
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 110,
    marginTop: 10,
  },
  message: {
    fontSize: 18,
    marginTop: 20,
    marginLeft: 20,
  },
  button: {
    position: "absolute",
    bottom: 1,
    right: 10,
    backgroundColor: colors.gray,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 40,
  },
});
