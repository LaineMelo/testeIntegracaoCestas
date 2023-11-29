// EditScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import axios from 'axios';

import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import Body from '../../components/Body';

const EditScreen = ({ route, navigation }) => {
  const { beneficiarioId } = route.params;
  const [beneficiario, setBeneficiario] = useState({
    nome: '',
    apelido: '',
    rg: '',
    cpf: '',
    telefone: '',
    logradouro: '',
    bairro: '',
    numero: '',
    cidade: '',
    estado: '', 
    
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://cestasgestor.azurewebsites.net/api/Beneficiarios/${beneficiarioId}`);
        setBeneficiario(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do beneficiário:', error);
      }
    };

    fetchData();
  }, [beneficiarioId]);

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`https://cestasgestor.azurewebsites.net/api/Beneficiarios/${beneficiarioId}`, beneficiario);

      if (response.status === 200) {
        console.log('Alterações salvas com sucesso!');
        navigation.goBack();
      } else {
        Alert.alert('Erro', 'Erro ao salvar alterações');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

    

  return (   
    <Body>
      <Header/>
      <BackButton/>
      <ScrollView>
      <View style={styles.container}>
        
        <Text style={styles.title}>Editar Beneficiário</Text>
         
        <TextInput
          label="Nome"
          value={beneficiario.nome}
          onChangeText={(text) => setBeneficiario({ ...beneficiario, nome: text })}
        />
        <TextInput
          label="Apelido"
          value={beneficiario.apelido}
          onChangeText={(text) => setBeneficiario({ ...beneficiario, apelido: text })}
        />
        <TextInput
          label="RG"
          value={beneficiario.rg}
          onChangeText={(text) => setBeneficiario({ ...beneficiario, rg: text })}
        />
        <TextInput
          label="CPF"
          value={beneficiario.cpf}
          onChangeText={(text) => setBeneficiario({ ...beneficiario, cpf: text })}
        />
        <TextInput
          label="Telefone"
          value={beneficiario.telefone}
          onChangeText={(text) => setBeneficiario({ ...beneficiario, telefone: text })}
        />
        <TextInput
          label="Logradouro"
          value={beneficiario.logradouro}
          onChangeText={(text) => setBeneficiario({ ...beneficiario, logradouro: text })}
        />
        <TextInput
          label="Bairro"
          value={beneficiario.bairro}
          onChangeText={(text) => setBeneficiario({ ...beneficiario, bairro: text })}
        />
        <TextInput
          label="Número"
          value={beneficiario.numero}
          onChangeText={(text) => setBeneficiario({ ...beneficiario, numero: text })}
        />
        <TextInput
          label="Cidade"
          value={beneficiario.cidade}
          onChangeText={(text) => setBeneficiario({ ...beneficiario, cidade: text })}
        />
        <TextInput
          label="Estado"
          value={beneficiario.estado}
          onChangeText={(text) => setBeneficiario({ ...beneficiario, estado: text })}
        />
      
        <Button icon="content-save" mode="contained"
        style={{marginTop:15,
          marginBottom:15}}
        onPress={handleSaveChanges}>
          Salvar Alterações
        </Button>
      </View>
    </ScrollView>
    </Body>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default EditScreen;
