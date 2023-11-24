import React, { useState, route } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import axios from 'axios';

import Container from '../../components/Container';
import Header from '../../components/Header';
import Body from '../../components/Body';

import BackButton from '../../components/BackButton';

const CadastroNecessidadesBeneficiarioPage = ({ route }) => {


  const [listaNecessidades, setListaNecessidades] = useState("");

  const [idBeneficiario, setIdBeneficiario] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      idBeneficiario,
      listaNecessidades,    
    }

    try {
      const response = await axios.post('https://localhost:7164/api/ListaNecessidades', data);

      setIdBeneficiario('');
      setListaNecessidades('');


      console.log(response.data);
      alert('Dados salvos com sucesso!');
    } catch (error) {
      console.log(error);
      alert('Erro ao salvar os dados!');
    }
  };


  


  return (
   <Body>
      <Header/>
      <BackButton />
      
        <Text>Cadastrar Objetos</Text>

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
          label="Descrição"
          value={listaNecessidades}
          onChangeText={text => setListaNecessidades(text)}
        />

        <Button
          icon="content-save"
          mode="contained"
          onPress={handleSubmit}>
          Cadastrar
        </Button>

      </Body>
    
  );

}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  }
});

export default CadastroNecessidadesBeneficiarioPage;