import React, { useState } from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet, Text, View} from 'react-native';
import { TextInput, Divider } from 'react-native-paper';
import { Avatar } from 'react-native-paper';

import Container from '../../components/Container';
import Body from '../../components/Body';

import { useNavigation } from '@react-navigation/native';

const CadastroDependentesPage = () => {

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

        <View style={{ display: "flex",
          justifyContent: "center", 
          alignItems: "center" }}>
          <Button 
          style={styles.button}
          icon="content-save" 
          mode="contained"
          onPress={handleCadastroDependente}>
            Cadastrar
          </Button>
        </View>

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
    marginBottom:20,
    marginTop:50
  },
  button: {
    width: 200,
    //backgroundColor:'#787878',
    marginBottom:8
  }
});

export default CadastroDependentesPage;