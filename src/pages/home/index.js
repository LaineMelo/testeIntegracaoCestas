import {Button, Divider, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import { Avatar } from 'react-native-paper';

import Container from '../../components/Container';
import Header from '../../components/Header';
import Body from '../../components/Body';



import { useNavigation } from '@react-navigation/native';



const HomePage = () => {

  const navigation = useNavigation();

    return(
      <Container>
        <Header title={'Cestas Aracaju'} />
        <Body>

        <Text 
          style={styles.title}
          variant="displayLarge">
          Início
        </Text>

        <Divider /> 
   

        <View style={{ display: "flex",
            justifyContent: "center", 
            alignItems: "center",
             padding: 20}}>
          <Avatar.Icon size={50} icon="account" />
        </View>


        <View style={{ display: "flex",
            justifyContent: "center", 
            alignItems: "center" }}>
          <Button
          style={styles.button}
          mode="contained-tonal"
          onPress={() => navigation.navigate('beneficiario')}>
             Beneficiários
          </Button>
        </View>
        
        <View style={{ display: "flex",
            justifyContent: "center", 
            alignItems: "center" }}>
          <Button
          style={styles.button}
          mode="contained-tonal"
          onPress={() => navigation.navigate('registroCesta')}>
            Cestas
          </Button>
        </View>

        <View style={{ display: "flex",
           justifyContent: "center", 
           alignItems: "center" }}>
          <Button
          style={styles.button}
          mode="contained-tonal"
          onPress={() => navigation.navigate('necessidades')}>
           Lista Necessidades
          </Button>
        </View>

        <View style={{ display: "flex",
          justifyContent: "center", 
          alignItems: "center" }}>
          <Button
          style={styles.button}
          mode="contained-tonal"
          onPress={() => navigation.navigate('voluntario')}>
            Voluntários
          </Button>
        </View>


        </Body>      
      </Container>
    );

}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 40,
    marginBottom:40
  },
  button: {
    width: 250,
    //backgroundColor:'#787878',
    marginBottom:8,
  }
});

export default HomePage;