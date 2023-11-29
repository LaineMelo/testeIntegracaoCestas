import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';

import BackButton from '../../components/BackButton';

import Header from '../../components/Header';
import Body from '../../components/Body';

import { useNavigation } from '@react-navigation/native';

const CadastroDependentesPage = () => {

  const navigation = useNavigation();

  const [idBeneficiario, setIdBeneficiario] = useState("");
  const [nome, setNome] = useState("");
  const [parentesco, setParentesco] = useState("");
  const [cpf, setCpf] = useState("");

  const handleCadastroDependente = async () => {
    try {

      const response = await fetch('https://cestasgestor.azurewebsites.net/api/Dependentes'
        , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idBeneficiario,
            nome,
            parentesco,
            cpf,
           

          }),


        });

        setIdBeneficiario ('');
        setNome('');
        setParentesco('');
        setCpf('');

      if (response.ok) {
        Alert.alert('Salvo','Dependente registrado com sucesso!');
        navigation.goBack();
      } else {
        Alert.alert('Erro','Erro ao registrar dependente!');

      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (

    <Body>
      <Header />
      <BackButton />

      <Text
        style={styles.title}
        variant="displayLarge">
        Cadastrar Dependentes
      </Text>

      <TextInput
          style={styles.input}
          mode="outlined"
          label="Beneficiário"
          value={idBeneficiario}
          onChangeText={text => setIdBeneficiario(text)}
        />

      <TextInput
        style={styles.input}
        mode="outlined"
        label="Nome"
        value={nome}
        onChangeText={text => setNome(text)}
      />

      <TextInput
        style={styles.input}
        mode="outlined"
        label="CPF"
        value={cpf}
        onChangeText={text => setCpf(text)}
      />

      <TextInput
        style={styles.input}
        mode="outlined"
        label="Parentesco"
        value={parentesco}
        onChangeText={text => setParentesco(text)}
      />

      <View style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <Button
          style={styles.button}
          icon="content-save"
          mode="contained"
          onPress={handleCadastroDependente}>
          Cadastrar
        </Button>
      </View>

    </Body>

  );

}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 20,
    marginTop: 50
  },
  button: {
    width: 200,
    //backgroundColor:'#787878',
    marginBottom: 8
  }
});

export default CadastroDependentesPage;