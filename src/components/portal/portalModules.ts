export type PortalModuleRoute =
  | 'PortalDashboard'
  | 'PortalPerfilPublico'
  | 'PortalOrganizadorDashboard'
  | 'PortalLoja';

export const PORTAL_MODES: { label: string; route: PortalModuleRoute }[] = [
  { label: 'Profissional', route: 'PortalDashboard' },
  { label: 'Perfil público', route: 'PortalPerfilPublico' },
  { label: 'Organizador', route: 'PortalOrganizadorDashboard' },
  { label: 'Minha loja', route: 'PortalLoja' },
];
