import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ComponentType, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Chip } from '../components/ui/Chip';
import { Screen } from '../components/ui/Screen';
import { Switch } from '../components/ui/Switch';
import { Text } from '../components/ui/Text';
import {
  AiIcon,
  BackIcon,
  CalendarIcon,
  CloseIcon,
  PeopleIcon,
  PulseHeartIcon,
  RefreshIcon,
  SettingsIcon,
  StarIcon,
  StoreIcon,
} from '../components/ui/icons';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Notificacoes'>;

type Categoria = 'IA' | 'Comunidade' | 'Marketplace' | 'Eventos' | 'Saúde' | 'Premium' | 'Sistema';

interface NotificacaoItem {
  id: string;
  titulo: string;
  descricao: string;
  tempo: string;
  fullTime: string;
  cat: Categoria;
  unread: boolean;
  cta: string | null;
  ctaDestino?: keyof RootStackParamList;
}

interface Grupo {
  periodo: string;
  itens: NotificacaoItem[];
}

const ICON_BY_CATEGORIA: Record<Categoria, ComponentType<{ size?: number; color?: string }>> = {
  IA: AiIcon,
  Comunidade: PeopleIcon,
  Marketplace: StoreIcon,
  Eventos: CalendarIcon,
  Saúde: PulseHeartIcon,
  Premium: StarIcon,
  Sistema: SettingsIcon,
};

const GRUPOS_BASE: Grupo[] = [
  {
    periodo: 'Hoje',
    itens: [
      {
        id: 'ia-carta',
        titulo: 'Nova carta da IA chegou',
        descricao: 'Uma reflexão sobre os últimos treinos com seu cavalo.',
        tempo: 'há 20 min',
        fullTime: 'hoje, 14:40',
        cat: 'IA',
        unread: true,
        cta: 'Ler carta',
        ctaDestino: 'CartasIA',
      },
      {
        id: 'com-coment',
        titulo: 'Alguém comentou na sua memória',
        descricao: '"Que momento lindo!"',
        tempo: 'há 1h',
        fullTime: 'hoje, 14:00',
        cat: 'Comunidade',
        unread: true,
        cta: 'Ver comentário',
        ctaDestino: 'Comunidade',
      },
      {
        id: 'saude-ferrageamento',
        titulo: 'Lembrete de ferrageamento',
        descricao: 'Historicamente vocês fazem a cada 6 semanas — já se passaram 5.',
        tempo: 'há 3h',
        fullTime: 'hoje, 11:10',
        cat: 'Saúde',
        unread: false,
        cta: null,
      },
    ],
  },
  {
    periodo: 'Ontem',
    itens: [
      {
        id: 'evt-inscricao',
        titulo: 'Inscrição confirmada',
        descricao: 'Copa Nacional de Salto · 20 de julho.',
        tempo: 'ontem',
        fullTime: 'ontem, 09:22',
        cat: 'Eventos',
        unread: false,
        cta: 'Ver evento',
        ctaDestino: 'EventosDescobrir',
      },
      {
        id: 'mkt-pedido',
        titulo: 'Pedido enviado',
        descricao: 'Sela clássica em couro está a caminho.',
        tempo: 'ontem',
        fullTime: 'ontem, 08:05',
        cat: 'Marketplace',
        unread: false,
        cta: 'Rastrear',
        ctaDestino: 'MarketplaceHistorico',
      },
    ],
  },
  {
    periodo: 'Esta semana',
    itens: [
      {
        id: 'ia-retro',
        titulo: 'Retrospectiva semanal pronta',
        descricao: 'Sua semana, resumida pela IA.',
        tempo: '3 dias',
        fullTime: 'há 3 dias, 18:00',
        cat: 'IA',
        unread: false,
        cta: 'Ver retrospectiva',
        ctaDestino: 'Retrospectivas',
      },
      {
        id: 'prem-tema',
        titulo: 'Novo benefício Premium disponível',
        descricao: 'Um novo tema visual foi desbloqueado.',
        tempo: '4 dias',
        fullTime: 'há 4 dias, 10:30',
        cat: 'Premium',
        unread: false,
        cta: 'Ver tema',
        ctaDestino: 'PremiumTemas',
      },
    ],
  },
  {
    periodo: 'Mais antigas',
    itens: [
      {
        id: 'sys-backup',
        titulo: 'Backup concluído com sucesso',
        descricao: 'Suas memórias estão seguras.',
        tempo: '2 semanas',
        fullTime: 'há 2 semanas, 03:00',
        cat: 'Sistema',
        unread: false,
        cta: null,
      },
    ],
  },
];

const MAIS_ANTIGAS_EXTRA: NotificacaoItem[] = [
  {
    id: 'old-1',
    titulo: 'Alguém começou a seguir você',
    descricao: 'Agora vocês podem trocar mensagens.',
    tempo: '3 semanas',
    fullTime: 'há 3 semanas',
    cat: 'Comunidade',
    unread: false,
    cta: 'Ver perfil',
    ctaDestino: 'PerfilPublico',
  },
  {
    id: 'old-2',
    titulo: 'Avaliação de fornecedor pendente',
    descricao: 'Avalie sua compra recente.',
    tempo: '1 mês',
    fullTime: 'há 1 mês',
    cat: 'Marketplace',
    unread: false,
    cta: 'Avaliar',
    ctaDestino: 'MarketplaceHistorico',
  },
];

const FILTRO_OPTIONS: ('Todas' | Categoria)[] = ['Todas', 'IA', 'Comunidade', 'Marketplace', 'Eventos', 'Saúde', 'Premium', 'Sistema'];

export function NotificacoesScreen({ navigation }: Props) {
  const [filtro, setFiltro] = useState<'Todas' | Categoria>('Todas');
  const [digestOn, setDigestOn] = useState(true);
  const [silencioAuto, setSilencioAuto] = useState(true);
  const [allRead, setAllRead] = useState(false);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [snoozeOpenId, setSnoozeOpenId] = useState<string | null>(null);
  const [dateExpandedId, setDateExpandedId] = useState<string | null>(null);
  const [moreAntigas, setMoreAntigas] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const gruposComExtras = useMemo(() => {
    if (!moreAntigas) return GRUPOS_BASE;
    return GRUPOS_BASE.map((g) =>
      g.periodo === 'Mais antigas' ? { ...g, itens: [...g.itens, ...MAIS_ANTIGAS_EXTRA] } : g
    );
  }, [moreAntigas]);

  const gruposFiltrados = useMemo(() => {
    return gruposComExtras
      .map((g) => ({
        ...g,
        itens: g.itens.filter((n) => !deletedIds.includes(n.id) && (filtro === 'Todas' || n.cat === filtro)),
      }))
      .filter((g) => g.itens.length > 0);
  }, [gruposComExtras, deletedIds, filtro]);

  const todosItens = useMemo(() => gruposComExtras.flatMap((g) => g.itens), [gruposComExtras]);
  const restantes = todosItens.filter((n) => !deletedIds.includes(n.id));
  const unreadCount = restantes.filter((n) => n.unread && !allRead).length;

  const lastGroupRestantes = gruposComExtras[3].itens.filter((n) => !deletedIds.includes(n.id));
  const showCarregarMais =
    !moreAntigas && lastGroupRestantes.length > 0 && (filtro === 'Todas' || lastGroupRestantes.some((n) => n.cat === filtro));

  function handleRefresh() {
    if (refreshing) return;
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 900);
  }

  function handleDismiss(id: string) {
    setDeletedIds((ids) => [...ids, id]);
    setSnoozeOpenId(null);
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Pressable style={styles.backButton} onPress={() => navigation.navigate('Home')} hitSlop={8}>
            <BackIcon size={16} />
          </Pressable>
          <View style={styles.headerTexts}>
            <Text variant="lg" weight="extraBold">
              Notificações
            </Text>
            <Text variant="xs" weight="bold" color={unreadCount > 0 ? theme.colors.accent.leather : 'tertiary'}>
              {unreadCount > 0 ? `${unreadCount} não lidas` : 'Tudo em dia'}
            </Text>
          </View>
          <Pressable style={styles.refreshButton} onPress={handleRefresh} accessibilityLabel="Atualizar">
            <RefreshIcon size={16} />
          </Pressable>
        </View>

        <View style={styles.actionsRow}>
          <Pressable onPress={() => setAllRead(true)}>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather}>
              Marcar tudo como lido
            </Text>
          </Pressable>
          <View style={styles.digestToggle}>
            <Text variant="xs" weight="semiBold" color="secondary">
              Resumo diário
            </Text>
            <Switch value={digestOn} onValueChange={setDigestOn} />
          </View>
        </View>

        {digestOn && (
          <View style={styles.digestCard}>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.digestLabel}>
              RESUMO DE HOJE
            </Text>
            <Text variant="sm" weight="medium" style={styles.digestText}>
              Você tem um lembrete de ferrageamento em 10 dias e uma nova carta da IA está pronta.
            </Text>
          </View>
        )}

        <Pressable onPress={() => navigation.navigate('PreferenciasNotificacao')}>
          <Text variant="xs" weight="semiBold" color="tertiary" style={styles.manageLink}>
            Gerenciar preferências de notificação
          </Text>
        </Pressable>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtroRow}>
          {FILTRO_OPTIONS.map((label) => (
            <Chip key={label} label={label} selected={filtro === label} onPress={() => setFiltro(label)} />
          ))}
        </ScrollView>

        {gruposFiltrados.length === 0 ? (
          <View style={styles.emptyState}>
            <Text variant="md" weight="extraBold">
              {restantes.length === 0 ? 'Tudo limpo por aqui' : `Nenhuma notificação em ${filtro}`}
            </Text>
            <Text variant="sm" weight="medium" color="secondary" style={styles.emptySubtitle}>
              {restantes.length === 0
                ? 'Você não tem notificações pendentes.'
                : 'Notificações desta categoria vão aparecer aqui.'}
            </Text>
          </View>
        ) : (
          <View style={styles.gruposList}>
            {gruposFiltrados.map((g) => (
              <View key={g.periodo}>
                <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.periodoLabel}>
                  {g.periodo.toUpperCase()}
                </Text>
                <View style={styles.itensList}>
                  {g.itens.map((n) => {
                    const unread = n.unread && !allRead;
                    const Icon = ICON_BY_CATEGORIA[n.cat];
                    const dateExpanded = dateExpandedId === n.id;
                    const snoozeOpen = snoozeOpenId === n.id;
                    return (
                      <View key={n.id} style={styles.notifCard}>
                        <Pressable
                          style={styles.dismissButton}
                          onPress={() => handleDismiss(n.id)}
                          hitSlop={8}
                          accessibilityLabel="Descartar"
                        >
                          <CloseIcon size={10} color={theme.colors.text.tertiary} />
                        </Pressable>
                        <View style={styles.notifIconWrap}>
                          <Icon size={17} color={theme.colors.accent.leather} />
                        </View>
                        <View style={styles.notifTexts}>
                          <View style={styles.notifTitleRow}>
                            {unread && <View style={styles.unreadDot} />}
                            <Text variant="xs" weight={unread ? 'extraBold' : 'bold'} style={styles.notifTitle}>
                              {n.titulo}
                            </Text>
                          </View>
                          <Text variant="xs" weight="medium" color="secondary" style={styles.notifDesc}>
                            {n.descricao}
                          </Text>
                          <View style={styles.notifMetaRow}>
                            <Pressable onPress={() => setDateExpandedId(dateExpanded ? null : n.id)}>
                              <Text variant="xs" weight="semiBold" color="tertiary">
                                {dateExpanded ? n.fullTime : n.tempo}
                              </Text>
                            </Pressable>
                            {!!n.cta && (
                              <Pressable onPress={() => n.ctaDestino && navigation.navigate(n.ctaDestino as never)}>
                                <Text variant="xs" weight="bold" color={theme.colors.accent.leather}>
                                  {n.cta}
                                </Text>
                              </Pressable>
                            )}
                            <Pressable
                              style={styles.snoozeTrigger}
                              onPress={() => setSnoozeOpenId(snoozeOpen ? null : n.id)}
                            >
                              <Text variant="xs" weight="semiBold" color="tertiary">
                                Silenciar…
                              </Text>
                            </Pressable>
                          </View>
                          {snoozeOpen && (
                            <View style={styles.snoozeOptions}>
                              {['1 hora', 'Hoje', 'Este tipo', 'Sempre'].map((label) => (
                                <Pressable key={label} style={styles.snoozeChip} onPress={() => handleDismiss(n.id)}>
                                  <Text variant="xs" weight="bold">
                                    {label}
                                  </Text>
                                </Pressable>
                              ))}
                            </View>
                          )}
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            ))}
            {showCarregarMais && (
              <Pressable onPress={() => setMoreAntigas(true)}>
                <Text variant="sm" weight="bold" color={theme.colors.accent.leather} style={styles.carregarMais}>
                  Carregar mais antigas
                </Text>
              </Pressable>
            )}
          </View>
        )}

        <View style={styles.silencioCard}>
          <PulseHeartIcon size={18} color={theme.colors.accent.olive} />
          <Text variant="xs" weight="medium" color="secondary" style={styles.silencioText}>
            Silêncio automático ativo durante treinos e competições registradas na sua agenda.
          </Text>
          <Switch value={silencioAuto} onValueChange={setSilencioAuto} />
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
    paddingBottom: 112,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTexts: {
    flex: 1,
  },
  refreshButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  digestToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  digestCard: {
    marginTop: theme.spacing.md,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: 'rgba(201,161,90,0.12)',
    padding: theme.spacing.md,
  },
  digestLabel: {
    letterSpacing: 0.4,
  },
  digestText: {
    marginTop: 6,
  },
  manageLink: {
    marginTop: theme.spacing.sm,
    textDecorationLine: 'underline',
  },
  filtroRow: {
    marginTop: theme.spacing.md,
  },
  emptyState: {
    marginTop: theme.spacing.xxl,
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
  },
  emptySubtitle: {
    textAlign: 'center',
  },
  gruposList: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  periodoLabel: {
    letterSpacing: 0.6,
  },
  itensList: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  notifCard: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  dismissButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(43,41,36,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(201,161,90,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifTexts: {
    flex: 1,
    paddingRight: 18,
  },
  notifTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.accent.gold,
  },
  notifTitle: {
    flex: 1,
  },
  notifDesc: {
    marginTop: 2,
  },
  notifMetaRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    flexWrap: 'wrap',
  },
  snoozeTrigger: {
    marginLeft: 'auto',
  },
  snoozeOptions: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  snoozeChip: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  carregarMais: {
    textAlign: 'center',
    paddingVertical: theme.spacing.sm,
  },
  silencioCard: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(107,115,83,0.1)',
    padding: theme.spacing.md,
  },
  silencioText: {
    flex: 1,
  },
});
