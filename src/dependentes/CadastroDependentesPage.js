import React, { useState } from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import { TextInput, Text, Divider } from 'react-native-paper';
import { Avatar } from 'react-native-paper';

import Container from '../components/Container';
import Body from '../components/Body';

import { useNavigation } from '@react-navigation/native';

const CadastoDependentesPage = () => {

    const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [parentesco, setParentesco] = useState("");


  const handleCadastroDependente = async () => {
    try {

      const response = await fetch('https://localhost:7164/api/Dependentes'
        , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome,
            cpf,
            parentesco,

          }),
        });

      if (response.ok) {
        console.log('Dependente registrado com sucesso!');
      } else {
        console.error('Erro ao registrar dependente!');

      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

    return(
      <Container>
        <Body>
        
        <Text
          style={styles.title}
          variant="displayLarge">
          Cadastrar Dependentes
        </Text>

        <br/>

        <button className="btn btn-light btn-sm" onClick={() => navigation.navigate('beneficiario')}>Voltar</button>

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
          label="Parentesco"
          value={parentesco}
          onChangeText={text => setParentesco(text)}
        />

        <div style={{ display: "flex", 
          justifyContent: "center", 
          alignItems: "center" }}>
          <Button 
          style={styles.button}
          icon="content-save" 
          mode="contained"
          onPress={handleCadastroDependente}>
            Cadastrar
          </Button>
        </div>

        </Body>      
      </Container>
    );

}

const styles = StyleSheet.create({
  input:{
    marginBottom:10,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    marginBottom:20
  },
  button: {
    width: 200,
    backgroundColor:'#787878',
    marginBottom:8
  }
});

export default CadastoDependentesPage;