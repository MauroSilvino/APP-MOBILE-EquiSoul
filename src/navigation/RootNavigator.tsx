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
import { ChatConversaScreen } from '../screens/comunidade/ChatConversaScreen';
import { ComentariosScreen } from '../screens/comunidade/ComentariosScreen';
import { EventoDetalheScreen } from '../screens/comunidade/EventoDetalheScreen';
import { EventosScreen } from '../screens/comunidade/EventosScreen';
import { ExplorarScreen } from '../screens/comunidade/ExplorarScreen';
import { FeedScreen } from '../screens/comunidade/FeedScreen';
import { GrupoDetalheScreen } from '../screens/comunidade/GrupoDetalheScreen';
import { GruposScreen } from '../screens/comunidade/GruposScreen';
import { MensagensScreen } from '../screens/comunidade/MensagensScreen';
import { ReelsScreen } from '../screens/comunidade/ReelsScreen';
import { StoriesViewerScreen } from '../screens/comunidade/StoriesViewerScreen';
import { NotificacoesScreen } from '../screens/NotificacoesScreen';
import { CartasCavaloScreen } from '../screens/perfis/CartasCavaloScreen';
import { CavalosScreen } from '../screens/perfis/CavalosScreen';
import { CompartilharCavaloScreen } from '../screens/perfis/CompartilharCavaloScreen';
import { EditarPerfilScreen } from '../screens/perfis/EditarPerfilScreen';
import { EvolucaoCavaloScreen } from '../screens/perfis/EvolucaoCavaloScreen';
import { GaleriaCavaloScreen } from '../screens/perfis/GaleriaCavaloScreen';
import { PerfilCavaloScreen } from '../screens/perfis/PerfilCavaloScreen';
import { PerfilPublicoScreen } from '../screens/perfis/PerfilPublicoScreen';
import { PerfilUsuarioScreen } from '../screens/perfis/PerfilUsuarioScreen';
import { TimelineCavaloScreen } from '../screens/perfis/TimelineCavaloScreen';
import { SaudeDashboardScreen } from '../screens/saude/SaudeDashboardScreen';
import { HistoricoSaudeScreen } from '../screens/saude/HistoricoSaudeScreen';
import { VacinasScreen } from '../screens/saude/VacinasScreen';
import { VermifugacaoScreen } from '../screens/saude/VermifugacaoScreen';
import { MedicamentosScreen } from '../screens/saude/MedicamentosScreen';
import { FerrageamentoScreen } from '../screens/saude/FerrageamentoScreen';
import { OdontologiaScreen } from '../screens/saude/OdontologiaScreen';
import { AlimentacaoScreen } from '../screens/saude/AlimentacaoScreen';
import { PesoScreen } from '../screens/saude/PesoScreen';
import { ExamesScreen } from '../screens/saude/ExamesScreen';
import { LesoesScreen } from '../screens/saude/LesoesScreen';
import { RecuperacaoScreen } from '../screens/saude/RecuperacaoScreen';
import { VeterinariosScreen } from '../screens/saude/VeterinariosScreen';
import { DocumentosScreen } from '../screens/saude/DocumentosScreen';
import { CalendarioSaudeScreen } from '../screens/saude/CalendarioSaudeScreen';
import { IABemEstarScreen } from '../screens/saude/IABemEstarScreen';
import { InteligenciaArtificialScreen } from '../screens/ia/InteligenciaArtificialScreen';
import { CartasIAScreen } from '../screens/ia/CartasIAScreen';
import { LeituraCartaScreen } from '../screens/ia/LeituraCartaScreen';
import { InsightsScreen } from '../screens/ia/InsightsScreen';
import { LinhaTempoEmocionalScreen } from '../screens/ia/LinhaTempoEmocionalScreen';
import { RetrospectivasScreen } from '../screens/ia/RetrospectivasScreen';
import { HistoriasIAScreen } from '../screens/ia/HistoriasIAScreen';
import { SugestoesScreen } from '../screens/ia/SugestoesScreen';
import { EstudioCriativoScreen } from '../screens/ia/EstudioCriativoScreen';
import { AssistenteIAScreen } from '../screens/ia/AssistenteIAScreen';
import { AgendaDashboardScreen } from '../screens/agenda/AgendaDashboardScreen';
import { AgendaCalendarioScreen } from '../screens/agenda/AgendaCalendarioScreen';
import { AgendaDoDiaScreen } from '../screens/agenda/AgendaDoDiaScreen';
import { CriarCompromissoScreen } from '../screens/agenda/CriarCompromissoScreen';
import { PlanejamentoSemanalScreen } from '../screens/agenda/PlanejamentoSemanalScreen';
import { MetasScreen } from '../screens/agenda/MetasScreen';
import { ClimaScreen } from '../screens/agenda/ClimaScreen';
import { AnalyticsScreen } from '../screens/agenda/AnalyticsScreen';
import { EvolucaoScreen } from '../screens/agenda/EvolucaoScreen';
import { LinhaTempoAnaliticaScreen } from '../screens/agenda/LinhaTempoAnaliticaScreen';
import { InsightsInteligentesScreen } from '../screens/agenda/InsightsInteligentesScreen';
import { RelatoriosScreen } from '../screens/agenda/RelatoriosScreen';
import { EventosDescobrirScreen } from '../screens/eventos/EventosDescobrirScreen';
import { EventoPaginaScreen } from '../screens/eventos/EventoPaginaScreen';
import { EventoInscricaoScreen } from '../screens/eventos/EventoInscricaoScreen';
import { EventosCalendarioScreen } from '../screens/eventos/EventosCalendarioScreen';
import { ClubesScreen } from '../screens/eventos/ClubesScreen';
import { ComunidadesLocaisScreen } from '../screens/eventos/ComunidadesLocaisScreen';
import { ExperienciasScreen } from '../screens/eventos/ExperienciasScreen';
import { EventoCheckinScreen } from '../screens/eventos/EventoCheckinScreen';
import { AlbumColaborativoScreen } from '../screens/eventos/AlbumColaborativoScreen';
import { EventoNetworkingScreen } from '../screens/eventos/EventoNetworkingScreen';
import { EventoCertificadoScreen } from '../screens/eventos/EventoCertificadoScreen';
import { RankingEventoScreen } from '../screens/eventos/RankingEventoScreen';
import { MeusEventosScreen } from '../screens/eventos/MeusEventosScreen';
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
        <Stack.Screen name="Comunidade" component={FeedScreen} />
        <Stack.Screen name="StoriesViewer" component={StoriesViewerScreen} />
        <Stack.Screen name="Reels" component={ReelsScreen} />
        <Stack.Screen name="Explorar" component={ExplorarScreen} />
        <Stack.Screen name="Eventos" component={EventosScreen} />
        <Stack.Screen name="EventoDetalhe" component={EventoDetalheScreen} />
        <Stack.Screen name="Grupos" component={GruposScreen} />
        <Stack.Screen name="GrupoDetalhe" component={GrupoDetalheScreen} />
        <Stack.Screen name="Mensagens" component={MensagensScreen} />
        <Stack.Screen name="ChatConversa" component={ChatConversaScreen} />
        <Stack.Screen name="Comentarios" component={ComentariosScreen} />
        <Stack.Screen name="Perfis" component={PerfilUsuarioScreen} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfilScreen} />
        <Stack.Screen name="PerfilPublico" component={PerfilPublicoScreen} />
        <Stack.Screen name="Cavalos" component={CavalosScreen} />
        <Stack.Screen name="PerfilCavalo" component={PerfilCavaloScreen} />
        <Stack.Screen name="TimelineCavalo" component={TimelineCavaloScreen} />
        <Stack.Screen name="SaudeCavalo" component={SaudeDashboardScreen} />
        <Stack.Screen name="HistoricoSaude" component={HistoricoSaudeScreen} />
        <Stack.Screen name="Vacinas" component={VacinasScreen} />
        <Stack.Screen name="Vermifugacao" component={VermifugacaoScreen} />
        <Stack.Screen name="Medicamentos" component={MedicamentosScreen} />
        <Stack.Screen name="Ferrageamento" component={FerrageamentoScreen} />
        <Stack.Screen name="Odontologia" component={OdontologiaScreen} />
        <Stack.Screen name="Alimentacao" component={AlimentacaoScreen} />
        <Stack.Screen name="Peso" component={PesoScreen} />
        <Stack.Screen name="Exames" component={ExamesScreen} />
        <Stack.Screen name="Lesoes" component={LesoesScreen} />
        <Stack.Screen name="Recuperacao" component={RecuperacaoScreen} />
        <Stack.Screen name="Veterinarios" component={VeterinariosScreen} />
        <Stack.Screen name="Documentos" component={DocumentosScreen} />
        <Stack.Screen name="CalendarioSaude" component={CalendarioSaudeScreen} />
        <Stack.Screen name="IABemEstar" component={IABemEstarScreen} />
        <Stack.Screen name="InteligenciaArtificial" component={InteligenciaArtificialScreen} />
        <Stack.Screen name="CartasIA" component={CartasIAScreen} />
        <Stack.Screen name="LeituraCarta" component={LeituraCartaScreen} />
        <Stack.Screen name="Insights" component={InsightsScreen} />
        <Stack.Screen name="LinhaTempoEmocional" component={LinhaTempoEmocionalScreen} />
        <Stack.Screen name="Retrospectivas" component={RetrospectivasScreen} />
        <Stack.Screen name="HistoriasIA" component={HistoriasIAScreen} />
        <Stack.Screen name="Sugestoes" component={SugestoesScreen} />
        <Stack.Screen name="EstudioCriativo" component={EstudioCriativoScreen} />
        <Stack.Screen name="AssistenteIA" component={AssistenteIAScreen} />
        <Stack.Screen name="EvolucaoCavalo" component={EvolucaoCavaloScreen} />
        <Stack.Screen name="GaleriaCavalo" component={GaleriaCavaloScreen} />
        <Stack.Screen name="CartasCavalo" component={CartasCavaloScreen} />
        <Stack.Screen name="CompartilharCavalo" component={CompartilharCavaloScreen} />
        <Stack.Screen name="AgendaDashboard" component={AgendaDashboardScreen} />
        <Stack.Screen name="AgendaCalendario" component={AgendaCalendarioScreen} />
        <Stack.Screen name="AgendaDoDia" component={AgendaDoDiaScreen} />
        <Stack.Screen name="CriarCompromisso" component={CriarCompromissoScreen} />
        <Stack.Screen name="PlanejamentoSemanal" component={PlanejamentoSemanalScreen} />
        <Stack.Screen name="Metas" component={MetasScreen} />
        <Stack.Screen name="Clima" component={ClimaScreen} />
        <Stack.Screen name="Analytics" component={AnalyticsScreen} />
        <Stack.Screen name="Evolucao" component={EvolucaoScreen} />
        <Stack.Screen name="LinhaTempoAnalitica" component={LinhaTempoAnaliticaScreen} />
        <Stack.Screen name="InsightsInteligentes" component={InsightsInteligentesScreen} />
        <Stack.Screen name="Relatorios" component={RelatoriosScreen} />
        <Stack.Screen name="EventosDescobrir" component={EventosDescobrirScreen} />
        <Stack.Screen name="EventoPagina" component={EventoPaginaScreen} />
        <Stack.Screen name="EventoInscricao" component={EventoInscricaoScreen} />
        <Stack.Screen name="EventosCalendario" component={EventosCalendarioScreen} />
        <Stack.Screen name="Clubes" component={ClubesScreen} />
        <Stack.Screen name="ComunidadesLocais" component={ComunidadesLocaisScreen} />
        <Stack.Screen name="Experiencias" component={ExperienciasScreen} />
        <Stack.Screen name="EventoCheckin" component={EventoCheckinScreen} />
        <Stack.Screen name="AlbumColaborativo" component={AlbumColaborativoScreen} />
        <Stack.Screen name="EventoNetworking" component={EventoNetworkingScreen} />
        <Stack.Screen name="EventoCertificado" component={EventoCertificadoScreen} />
        <Stack.Screen name="RankingEvento" component={RankingEventoScreen} />
        <Stack.Screen name="MeusEventos" component={MeusEventosScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
