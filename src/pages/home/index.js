import {Button, Divider, Text, View} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import { Avatar } from 'react-native-paper';

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

        <Text 
          style={styles.title}
          variant="displayLarge">
          Home
        </Text>

        <Divider /> 
   

        <View style={{ display: "flex", 
            justifyContent: "center", 
            alignItems: "center" }}>
          <Avatar.Icon size={50} icon="account" />
        </View>

    
        <Divider />
       

        <View style={{ display: "flex", 
            justifyContent: "center", 
            alignItems: "center" }}>
          <Button
          style={styles.button}
          mode="contained"
          onPress={() => navigation.navigate('beneficiario')}>
             Beneficiários
          </Button>
        </View>
        
        <View style={{ display: "flex", 
            justifyContent: "center", 
            alignItems: "center" }}>
          <Button
          style={styles.button}
          mode="contained"
          onPress={() => navigation.navigate('registroCesta')}>
            Cestas
          </Button>
        </View>

        <View style={{ display: "flex", 
           justifyContent: "center", 
           alignItems: "center" }}>
          <Button
          style={styles.button}
          mode="contained"
          onPress={() => navigation.navigate('necessidades')}>
           Lista Necessidades
          </Button>
        </View>

        <View style={{ display: "flex", 
          justifyContent: "center", 
          alignItems: "center" }}>
          <Button
          style={styles.button}
          mode="contained"
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
    backgroundColor:'#787878',
    marginBottom:8
  }
});

export default HomePage;