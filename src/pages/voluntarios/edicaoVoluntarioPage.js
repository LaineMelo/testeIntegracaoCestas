import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

import BackButton from '../../components/BackButton';

import Header from '../../components/Header';
import Body from '../../components/Body';
const EditScreen = ({ route, navigation }) => {
  const { voluntarioId } = route.params;
  const [voluntario, setVoluntario] = useState({
    nome: '',
    cpf: '',
    email: '',
    password: '',
    logradouro: '',
    bairro: '',
    numero: '',
    cidade: '',
    
    // Adicione outras propriedades do voluntário conforme necessário
  });

  useEffect(() => {
    // Lógica para buscar os detalhes do voluntário com base no ID
    // Isso simula uma chamada à API para buscar os detalhes do voluntário
    const fetchData = async () => {
      const response = await fetch(`https://localhost:7164/api/Voluntario/${voluntarioId}`);
      const data = await response.json();
      setVoluntario(data);
    };

    fetchData();
  }, [voluntarioId]);

  const handleSaveChanges = async () => {
    try {
      // Lógica para salvar as alterações do voluntário
      const response = await fetch(`https://localhost:7164/api/Voluntario/${voluntarioId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(voluntario),
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
      
      <ScrollView>
        <Text style={styles.title}>Editar Voluntário</Text>
        <TextInput
          label="Nome"
          value={voluntario.nome}
          onChangeText={(text) => setVoluntario({ ...voluntario, nome: text })}
        />
        <TextInput
          label="CPF"
          value={voluntario.cpf}
          onChangeText={(text) => setVoluntario({ ...voluntario, cpf: text })}
        />
        <TextInput
          label="Email"
          value={voluntario.email}
          onChangeText={(text) => setVoluntario({ ...voluntario, email: text })}
        />
        <TextInput
          label="Password"
          value={voluntario.password}
          onChangeText={(text) => setVoluntario({ ...voluntario, password: text })}
        />
        <TextInput
          label="Logradouro"
          value={voluntario.logradouro}
          onChangeText={(text) => setVoluntario({ ...voluntario, logradouro: text })}
        />
        <TextInput
          label="Bairro"
          value={voluntario.bairro}
          onChangeText={(text) => setVoluntario({ ...voluntario, bairro: text })}
        />
        <TextInput
          label="Número"
          value={voluntario.numero}
          onChangeText={(text) => setVoluntario({ ...voluntario, numero: text })}
        />
        <TextInput
          label="Cidade"
          value={voluntario.cidade}
          onChangeText={(text) => setVoluntario({ ...voluntario, cidade: text })}
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
