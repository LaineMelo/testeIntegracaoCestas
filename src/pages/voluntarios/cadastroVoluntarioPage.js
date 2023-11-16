import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { TextInput, Text, Divider } from 'react-native-paper';
import { Avatar } from 'react-native-paper';

import Container from '../../components/Container';
import Header from '../../components/Header';
import Body from '../../components/Body';

import { useNavigation } from '@react-navigation/native';

const CadastroVoluntarioPage = () => {

  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");

  const handleCadastro = async () => {
    try {

      const response = await fetch('https://localhost:7164/api/Voluntario'
        , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome,
            cpf,
            email,
            password,
            logradouro,
            bairro,
            numero,
            cidade,
          }),
        });

      if (response.ok) {
        console.log('Voluntário registrado com sucesso!');
      } else {
        console.error('Erro ao registrar voluntário!');

      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container>
      <Header title={'Voluntario'} />
      <Body>

      <Text
          style={styles.title}
          variant="displayLarge">
          Cadastrar Voluntário
        </Text>

        <div style={{ display: "flex", 
            justifyContent: "center", 
            alignItems: "center" }}>
          <Avatar.Icon size={50} icon="account" />
        </div>

        <br/>

        <button className="btn btn-light btn-sm" onClick={() => navigation.navigate('home')}>Voltar</button>

        <br/>

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
          label="email"
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          mode="outlined"
          label="password"
          value={password}
          onChangeText={text => setPassword(text)}
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

        <div style={{ display: "flex", 
          justifyContent: "center", 
          alignItems: "center" }}>
          <Button
            style={styles.button}
            icon="content-save"
            mode="contained"
            onPress={handleCadastro}>
            Cadastrar
          </Button>
        </div>

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
    backgroundColor: '#787878',
    marginBottom: 8
  }
});

export default CadastroVoluntarioPage;