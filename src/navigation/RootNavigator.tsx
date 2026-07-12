import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AlbumDetalheScreen } from '../screens/criarMemoria/AlbumDetalheScreen';
import { AlbunsInteligentesScreen } from '../screens/criarMemoria/AlbunsInteligentesScreen';
import { CapturaMidiaScreen } from '../screens/criarMemoria/CapturaMidiaScreen';
import { ComparacaoScreen } from '../screens/criarMemoria/ComparacaoScreen';
import { DescricaoScreen } from '../screens/criarMemoria/DescricaoScreen';
import { HistoricoScreen } from '../screens/criarMemoria/HistoricoScreen';
import { InformacoesRapidasScreen } from '../screens/criarMemoria/InformacoesRapidasScreen';
import { MarcacaoScreen } from '../screens/criarMemoria/MarcacaoScreen';
import { MemoriaPublicadaScreen } from '../screens/criarMemoria/MemoriaPublicadaScreen';
import { PreviaScreen } from '../screens/criarMemoria/PreviaScreen';
import { PrivacidadeScreen } from '../screens/criarMemoria/PrivacidadeScreen';
import { RascunhosScreen } from '../screens/criarMemoria/RascunhosScreen';
import { TipoMemoriaScreen } from '../screens/criarMemoria/TipoMemoriaScreen';
import { CalendarioScreen } from '../screens/diario/CalendarioScreen';
import { DashboardHomeScreen } from '../screens/diario/DashboardHomeScreen';
import { FavoritosScreen } from '../screens/diario/FavoritosScreen';
import { MemoriaCompletaScreen } from '../screens/diario/MemoriaCompletaScreen';
import { NovoRegistroScreen } from '../screens/diario/NovoRegistroScreen';
import { PesquisaMemoriasScreen } from '../screens/diario/PesquisaMemoriasScreen';
import { TimelineScreen } from '../screens/diario/TimelineScreen';
import { ComunidadeScreen } from '../screens/ComunidadeScreen';
import { NotificacoesScreen } from '../screens/NotificacoesScreen';
import { PerfisScreen } from '../screens/PerfisScreen';
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
        <Stack.Screen name="Home" component={DashboardHomeScreen} />
        <Stack.Screen name="NovoRegistro" component={NovoRegistroScreen} />
        <Stack.Screen name="MemoriaCompleta" component={MemoriaCompletaScreen} />
        <Stack.Screen name="Timeline" component={TimelineScreen} />
        <Stack.Screen name="Calendario" component={CalendarioScreen} />
        <Stack.Screen name="PesquisaMemorias" component={PesquisaMemoriasScreen} />
        <Stack.Screen name="Favoritos" component={FavoritosScreen} />
        <Stack.Screen name="TipoMemoria" component={TipoMemoriaScreen} />
        <Stack.Screen name="CapturaMidia" component={CapturaMidiaScreen} />
        <Stack.Screen name="InformacoesRapidas" component={InformacoesRapidasScreen} />
        <Stack.Screen name="Descricao" component={DescricaoScreen} />
        <Stack.Screen name="Marcacao" component={MarcacaoScreen} />
        <Stack.Screen name="Privacidade" component={PrivacidadeScreen} />
        <Stack.Screen name="Previa" component={PreviaScreen} />
        <Stack.Screen name="MemoriaPublicada" component={MemoriaPublicadaScreen} />
        <Stack.Screen name="Historico" component={HistoricoScreen} />
        <Stack.Screen name="AlbunsInteligentes" component={AlbunsInteligentesScreen} />
        <Stack.Screen name="Comparacao" component={ComparacaoScreen} />
        <Stack.Screen name="Rascunhos" component={RascunhosScreen} />
        <Stack.Screen name="AlbumDetalhe" component={AlbumDetalheScreen} />
        <Stack.Screen name="Notificacoes" component={NotificacoesScreen} />
        <Stack.Screen name="Comunidade" component={ComunidadeScreen} />
        <Stack.Screen name="Perfis" component={PerfisScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
