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
import { MarketplaceHomeScreen } from '../screens/marketplace/MarketplaceHomeScreen';
import { MarketplaceExplorarScreen } from '../screens/marketplace/MarketplaceExplorarScreen';
import { MarketplaceProdutoScreen } from '../screens/marketplace/MarketplaceProdutoScreen';
import { MarketplaceServicoScreen } from '../screens/marketplace/MarketplaceServicoScreen';
import { PerfilProfissionalScreen } from '../screens/marketplace/PerfilProfissionalScreen';
import { HarasScreen } from '../screens/marketplace/HarasScreen';
import { MarketplaceReservaScreen } from '../screens/marketplace/MarketplaceReservaScreen';
import { CarteiraScreen } from '../screens/marketplace/CarteiraScreen';
import { MarketplaceHistoricoScreen } from '../screens/marketplace/MarketplaceHistoricoScreen';
import { MarketplaceFavoritosScreen } from '../screens/marketplace/MarketplaceFavoritosScreen';
import { MarketplaceChatScreen } from '../screens/marketplace/MarketplaceChatScreen';
import { MarketplaceCheckoutScreen } from '../screens/marketplace/MarketplaceCheckoutScreen';
import { MarketplaceAvaliacoesScreen } from '../screens/marketplace/MarketplaceAvaliacoesScreen';
import { MarketplaceCuponsScreen } from '../screens/marketplace/MarketplaceCuponsScreen';
import { MarketplaceEventosScreen } from '../screens/marketplace/MarketplaceEventosScreen';
import { MarketplaceCursosScreen } from '../screens/marketplace/MarketplaceCursosScreen';
import { PremiumHomeScreen } from '../screens/premium/PremiumHomeScreen';
import { PremiumBeneficiosScreen } from '../screens/premium/PremiumBeneficiosScreen';
import { PremiumIAScreen } from '../screens/premium/PremiumIAScreen';
import { PremiumTemasScreen } from '../screens/premium/PremiumTemasScreen';
import { PremiumLivrosScreen } from '../screens/premium/PremiumLivrosScreen';
import { PremiumVideosScreen } from '../screens/premium/PremiumVideosScreen';
import { PremiumBibliotecaScreen } from '../screens/premium/PremiumBibliotecaScreen';
import { PremiumClubeScreen } from '../screens/premium/PremiumClubeScreen';
import { PremiumEventosScreen } from '../screens/premium/PremiumEventosScreen';
import { PremiumPersonalizacaoScreen } from '../screens/premium/PremiumPersonalizacaoScreen';
import { PremiumBackupScreen } from '../screens/premium/PremiumBackupScreen';
import { PremiumAssinaturaScreen } from '../screens/premium/PremiumAssinaturaScreen';
import { PremiumCriacoesExclusivasScreen } from '../screens/premium/PremiumCriacoesExclusivasScreen';
import { PremiumFoundingMembersScreen } from '../screens/premium/PremiumFoundingMembersScreen';
import { PremiumFAQScreen } from '../screens/premium/PremiumFAQScreen';
import { PremiumHistoricoFinanceiroScreen } from '../screens/premium/PremiumHistoricoFinanceiroScreen';
import { PremiumCheckoutScreen } from '../screens/premium/PremiumCheckoutScreen';
import { PremiumSucessoScreen } from '../screens/premium/PremiumSucessoScreen';
import { PremiumGerenciarAssinaturaScreen } from '../screens/premium/PremiumGerenciarAssinaturaScreen';
import { PremiumErroPagamentoScreen } from '../screens/premium/PremiumErroPagamentoScreen';
import { GamificacaoHubScreen } from '../screens/gamificacao/GamificacaoHubScreen';
import { GamificacaoConquistasScreen } from '../screens/gamificacao/GamificacaoConquistasScreen';
import { GamificacaoSelosScreen } from '../screens/gamificacao/GamificacaoSelosScreen';
import { GamificacaoDesafiosScreen } from '../screens/gamificacao/GamificacaoDesafiosScreen';
import { GamificacaoStreakScreen } from '../screens/gamificacao/GamificacaoStreakScreen';
import { GamificacaoJornadasScreen } from '../screens/gamificacao/GamificacaoJornadasScreen';
import { GamificacaoMissoesScreen } from '../screens/gamificacao/GamificacaoMissoesScreen';
import { GamificacaoLojaScreen } from '../screens/gamificacao/GamificacaoLojaScreen';
import { GamificacaoRankingScreen } from '../screens/gamificacao/GamificacaoRankingScreen';
import { GamificacaoTemporadasScreen } from '../screens/gamificacao/GamificacaoTemporadasScreen';
import { GamificacaoObjetivosScreen } from '../screens/gamificacao/GamificacaoObjetivosScreen';
import { ConfiguracoesHubScreen } from '../screens/configuracoes/ConfiguracoesHubScreen';
import { ContaScreen } from '../screens/configuracoes/ContaScreen';
import { ConfiguracoesPrivacidadeScreen } from '../screens/configuracoes/ConfiguracoesPrivacidadeScreen';
import { SegurancaScreen } from '../screens/configuracoes/SegurancaScreen';
import { ConfiguracoesIAScreen } from '../screens/configuracoes/ConfiguracoesIAScreen';
import { PreferenciasNotificacaoScreen } from '../screens/configuracoes/PreferenciasNotificacaoScreen';
import { AparenciaScreen } from '../screens/configuracoes/AparenciaScreen';
import { IdiomaRegiaoScreen } from '../screens/configuracoes/IdiomaRegiaoScreen';
import { BackupScreen } from '../screens/configuracoes/BackupScreen';
import { CompartilhamentoScreen } from '../screens/configuracoes/CompartilhamentoScreen';
import { ConfiguracoesPremiumScreen } from '../screens/configuracoes/ConfiguracoesPremiumScreen';
import { AjudaScreen } from '../screens/configuracoes/AjudaScreen';
import { SobreScreen } from '../screens/configuracoes/SobreScreen';
import { ModoDesenvolvedorScreen } from '../screens/configuracoes/ModoDesenvolvedorScreen';
import { EditarInformacoesScreen } from '../screens/configuracoes/EditarInformacoesScreen';
import { TrocarSenhaScreen } from '../screens/configuracoes/TrocarSenhaScreen';
import { Configurar2FAScreen } from '../screens/configuracoes/Configurar2FAScreen';
import { AdminDashboardScreen } from '../screens/admin/AdminDashboardScreen';
import { AdminUsuariosScreen } from '../screens/admin/AdminUsuariosScreen';
import { AdminUsuarioDetalheScreen } from '../screens/admin/AdminUsuarioDetalheScreen';
import { AdminCavalosScreen } from '../screens/admin/AdminCavalosScreen';
import { AdminCavaloDetalheScreen } from '../screens/admin/AdminCavaloDetalheScreen';
import { AdminComunidadeScreen } from '../screens/admin/AdminComunidadeScreen';
import { AdminModeracaoScreen } from '../screens/admin/AdminModeracaoScreen';
import { AdminMarketplaceScreen } from '../screens/admin/AdminMarketplaceScreen';
import { AdminEventosScreen } from '../screens/admin/AdminEventosScreen';
import { AdminCriarEventoScreen } from '../screens/admin/AdminCriarEventoScreen';
import { AdminClubePremiumScreen } from '../screens/admin/AdminClubePremiumScreen';
import { AdminIAScreen } from '../screens/admin/AdminIAScreen';
import { AdminAnalyticsScreen } from '../screens/admin/AdminAnalyticsScreen';
import { AdminFinanceiroScreen } from '../screens/admin/AdminFinanceiroScreen';
import { AdminCMSScreen } from '../screens/admin/AdminCMSScreen';
import { AdminCmsEditorScreen } from '../screens/admin/AdminCmsEditorScreen';
import { AdminCampanhasScreen } from '../screens/admin/AdminCampanhasScreen';
import { AdminSuporteScreen } from '../screens/admin/AdminSuporteScreen';
import { AdminChamadoDetalheScreen } from '../screens/admin/AdminChamadoDetalheScreen';
import { AdminAuditoriaScreen } from '../screens/admin/AdminAuditoriaScreen';
import { AdminConfiguracoesGlobaisScreen } from '../screens/admin/AdminConfiguracoesGlobaisScreen';
import { AdminLogsScreen } from '../screens/admin/AdminLogsScreen';
import { AdminAPIsScreen } from '../screens/admin/AdminAPIsScreen';
import { AdminFeatureFlagsScreen } from '../screens/admin/AdminFeatureFlagsScreen';
import { PortalDashboardScreen } from '../screens/portal/PortalDashboardScreen';
import { PortalAgendaScreen } from '../screens/portal/PortalAgendaScreen';
import { PortalClientesScreen } from '../screens/portal/PortalClientesScreen';
import { PortalClienteDetalheScreen } from '../screens/portal/PortalClienteDetalheScreen';
import { PortalCavalosAtendidosScreen } from '../screens/portal/PortalCavalosAtendidosScreen';
import { PortalServicosScreen } from '../screens/portal/PortalServicosScreen';
import { PortalReservasScreen } from '../screens/portal/PortalReservasScreen';
import { PortalFinanceiroScreen } from '../screens/portal/PortalFinanceiroScreen';
import { PortalAvaliacoesScreen } from '../screens/portal/PortalAvaliacoesScreen';
import { PortalAnalyticsScreen } from '../screens/portal/PortalAnalyticsScreen';
import { PortalPerfilPublicoScreen } from '../screens/portal/PortalPerfilPublicoScreen';
import { PortalPortfolioScreen } from '../screens/portal/PortalPortfolioScreen';
import { PortalConteudoScreen } from '../screens/portal/PortalConteudoScreen';
import { PortalOrganizadorDashboardScreen } from '../screens/portal/PortalOrganizadorDashboardScreen';
import { PortalCriarEventoScreen } from '../screens/portal/PortalCriarEventoScreen';
import { PortalParticipantesScreen } from '../screens/portal/PortalParticipantesScreen';
import { PortalCheckinScreen } from '../screens/portal/PortalCheckinScreen';
import { PortalCertificadosScreen } from '../screens/portal/PortalCertificadosScreen';
import { PortalLojaScreen } from '../screens/portal/PortalLojaScreen';
import { PortalProdutosScreen } from '../screens/portal/PortalProdutosScreen';
import { PortalPedidosScreen } from '../screens/portal/PortalPedidosScreen';
import { PortalEstoqueScreen } from '../screens/portal/PortalEstoqueScreen';
import { PortalPromocoesScreen } from '../screens/portal/PortalPromocoesScreen';
import { PortalRelatoriosScreen } from '../screens/portal/PortalRelatoriosScreen';
import { PortalNovoServicoScreen } from '../screens/portal/PortalNovoServicoScreen';
import { PortalNovoProdutoScreen } from '../screens/portal/PortalNovoProdutoScreen';
import { PortalNovaPromocaoScreen } from '../screens/portal/PortalNovaPromocaoScreen';
import { PortalPedidoDetalheScreen } from '../screens/portal/PortalPedidoDetalheScreen';
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
        <Stack.Screen name="MarketplaceHome" component={MarketplaceHomeScreen} />
        <Stack.Screen name="MarketplaceExplorar" component={MarketplaceExplorarScreen} />
        <Stack.Screen name="MarketplaceProduto" component={MarketplaceProdutoScreen} />
        <Stack.Screen name="MarketplaceServico" component={MarketplaceServicoScreen} />
        <Stack.Screen name="PerfilProfissional" component={PerfilProfissionalScreen} />
        <Stack.Screen name="Haras" component={HarasScreen} />
        <Stack.Screen name="MarketplaceReserva" component={MarketplaceReservaScreen} />
        <Stack.Screen name="Carteira" component={CarteiraScreen} />
        <Stack.Screen name="MarketplaceHistorico" component={MarketplaceHistoricoScreen} />
        <Stack.Screen name="MarketplaceFavoritos" component={MarketplaceFavoritosScreen} />
        <Stack.Screen name="MarketplaceChat" component={MarketplaceChatScreen} />
        <Stack.Screen name="MarketplaceCheckout" component={MarketplaceCheckoutScreen} />
        <Stack.Screen name="MarketplaceAvaliacoes" component={MarketplaceAvaliacoesScreen} />
        <Stack.Screen name="MarketplaceCupons" component={MarketplaceCuponsScreen} />
        <Stack.Screen name="MarketplaceEventos" component={MarketplaceEventosScreen} />
        <Stack.Screen name="MarketplaceCursos" component={MarketplaceCursosScreen} />
        <Stack.Screen name="PremiumHome" component={PremiumHomeScreen} />
        <Stack.Screen name="PremiumBeneficios" component={PremiumBeneficiosScreen} />
        <Stack.Screen name="PremiumIA" component={PremiumIAScreen} />
        <Stack.Screen name="PremiumTemas" component={PremiumTemasScreen} />
        <Stack.Screen name="PremiumLivros" component={PremiumLivrosScreen} />
        <Stack.Screen name="PremiumVideos" component={PremiumVideosScreen} />
        <Stack.Screen name="PremiumBiblioteca" component={PremiumBibliotecaScreen} />
        <Stack.Screen name="PremiumClube" component={PremiumClubeScreen} />
        <Stack.Screen name="PremiumEventos" component={PremiumEventosScreen} />
        <Stack.Screen name="PremiumPersonalizacao" component={PremiumPersonalizacaoScreen} />
        <Stack.Screen name="PremiumBackup" component={PremiumBackupScreen} />
        <Stack.Screen name="PremiumAssinatura" component={PremiumAssinaturaScreen} />
        <Stack.Screen name="PremiumCriacoesExclusivas" component={PremiumCriacoesExclusivasScreen} />
        <Stack.Screen name="PremiumFoundingMembers" component={PremiumFoundingMembersScreen} />
        <Stack.Screen name="PremiumFAQ" component={PremiumFAQScreen} />
        <Stack.Screen name="PremiumHistoricoFinanceiro" component={PremiumHistoricoFinanceiroScreen} />
        <Stack.Screen name="PremiumCheckout" component={PremiumCheckoutScreen} />
        <Stack.Screen name="PremiumSucesso" component={PremiumSucessoScreen} />
        <Stack.Screen name="PremiumGerenciarAssinatura" component={PremiumGerenciarAssinaturaScreen} />
        <Stack.Screen name="PremiumErroPagamento" component={PremiumErroPagamentoScreen} />
        <Stack.Screen name="GamificacaoHub" component={GamificacaoHubScreen} />
        <Stack.Screen name="GamificacaoConquistas" component={GamificacaoConquistasScreen} />
        <Stack.Screen name="GamificacaoSelos" component={GamificacaoSelosScreen} />
        <Stack.Screen name="GamificacaoDesafios" component={GamificacaoDesafiosScreen} />
        <Stack.Screen name="GamificacaoStreak" component={GamificacaoStreakScreen} />
        <Stack.Screen name="GamificacaoJornadas" component={GamificacaoJornadasScreen} />
        <Stack.Screen name="GamificacaoMissoes" component={GamificacaoMissoesScreen} />
        <Stack.Screen name="GamificacaoLoja" component={GamificacaoLojaScreen} />
        <Stack.Screen name="GamificacaoRanking" component={GamificacaoRankingScreen} />
        <Stack.Screen name="GamificacaoTemporadas" component={GamificacaoTemporadasScreen} />
        <Stack.Screen name="GamificacaoObjetivos" component={GamificacaoObjetivosScreen} />
        <Stack.Screen name="Configuracoes" component={ConfiguracoesHubScreen} />
        <Stack.Screen name="Conta" component={ContaScreen} />
        <Stack.Screen name="ConfiguracoesPrivacidade" component={ConfiguracoesPrivacidadeScreen} />
        <Stack.Screen name="Seguranca" component={SegurancaScreen} />
        <Stack.Screen name="ConfiguracoesIA" component={ConfiguracoesIAScreen} />
        <Stack.Screen name="PreferenciasNotificacao" component={PreferenciasNotificacaoScreen} />
        <Stack.Screen name="Aparencia" component={AparenciaScreen} />
        <Stack.Screen name="IdiomaRegiao" component={IdiomaRegiaoScreen} />
        <Stack.Screen name="Backup" component={BackupScreen} />
        <Stack.Screen name="Compartilhamento" component={CompartilhamentoScreen} />
        <Stack.Screen name="ConfiguracoesPremium" component={ConfiguracoesPremiumScreen} />
        <Stack.Screen name="Ajuda" component={AjudaScreen} />
        <Stack.Screen name="Sobre" component={SobreScreen} />
        <Stack.Screen name="ModoDesenvolvedor" component={ModoDesenvolvedorScreen} />
        <Stack.Screen name="EditarInformacoes" component={EditarInformacoesScreen} />
        <Stack.Screen name="TrocarSenha" component={TrocarSenhaScreen} />
        <Stack.Screen name="Configurar2FA" component={Configurar2FAScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        <Stack.Screen name="AdminUsuarios" component={AdminUsuariosScreen} />
        <Stack.Screen name="AdminUsuarioDetalhe" component={AdminUsuarioDetalheScreen} />
        <Stack.Screen name="AdminCavalos" component={AdminCavalosScreen} />
        <Stack.Screen name="AdminCavaloDetalhe" component={AdminCavaloDetalheScreen} />
        <Stack.Screen name="AdminComunidade" component={AdminComunidadeScreen} />
        <Stack.Screen name="AdminModeracao" component={AdminModeracaoScreen} />
        <Stack.Screen name="AdminMarketplace" component={AdminMarketplaceScreen} />
        <Stack.Screen name="AdminEventos" component={AdminEventosScreen} />
        <Stack.Screen name="AdminCriarEvento" component={AdminCriarEventoScreen} />
        <Stack.Screen name="AdminClubePremium" component={AdminClubePremiumScreen} />
        <Stack.Screen name="AdminIA" component={AdminIAScreen} />
        <Stack.Screen name="AdminAnalytics" component={AdminAnalyticsScreen} />
        <Stack.Screen name="AdminFinanceiro" component={AdminFinanceiroScreen} />
        <Stack.Screen name="AdminCMS" component={AdminCMSScreen} />
        <Stack.Screen name="AdminCmsEditor" component={AdminCmsEditorScreen} />
        <Stack.Screen name="AdminCampanhas" component={AdminCampanhasScreen} />
        <Stack.Screen name="AdminSuporte" component={AdminSuporteScreen} />
        <Stack.Screen name="AdminChamadoDetalhe" component={AdminChamadoDetalheScreen} />
        <Stack.Screen name="AdminAuditoria" component={AdminAuditoriaScreen} />
        <Stack.Screen name="AdminConfiguracoesGlobais" component={AdminConfiguracoesGlobaisScreen} />
        <Stack.Screen name="AdminLogs" component={AdminLogsScreen} />
        <Stack.Screen name="AdminAPIs" component={AdminAPIsScreen} />
        <Stack.Screen name="AdminFeatureFlags" component={AdminFeatureFlagsScreen} />
        <Stack.Screen name="PortalDashboard" component={PortalDashboardScreen} />
        <Stack.Screen name="PortalAgenda" component={PortalAgendaScreen} />
        <Stack.Screen name="PortalClientes" component={PortalClientesScreen} />
        <Stack.Screen name="PortalClienteDetalhe" component={PortalClienteDetalheScreen} />
        <Stack.Screen name="PortalCavalosAtendidos" component={PortalCavalosAtendidosScreen} />
        <Stack.Screen name="PortalServicos" component={PortalServicosScreen} />
        <Stack.Screen name="PortalReservas" component={PortalReservasScreen} />
        <Stack.Screen name="PortalFinanceiro" component={PortalFinanceiroScreen} />
        <Stack.Screen name="PortalAvaliacoes" component={PortalAvaliacoesScreen} />
        <Stack.Screen name="PortalAnalytics" component={PortalAnalyticsScreen} />
        <Stack.Screen name="PortalPerfilPublico" component={PortalPerfilPublicoScreen} />
        <Stack.Screen name="PortalPortfolio" component={PortalPortfolioScreen} />
        <Stack.Screen name="PortalConteudo" component={PortalConteudoScreen} />
        <Stack.Screen name="PortalOrganizadorDashboard" component={PortalOrganizadorDashboardScreen} />
        <Stack.Screen name="PortalCriarEvento" component={PortalCriarEventoScreen} />
        <Stack.Screen name="PortalParticipantes" component={PortalParticipantesScreen} />
        <Stack.Screen name="PortalCheckin" component={PortalCheckinScreen} />
        <Stack.Screen name="PortalCertificados" component={PortalCertificadosScreen} />
        <Stack.Screen name="PortalLoja" component={PortalLojaScreen} />
        <Stack.Screen name="PortalProdutos" component={PortalProdutosScreen} />
        <Stack.Screen name="PortalPedidos" component={PortalPedidosScreen} />
        <Stack.Screen name="PortalEstoque" component={PortalEstoqueScreen} />
        <Stack.Screen name="PortalPromocoes" component={PortalPromocoesScreen} />
        <Stack.Screen name="PortalRelatorios" component={PortalRelatoriosScreen} />
        <Stack.Screen name="PortalNovoServico" component={PortalNovoServicoScreen} />
        <Stack.Screen name="PortalNovoProduto" component={PortalNovoProdutoScreen} />
        <Stack.Screen name="PortalNovaPromocao" component={PortalNovaPromocaoScreen} />
        <Stack.Screen name="PortalPedidoDetalhe" component={PortalPedidoDetalheScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
