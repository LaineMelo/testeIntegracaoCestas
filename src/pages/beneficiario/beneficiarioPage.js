import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { TextInput, Button, Text, Card, FAB } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import DeleteButton from '../../components/DeleteButton';
import SearchButton from '../../components/SearchButton';
import BackButton from '../../components/BackButton';

import  Header  from '../../components/Header';
import Body from '../../components/Body';

const BeneficiarioPage = () => {
  const navigation = useNavigation();

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [beneficiarioId, setBeneficiarioId] = useState(null);


  useEffect(() => {
    // Lógica para buscar beneficiários com base no nome
    setLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const response = await fetch(`https://cestasgestor.azurewebsites.net/api/Beneficiarios?nome=${searchText}`,);
        if (!response.ok) {
          console.error('Erro na solicitação:', response.status);
          return;
        }
        const data = await response.json();
        setSearchResults(data);

      } catch (error) {
        console.error('Erro ao buscar beneficiários:', error);
      }
    };
    fetchData();
  }, [searchText]);

  const handleSearch = () => {
    console.log('Botão de pesquisa pressionado');
    // Altere a consulta para pesquisar por nome
    const fetchData = async () => {
      const response = await fetch(`https://cestasgestor.azurewebsites.net/api/Beneficiarios?nome=${searchText}`);

      if (!response.ok) {
        console.error('Erro na solicitação:', response.status);
        return;

      }

      const data = await response.json();
      setSearchResults(data);
    };

    fetchData();

  };

  const handleNavigateToEdit = (beneficiarioId) => {
    // Use o operador for para iterar sobre a lista de resultados
    for (const item of searchResults) {
      if (item.id === beneficiarioId) {
        const beneficiarioIdParaEditar = {
          beneficiarioId: item.id,
        };
        navigation.navigate('edicaoBeneficiario', beneficiarioIdParaEditar);
        break;
      }
    }
  };

  const handleDelete = async (beneficiarioId) => {
    try {
      const response = await fetch(`https://cestasgestor.azurewebsites.net/api/Beneficiarios/${beneficiarioId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Beneficiário excluído com sucesso!');
        // Atualizar a lista após excluir o beneficiário
        const updatedResults = searchResults.filter((item) => item.id !== beneficiarioId);
        setSearchResults(updatedResults);
      } else {
        alert('Erro ao excluir beneficiário:', response.status);
      }
    } catch (error) {
      console.error('Erro ao excluir beneficiário:', error);
    }
  };

  return (

    <Body>
      <Header/>
      
        <BackButton/>
        <Text
          style={styles.title}>Pesquisar Beneficiário</Text>
        <TextInput
          style={{
            margin: 15,
        
          }}
          label="Nome do Beneficiário"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <SearchButton
          onPress={handleSearch} />
        
          <FlatList
          style={{
            backgroundColor:"#FFFF"
          }}
            data={searchResults}
            keyExtractor={(item) => item.beneficiarioId || (item.id ? item.id.toString() : '')}
            renderItem={({ item }) => (
              <Card
              style={{
                margin:15,
              }}>
                <Card.Content>
                  <Text variant="bodyMedium">Nome: {item.nome}</Text>
                  <Text variant="bodyMedium">Apelido: {item.apelido}</Text>
                  <Text variant="bodyMedium">CPF: {item.cpf}</Text>
                  <Text variant="bodyMedium">RG: {item.rg}</Text>
                  <Text variant="bodyMedium">ID: {item.id}</Text>
                </Card.Content>
                <Card.Actions>
                  <Button
                  mode="contained"
                  style={{
                    marginRight:10,
                  }}
                   onPress={() => handleNavigateToEdit(item.id)}>
                    Editar
                  </Button>
                  <DeleteButton onPress={() => handleDelete(item.id)} />
                </Card.Actions>
              </Card>
            )}
          />
        
       
      <View>
        <FAB
          label="+ Cadastrar Beneficiário"
          style={styles.fab}
          onPress={() => navigation.navigate('cadastroBeneficiario')}
        />
      </View>

    </Body>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  title: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  fab: {
    position: 'relative',
    width:250,
    marginTop:20,
    bottom: 10,
    left: 120,
    fontWeight:700

  },
});

export default BeneficiarioPage;