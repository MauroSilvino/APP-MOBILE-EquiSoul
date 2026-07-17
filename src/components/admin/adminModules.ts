export type AdminModuleRoute =
  | 'AdminDashboard'
  | 'AdminUsuarios'
  | 'AdminCavalos'
  | 'AdminComunidade'
  | 'AdminModeracao'
  | 'AdminMarketplace'
  | 'AdminEventos'
  | 'AdminClubePremium'
  | 'AdminIA'
  | 'AdminAnalytics'
  | 'AdminFinanceiro'
  | 'AdminCMS'
  | 'AdminCampanhas'
  | 'AdminSuporte'
  | 'AdminAuditoria'
  | 'AdminConfiguracoesGlobais'
  | 'AdminLogs'
  | 'AdminAPIs'
  | 'AdminFeatureFlags';

export const ADMIN_MODULES: { label: string; route: AdminModuleRoute }[] = [
  { label: 'Dashboard', route: 'AdminDashboard' },
  { label: 'Usuários', route: 'AdminUsuarios' },
  { label: 'Cavalos', route: 'AdminCavalos' },
  { label: 'Comunidade', route: 'AdminComunidade' },
  { label: 'Moderação', route: 'AdminModeracao' },
  { label: 'Marketplace', route: 'AdminMarketplace' },
  { label: 'Eventos', route: 'AdminEventos' },
  { label: 'Clube Premium', route: 'AdminClubePremium' },
  { label: 'IA', route: 'AdminIA' },
  { label: 'Analytics', route: 'AdminAnalytics' },
  { label: 'Financeiro', route: 'AdminFinanceiro' },
  { label: 'CMS', route: 'AdminCMS' },
  { label: 'Notificações', route: 'AdminCampanhas' },
  { label: 'Suporte', route: 'AdminSuporte' },
  { label: 'Auditoria', route: 'AdminAuditoria' },
  { label: 'Configurações globais', route: 'AdminConfiguracoesGlobais' },
  { label: 'Logs', route: 'AdminLogs' },
  { label: 'APIs', route: 'AdminAPIs' },
  { label: 'Feature flags', route: 'AdminFeatureFlags' },
];
