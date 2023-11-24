import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginPage from '../pages/login/index';
import HomePage  from '../pages/home/index';
import BeneficiarioPage  from '../pages/beneficiario/beneficiarioPage';
import CadastroBeneficiarioPage from '../pages/beneficiario/cadastroBeneficiarioPage';
import RegistroCesta from '../pages/cestas/registroCestasPage';
import NecessidadesBeneficiarioPage from '../pages/necessidades/necessidadesBeneficiariosPage';
import CadastroNecessidadesBeneficiarioPage from '../pages/necessidades/cadastroNecessidadesPage';
import VoluntarioPage from '../pages/voluntarios/voluntarioPage';
import CadastroVoluntarioPage from '../pages/voluntarios/cadastroVoluntarioPage';
import EdicaoVoluntarioPage from '../pages/voluntarios/edicaoVoluntarioPage';
import CadastoDependentesPage from '../pages/dependentes/CadastroDependentesPage';
import edicaoBeneficiarioPage from '../pages/beneficiario/edicaoBeneficiarioPage';

const Stack = createNativeStackNavigator();

const Main = () => {

  return (
      <Stack.Navigator initialRouteName="login">
        
        <Stack.Screen 
        name="login" 
        component={LoginPage}
        options={{ header:() => null }}
        />
        
        <Stack.Screen 
        name="home" 
        component={ HomePage }
        options={{ header:() => null }}
        />

        <Stack.Screen 
        name="beneficiario" 
        component={BeneficiarioPage}
        options={{ header:() => null }}
        />

        <Stack.Screen 
        name="cadastroBeneficiario" 
        component={CadastroBeneficiarioPage}
        options={{ header:() => null }}
        />

        <Stack.Screen 
        name="registroCesta" 
        component={RegistroCesta}
        options={{ header:() => null }}
        />

        <Stack.Screen 
        name="necessidades" 
        component={NecessidadesBeneficiarioPage}
        options={{ header:() => null }}
        />

        <Stack.Screen 
        name="cadastroNecessidades" 
        component={CadastroNecessidadesBeneficiarioPage}
        options={{ header:() => null }}
        />

        <Stack.Screen 
        name="voluntario" 
        component={VoluntarioPage}
        options={{ header:() => null }}
        />

        <Stack.Screen 
        name="cadastroVoluntario" 
        component={CadastroVoluntarioPage}
        options={{ header:() => null }}
        />

        <Stack.Screen 
        name="edicaoVoluntario" 
        component={EdicaoVoluntarioPage}
        options={{ header:() => null }}
        />

      <Stack.Screen 
        name="cadastroDependentes" 
        component={CadastoDependentesPage}
        options={{ header:() => null }}
        />

      <Stack.Screen 
        name="edicaoBeneficiario" 
        component={edicaoBeneficiarioPage}
        options={{ header:() => null }}
        />

      </Stack.Navigator>
  );
  
}

export default Main;