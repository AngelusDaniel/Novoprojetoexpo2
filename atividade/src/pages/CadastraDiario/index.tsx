import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/core";
import { Button, ButtonText, Header, Loading } from "../../components";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  Alert,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import colors from "../../styles/colors";
import { DiarioTypes } from "../../types/ScreenStack.types";
import { AxiosError } from "axios";
import {
  DiarioProps,
  ICadastraDiarioParam,
} from "../../interfaces/Diario.interface";
import { FontAwesome } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";

export default function CadastraDiario({ navigation }: DiarioTypes) {
  const route = useRoute();
  const data = route.params as DiarioProps;
  const [isLoading, setIsLoading] = useState(true);
  const [cadastra, setCadastra] = useState<ICadastraDiarioParam>();
  const [startOver, setStartOver] = useState(true);
  

  function dataChange(item: ICadastraDiarioParam) {
    setCadastra({ ...cadastra, ...item });
  }
 
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      base64: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setCadastra({ ...cadastra, imagem: result });
    }
  };
  async function onSubmit() {
    try {
      setIsLoading(true);
      if (cadastra?.nome && cadastra.escrita && cadastra.imagem) {
        const dataEnvia = cadastra.escrita.split("/");
        console.log(cadastra);
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
        <>
          {startOver ? (
            <SafeAreaView style={styles.container}>
              <Header name={data.nome} image={data.imagem} />
              <Text style={styles.text}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="nome"
                value={cadastra && cadastra.nome}
                onChangeText={(i) => dataChange({ nome: i })}
              />
              <Text style={styles.text}>texto</Text>
              <TextInput
                style={styles.input}
                placeholder="..."
                value={cadastra && cadastra.escrita}
                onChangeText={(i) => dataChange({ escrita: i })}
              />
              
              
            </SafeAreaView>
          ) : (
           
              <View style={styles.buttonTop}>
                <View style={styles.buttonTopPosition}>
                  
                </View>
               
                
                  </View>
                
              
            
          )}
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    width: "50%",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.black,
    fontSize: 16,
    padding: 10,
    width: "50%",
    marginTop: 10,
    marginBottom: 10,
  },
  imagem: {
    flexDirection: "row",
  },
  img: {
    width: 100,
    height: 100,
  },
  buttonImage: {
    margin: 10,
  },

  buttonTop: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  buttonTopPosition: {
    position: "absolute",
    top: "5%",
    right: "5%",
  },
  textClose: {
    color: colors.white,
    fontSize: 20,
  },
  buttonFlip: {
    position: "absolute",
    top: "5%",
    left: "5%",
  },
  textFlip: {
    fontSize: 18,
    marginBottom: 10,
    color: colors.white,
  },
  viewTakePicture: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    flex: 1,
    width: "100%",
    padding: 20,
    justifyContent: "space-between",
  },
  positionTakePicture: {
    alignSelf: "center",
    flex: 1,
    alignItems: "center",
  },
  buttonTakePicture: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 50,
    backgroundColor: colors.white,
  },
});