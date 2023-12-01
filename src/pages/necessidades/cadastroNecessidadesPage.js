import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, Alert } from 'react-native';
import { TextInput, Text } from 'react-native-paper';

import Header from '../../components/Header';
import Body from '../../components/Body';

import BackButton from '../../components/BackButton';
import { useNavigation } from '@react-navigation/native';

const CadastroNecessidadesBeneficiarioPage = () => {

  const navigation = useNavigation();
  
  const [listaNecessidades, setListaNecessidades] = useState("");
  const [idBeneficiario, setIdBeneficiario] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
  
    const data = {
      idBeneficiario,
      listaNecessidades,
    };
  
    try {
      setLoading(true);

      const response = await fetch('https://cestasgestor.azurewebsites.net/api/ListaNecessidades', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        setIdBeneficiario('');
        setListaNecessidades('');
  
        Alert.alert('Objeto registrado com sucesso!');
        navigation.goBack();
      } else {
        Alert.alert('Erro ao fazer a solicitação para a API:', response.statusText);
      }
    } finally {
      setLoading(false);
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
          onPress={handleSubmit}
          disabled={loading}>
          {loading ? <ActivityIndicator color="white" /> : 'Cadastrar'}
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