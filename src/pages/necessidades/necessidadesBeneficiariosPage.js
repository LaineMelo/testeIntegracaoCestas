import React, {useState, useEffect} from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Card } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


import Header from '../../components/Header';
import Body from '../../components/Body';
import DeleteButton from '../../components/DeleteButton';
import BackButton from '../../components/BackButton';


const NecessidadesBeneficiarioPage = () => {

  const navigation = useNavigation();


    const [listaNecessidades, setListaNecessidades] = useState([]);
    
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('https://cestasgestor.azurewebsites.net/api/ListaNecessidades');
          setListaNecessidades(response.data);
        } catch (error) {
          console.error('Erro ao buscar os dados:', error);
        }
      };
  
      
      fetchData();
    }, []);

    const handleDelete = async (id) => {
      try {
        const response = await axios.delete(`https://cestasgestor.azurewebsites.net/api/ListaNecessidades/${id}`);
        console.log(response.data);
        alert('Dados excluídos com sucesso!');
  
        // Atualizar a lista após a exclusão
        setListaNecessidades((prevList) => prevList.filter((item) => item.id !== id));
      } catch (error) {
        console.error('Erro ao excluir os dados:', error);
        alert('Erro ao excluir os dados!');
      }
    };


  
  return (
    <Body>
      <View>
        <Header/>
        <BackButton/>
    
          <Text style={styles.title}
          >Lista de Necessidades:</Text>
       
        <FlatList
          data={listaNecessidades}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card
            style={{
              margin:15
            }}>
              {/* Renderizar os itens da lista conforme necessário */}
              <Card.Content>
              <Text variant="bodyMedium">Id do Beneficiário: {item.idBeneficiario}</Text>
              <Text variant="bodyMedium">Objeto: {item.listaNecessidades}</Text>
              </Card.Content>
              <Card.Actions>
  
                <DeleteButton onPress={() => handleDelete(item.id)} />

              </Card.Actions>
            </Card>
          )}
        />
      </View>
      <View>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('cadastroNecessidades')}
      />
      </View>
    </Body>
    
  );

}

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginTop: 50,
    marginBottom: 16,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom:-100,
    right: 20,

  },
});

export default NecessidadesBeneficiarioPage;