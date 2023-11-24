import * as React from 'react';
import { Appbar} from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';


const BackButton = () => {

    const navigation = useNavigation();

    const handleBackPress = () => {  
        navigation.goBack(); 
      };

    return(
        <Appbar.Header>
          <Appbar.BackAction onPress={handleBackPress} />
          <Appbar.Content title="Voltar"
          titleStyle={{ fontSize: 14}}></Appbar.Content>
        </Appbar.Header>
    );

}
    
    

export default BackButton;