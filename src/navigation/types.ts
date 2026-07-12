export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Storytelling: undefined;
  Login: undefined;
  Cadastro: undefined;
  RecuperarSenha: undefined;
  NovaSenha: undefined;
  CriarPerfil: undefined;
  AdicionarCavalo: undefined;
  Relacionamento: undefined;
  Preferencias: undefined;
  Permissoes: undefined;
  TourInteligente: undefined;
  PrimeiroCheckin: undefined;
  PrimeiraCartaIA: undefined;
  Home: undefined;
  NovoRegistro: { tipoInicial?: string } | undefined;
  MemoriaCompleta: { id?: string } | undefined;
  Timeline: undefined;
  Calendario: undefined;
  PesquisaMemorias: undefined;
  Favoritos: undefined;
  TipoMemoria: undefined;
  CapturaMidia: undefined;
  InformacoesRapidas: undefined;
  Notificacoes: undefined;
  Comunidade: undefined;
  Perfis: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
