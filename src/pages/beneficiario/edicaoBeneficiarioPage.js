// EditScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

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
    foto: '', 
    
  });

  useEffect(() => {
    // Lógica para buscar os detalhes do beneficiário com base no ID
    // Isso simula uma chamada à API para buscar os detalhes do beneficiário
    const fetchData = async () => {
      const response = await fetch(`https://cestasgestor.azurewebsites.net/api/Beneficiarios/${beneficiarioId}`);
      const data = await response.json();
      setBeneficiario(data);
    };

    fetchData();
  }, [beneficiarioId]);

  const handleSaveChanges = async () => {
    try {
      // Lógica para salvar as alterações do beneficiário
      const response = await fetch(`https://cestasgestor.azurewebsites.net/api/Beneficiarios/${beneficiarioId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(beneficiario),
      });

      if (response.ok) {
        console.log('Alterações salvas com sucesso!');
        // Navegar de volta para a tela de detalhes ou lista após salvar
        navigation.goBack();
      } else {
        console.error('Erro ao salvar alterações');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (   
    <Body>
      <Header/>
      <BackButton/>
      <ScrollView style={styles.container}>
        
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
          label="Foto"
          value={beneficiario.foto}
          onChangeText={(text) => setBeneficiario({ ...beneficiario, foto: text })}
        />
      
        <Button icon="content-save" mode="contained"
        style={{marginTop:15,
          marginBottom:15}}
        onPress={handleSaveChanges}>
          Salvar Alterações
        </Button>
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
