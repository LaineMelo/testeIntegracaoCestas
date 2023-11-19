import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, ScrollView } from 'react-native';
import { TextInput, Text, Divider } from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { FAB } from 'react-native-paper';

import Container from '../../components/Container';
import Header from '../../components/Header';
import Body from '../../components/Body';

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
  const [foto, setFoto] = useState("");

  const handleCadastro = async () => {
    try {

      const response = await fetch('https://localhost:7164/api/Beneficiarios'
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
            foto,
          }),
        });

      if (response.ok) {
        console.log('Beneficiário registrado com sucesso!');
      } else {
        console.error('Erro ao registrar beneficiário!');

      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <Text>
      <Header title={'Cadastrar Perfil'} />
      </Text>
      <Body>

      <Text
          style={styles.title}
          variant="displayLarge">
          Beneficiário
        </Text>

        <View style={{ display: "flex",
            justifyContent: "center", 
            alignItems: "center" }}>
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
          label="Foto"
          value={foto}
          onChangeText={text => setFoto(text)}
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
    </Container>
  );

}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 20
  },
  button: {
    width: 200,
    //backgroundColor: '#787878',
    margin: 15
  },
    fab: {
      position: 'fixed',
      bottom:0,
      width:60,
      left: 320,
      marginBottom:20,

    }
});

export default CadastroBeneficiarioPage;