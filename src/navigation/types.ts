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
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
