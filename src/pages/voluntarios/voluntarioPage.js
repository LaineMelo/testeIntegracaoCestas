import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { TextInput, Button, Text, Card, FAB, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import BackButton from '../../components/BackButton';

import Header from '../../components/Header';
import Body from '../../components/Body';

const VoluntarioPage = () => {

  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [voluntarioId, setVoluntarioId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  


  useEffect(() => {
    // Lógica para buscar voluntários com base no nome
    setLoading(true);
    setError(null);


    const fetchData = async () => {
      try {
        const response = await fetch(`https://cestasgestor.azurewebsites.net/api/Voluntario?nome=${searchText}`);
        if (!response.ok) {
          console.error('Erro na solicitação:', response.status);
          return;
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Erro ao buscar voluntários:', error);
      }
    };


    fetchData();
  }, [searchText]);

  const handleSearch = () => {
    console.log('Botão de pesquisa pressionado');
    // Altere a consulta para pesquisar por nome
    const fetchData = async () => {
      const response = await fetch(`https://cestasgestor.azurewebsites.net/api/Voluntario?nome.like=${searchText}`);

      if (!response.ok) {
        console.error('Erro na solicitação:', response.status);
        return;
      }

      const data = await response.json();
      setSearchResults(data);
    };

    fetchData();
  };


  const handleNavigateToEdit = (voluntarioId) => {
    // Use o operador for para iterar sobre a lista de resultados
    for (const item of searchResults) {
      if (item.id === voluntarioId) {
        const voluntarioIdParaEditar = {
          voluntarioId: item.id,
        };
        navigation.navigate('edicaoVoluntario', voluntarioIdParaEditar);
        break;
      }
    }
  };

  const handleDelete = async (voluntarioId) => {
    try {
      const response = await fetch(`https://cestasgestor.azurewebsites.net/api/Voluntario/${voluntarioId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Voluntário excluído com sucesso!');
        // Atualizar a lista após excluir o beneficiário
        const updatedResults = searchResults.filter((item) => item.id !== voluntarioId);
        setSearchResults(updatedResults);
      } else {
        console.error('Erro ao excluir voluntário:', response.status);
      }
    } catch (error) {
      console.error('Erro ao excluir voluntário:', error);
    }
  };

  return (
    <Body>

      <Header />
      <BackButton />

      <Text style={styles.title}>Pesquisar Voluntário</Text>
      <TextInput
        style={{
          margin: 15,
        }}
        label="Nome do Voluntário"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <Button icon="card-search-outline" mode="contained"
        style={{
          marginRight: 20,
          marginLeft: 20,
          marginBottom: 10,
        }}
        onPress={handleSearch}>
        Pesquisar
      </Button>

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.voluntarioId || (item.id ? item.id.toString() : '')}
        renderItem={({ item }) => (

          <Card
            style={{
              margin: 15,
            }}>
            <Card.Content>
              <Text variant="bodyMedium">Nome: {item.nome}</Text>
              <Text variant="bodyMedium">CPF: {item.cpf}</Text>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => handleNavigateToEdit(item.id)}>
                Editar
              </Button>
              <Button onPress={() => handleDelete(item.id)}>
                Excluir
              </Button>
            </Card.Actions>
          </Card>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              handleSearch(); // Chame a função fetchData() ou outra função para buscar dados
              setRefreshing(false);
            }}
          />
        }
      />

      <FAB
        label='+ Cadastrar Voluntário'
        style={styles.fab}
        onPress={() => navigation.navigate('cadastroVoluntario')}
      />
    </Body>
  );
};

const styles = StyleSheet.create({

  title: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  fab: {
    position: 'relative',
    width: 250,
    marginTop: 20,
    bottom: 10,
    left: 120,
    fontWeight: 700

  },
});

export default VoluntarioPage;