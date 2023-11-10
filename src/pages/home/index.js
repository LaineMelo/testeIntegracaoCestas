import {Button} from 'react-native-paper';
import {StyleSheet} from 'react-native';

import Container from '../../components/Container';
import Header from '../../components/Header';
import Body from '../../components/Body';



import { useNavigation } from '@react-navigation/native';



const HomePage = () => {

  const navigation = useNavigation();

    return(
      <Container>
        <Header title={'Home'} />
        <Body>

        <Button 
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate('beneficiario')}>
           Beneficiario 
        </Button>
        
        <Button 
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate('registroCesta')}>
          Entregar Cesta 
        </Button>

        <Button 
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate('necessidades')}>
          Necessidades
        </Button>

        <Button 
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate('voluntario')}>
          Voluntario
        </Button>

        </Body>      
      </Container>
    );

}

const styles = StyleSheet.create({
  button:{
    marginBottom:10,
  }
});

export default HomePage;