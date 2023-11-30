// EditScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
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
    estado: '', 
    
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://cestasgestor.azurewebsites.net/api/Beneficiarios/${beneficiarioId}`);
        if (response.ok) {
          const data = await response.json();
          setBeneficiario(data);
        } else {
          console.error('Erro ao buscar detalhes do beneficiário:', response.status);
        }
      } catch (error) {
        console.error('Erro ao buscar detalhes do beneficiário:', error);
      }
    };
  
    fetchData();
  }, [beneficiarioId]);
  
  const handleSaveChanges = async () => {
    try {
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
        const errorData = await response.json();
        Alert.alert('Erro:', `Erro ao salvar alterações: ${JSON.stringify(errorData)}`);
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
         
        {Object.keys(beneficiario).map((key) => (
            <TextInput
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              value={beneficiario[key]}
              onChangeText={(text) => setBeneficiario({ ...beneficiario, [key]: text })}
            />
          ))}
        
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
