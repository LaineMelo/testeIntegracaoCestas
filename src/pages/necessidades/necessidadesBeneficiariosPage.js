import React from 'react';
import {Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import { TextInput } from 'react-native-paper';
import { DataTable } from 'react-native-paper';
import { FAB } from 'react-native-paper';

import Container from '../../components/Container';
import Header from '../../components/Header';
import Body from '../../components/Body';

const NecessidadesBeneficiarioPage = () => {


  const [text, setText] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const [items] = React.useState([
   {
     key: 1,
     descricao: 'Travesseiro'
   },
   {
     key: 2,
     descricao: 'Muleta'
   }
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  
    return(
      <Container>
        <Header title={'Necessidades'} />
        <Body>

        <TextInput
         label="Descrição"
         style={styles.input}
         mode="outlined"
         value={text}
         onChangeText={text => setText(text)} />

        <Button 
        icon="card-search-outline" 
        mode="contained" 
        onPress={() => console.log     ('Pressed')}>
          Pesquisar
        </Button>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Descrição</DataTable.Title>
          </DataTable.Header>

          {items.slice(from, to).map((item) => (
            <DataTable.Row key={item.key}>
              <DataTable.Cell>{item.descricao}</DataTable.Cell>             
            </DataTable.Row>
          ))}

          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(items.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}        
          />
        </DataTable>

        <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => console.log('Pressed')}
        />
        
        </Body>      
      </Container>
    );

}

const styles = StyleSheet.create({
  input:{
    marginBottom:10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }
});

export default NecessidadesBeneficiarioPage;