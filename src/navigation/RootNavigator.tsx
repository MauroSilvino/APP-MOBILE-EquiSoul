import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { AdicionarCavaloScreen } from '../screens/onboarding/AdicionarCavaloScreen';
import { CadastroScreen } from '../screens/onboarding/CadastroScreen';
import { CriarPerfilScreen } from '../screens/onboarding/CriarPerfilScreen';
import { LoginScreen } from '../screens/onboarding/LoginScreen';
import { NovaSenhaScreen } from '../screens/onboarding/NovaSenhaScreen';
import { PermissoesScreen } from '../screens/onboarding/PermissoesScreen';
import { PreferenciasScreen } from '../screens/onboarding/PreferenciasScreen';
import { PrimeiraCartaIAScreen } from '../screens/onboarding/PrimeiraCartaIAScreen';
import { PrimeiroCheckinScreen } from '../screens/onboarding/PrimeiroCheckinScreen';
import { RecuperarSenhaScreen } from '../screens/onboarding/RecuperarSenhaScreen';
import { RelacionamentoScreen } from '../screens/onboarding/RelacionamentoScreen';
import { SplashScreen } from '../screens/onboarding/SplashScreen';
import { StorytellingScreen } from '../screens/onboarding/StorytellingScreen';
import { TourInteligenteScreen } from '../screens/onboarding/TourInteligenteScreen';
import { WelcomeScreen } from '../screens/onboarding/WelcomeScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Storytelling" component={StorytellingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="RecuperarSenha" component={RecuperarSenhaScreen} />
        <Stack.Screen name="NovaSenha" component={NovaSenhaScreen} />
        <Stack.Screen name="CriarPerfil" component={CriarPerfilScreen} />
        <Stack.Screen name="AdicionarCavalo" component={AdicionarCavaloScreen} />
        <Stack.Screen name="Relacionamento" component={RelacionamentoScreen} />
        <Stack.Screen name="Preferencias" component={PreferenciasScreen} />
        <Stack.Screen name="Permissoes" component={PermissoesScreen} />
        <Stack.Screen name="TourInteligente" component={TourInteligenteScreen} />
        <Stack.Screen name="PrimeiroCheckin" component={PrimeiroCheckinScreen} />
        <Stack.Screen name="PrimeiraCartaIA" component={PrimeiraCartaIAScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
