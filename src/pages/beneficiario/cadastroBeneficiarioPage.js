import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { Avatar } from 'react-native-paper';


import Container from '../../components/Container';
import Header from '../../components/Header';
import Body from '../../components/Body';

import BackButton from '../../components/BackButton';

import { useNavigation } from '@react-navigation/native';

const CadastroBeneficiarioPage = () => {

  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [apelido, setApelido] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const handleCadastro = async () => {
    try {

      const response = await fetch('https://cestasgestor.azurewebsites.net/api/Beneficiarios'
        , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome,
            apelido,
            rg,
            cpf,
            telefone,
            logradouro,
            bairro,
            numero,
            cidade,
            estado,
          }),
          
        });

      setNome('');
      setApelido('');
      setRg('');
      setCpf('');
      setTelefone('');
      setLogradouro('');
      setBairro('');
      setNumero('');
      setCidade('');
      setEstado('');

        {/*
        const beneficiarioData = await responseBeneficiario.json();
        const beneficiarioId = beneficiarioData.id;*/}

      if (response.ok) {
        Alert.alert('Salvo','Beneficiário registrado com sucesso!');
        navigation.goBack();
      } else {
        Alert.alert('Erro','Erro ao registrar beneficiário!');

      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Body>
      <Header/>
      <BackButton/>
      <Text
          style={styles.title}
          variant="displayLarge">
          Beneficiário
        </Text>

        <View style={{ display: "flex",
            justifyContent: "center", 
            alignItems: "center",
            marginBottom: 10 }}>
          <Avatar.Icon size={50} icon="account" />
        </View>


        
        <ScrollView>
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
            label="Apelido"
            value={apelido}
            onChangeText={text => setApelido(text)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="RG"
            value={rg}
            onChangeText={text => setRg(text)}
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
            label="Telefone"
            value={telefone}
            onChangeText={text => setTelefone(text)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Logradouro"
            value={logradouro}
            onChangeText={text => setLogradouro(text)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Bairro"
            value={bairro}
            onChangeText={text => setBairro(text)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Número"
            value={numero}
            onChangeText={text => setNumero(text)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Cidade"
            value={cidade}
            onChangeText={text => setCidade(text)}
          />
          <TextInput
            style={styles.input}
            mode="outlined"
            label="Estado"
            value={estado}
            onChangeText={text => setEstado(text)}
          />
          
          <View style={{ display: "flex",
            justifyContent: "center",
            alignItems: "center" }}>
             
            <Button
              style={styles.button}
              icon="content-save"
              mode="contained"
              onPress={handleCadastro}>
              Cadastrar
            </Button>
          </View>
        </ScrollView>
       

        

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
    marginBottom: 5
  },
  button: {
    width: 200,
    //backgroundColor: '#787878',
    marginBottom: 15
  },
    
});

export default CadastroBeneficiarioPage;