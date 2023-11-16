import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Modal } from 'react-native';
import { TextInput, Button, Text, Card, FAB, Portal, Provider, containerStyle } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';

import DeleteButton from '../../components/DeleteButton';
import SearchButton from '../../components/SearchButton';

const BeneficiarioPage = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [visibleModal, setVisibleModal] = useState(false);
  const [quantidadeCesta, setQuantidadeCesta] = useState('');
  const [dataEntrega, setDataEntrega] = useState('');

  const [listaNecessidades, setListaNecessidades] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [beneficiarioId, setBeneficiarioId] = useState(null);

  const containerStyle = {backgroundColor: 'white', padding: 20};

  useEffect(() => {
    // Lógica para buscar beneficiários com base no nome
    setLoading(true);
    setError(null);


    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:7164/api/Beneficiarios?nome=${searchText}`);
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


  const handleOpenModalCesta = (beneficiarioId) => {
    setBeneficiarioId(beneficiarioId);
    setVisibleModal(true);
  };

  const handleCloseModalCesta = () => {
    setVisibleModal(false);
  };

  const handleOpenModalLista = (beneficiarioId) => {
    setBeneficiarioId(beneficiarioId);
    setVisibleModal(true);
  };

  const handleCloseModalLista = () => {
    setVisibleModal(false);
  };

  

  const handleAdicionarCesta = async (idBeneficiario) => {

    const dataEntrega = "2023-10-06T13:20:00";
    const dataHora = Date.parse(dataEntrega);

    const dataHoraFormatada = new Date(dataHora).toISOString();
    

    // Validar se a quantidade de cestas e a data de entrega foram fornecidas
    if (!quantidadeCesta || !dataEntrega) {
      alert('Por favor, forneça a quantidade de cestas e a data de entrega.');
      return;
    }

    try {
      const response = await fetch(`https://localhost:7164/api/RegistroCesta`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
          idBeneficiario,
          idVoluntario: 1,
          quantidadeCesta,
          dataEntrega: dataHoraFormatada,
        }),

      });

      if (response.ok) {
        console.log('Cesta adicionada com sucesso!');
        // Lógica adicional, se necessário
      } else {
        console.error('Erro adicionar cesta:', response.status);
      }
    } catch (error) {
      console.error('Erro ao adicionar cesta:', error);
    }
    handleCloseModalCesta();


    setQuantidadeCesta('');
    setDataEntrega('');
    setBeneficiarioId(null);
  };

  const handleNecessidades = async (idBeneficiario) => {
    try {
      const response = await fetch(`https://localhost:7164/api/ListaNecessidades`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({
          idBeneficiario,
          listaNecessidades,
        }),

      });

      if (response.ok) {
        console.log('Lista atuailzada!');
        // Lógica adicional, se necessário
      } else {
        console.error('Erro ao atualizar lista:', response.status);
      }
    } catch (error) {
      console.error('Erro ao atualizar lista:', error);
    }
    handleCloseModalLista();
   



  }


  const handleSearch = () => {
    console.log('Botão de pesquisa pressionado');
    // Altere a consulta para pesquisar por nome
    const fetchData = async () => {
      const response = await fetch(`https://localhost:7164/api/Beneficiarios?nome.like=${searchText}`);

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
      const response = await fetch(`https://localhost:7164/api/Beneficiarios/${beneficiarioId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Beneficiário excluído com sucesso!');
        // Atualizar a lista após excluir o beneficiário
        const updatedResults = searchResults.filter((item) => item.id !== beneficiarioId);
        setSearchResults(updatedResults);
      } else {
        console.error('Erro ao excluir beneficiário:', response.status);
      }
    } catch (error) {
      console.error('Erro ao excluir beneficiário:', error);
    }
  };

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Pesquisar Beneficiário</Text>
      <TextInput
        label="Nome do Beneficiário"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <SearchButton onPress={handleSearch} />

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.beneficiarioId || (item.id ? item.id.toString() : '')}
        renderItem={({ item }) => (

          <Card>
            <Card.Content>
              <Text variant="bodyMedium">Nome: {item.nome}</Text>
              <Text variant="bodyMedium">Apelido: {item.apelido}</Text>
              <Text variant="bodyMedium">CPF: {item.cpf}</Text>
              <Text variant="bodyMedium">RG: {item.rg}</Text>
              <Text variant="bodyMedium">ID: {item.id}</Text>

            </Card.Content>
            <Card.Actions>
              <Button onPress={() => handleNavigateToEdit(item.id)}>
                Editar
              </Button>
              <DeleteButton onPress={() => handleDelete(item.id)} />
              
              <Button mode="contained" onPress={() => handleOpenModalCesta(item.id)}>
                Adicionar Cesta
              </Button>
              
              <Button mode="contained" onPress={() => handleOpenModalLista(item.id)}>
                Lista
              </Button>

              {/* Modal para adicionar cesta */}
              <Provider>
                <Portal>
                  <Modal visible={visibleModal} onDismiss={handleCloseModalCesta} contentContainerStyle={containerStyle}>
                    <View style={styles.modalContainer}>
                      <Text>Quantidade de Cestas</Text>
                      <TextInput
                        label="Quantidade de Cestas"
                        value={quantidadeCesta}
                        onChangeText={(text) => setQuantidadeCesta(text)}
                      />

                      <Text>Data de Entrega</Text>
                      <TextInput
                        label="Data de Entrega"
                        value={dataEntrega}
                        onChangeText={(text) => setDataEntrega(text)}
                      />

                      <Button onPress={() => handleAdicionarCesta(item.id)}>
                        Adicionar Cesta
                      </Button>
                    </View>
                  </Modal>
                </Portal>
              </Provider>

              <Provider>
                <Portal>
                  <Modal visible={visibleModal} onDismiss={handleCloseModalLista} contentContainerStyle={containerStyle}>
                    <View style={styles.modalContainer}>
                      <Text>Ista de Necessidades</Text>
                      <TextInput
                        label="Liste os objetos"
                        value={listaNecessidades}
                        onChangeText={(text) => setListaNecessidades(text)}
                      />

                      <Button onPress={() => handleNecessidades(item.id)}>
                        Atualizar Lista
                      </Button>
                    </View>
                  </Modal>
                </Portal>
              </Provider>
            </Card.Actions>
          </Card>
        )}
      />



      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('cadastroBeneficiario')}
      />
    </View>
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default BeneficiarioPage;