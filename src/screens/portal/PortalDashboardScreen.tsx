import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalDashboard'>;

type DashboardTarget =
  | 'PortalAgenda'
  | 'PortalReservas'
  | 'PortalFinanceiro'
  | 'PortalAvaliacoes'
  | 'PortalClientes'
  | 'PortalOrganizadorDashboard'
  | 'PortalCavalosAtendidos'
  | 'PortalServicos'
  | 'PortalAnalytics'
  | 'PortalPerfilPublico'
  | 'PortalPortfolio'
  | 'PortalConteudo'
  | 'PortalLoja';

const CARDS: { valor: string; label: string; target: DashboardTarget | null }[] = [
  { valor: '3', label: 'Agenda de hoje', target: 'PortalAgenda' },
  { valor: '2', label: 'Novas reservas', target: 'PortalReservas' },
  { valor: '5', label: 'Mensagens', target: null },
  { valor: 'R$ 8.420', label: 'Receita do mês', target: 'PortalFinanceiro' },
  { valor: '4.9 ★', label: 'Avaliação média', target: 'PortalAvaliacoes' },
  { valor: '62', label: 'Clientes ativos', target: 'PortalClientes' },
  { valor: '1', label: 'Eventos', target: 'PortalOrganizadorDashboard' },
];

const SERVICOS_MAIS_VENDIDOS = [
  { nome: 'Consulta de rotina', qtd: 18 },
  { nome: 'Ferrageamento', qtd: 12 },
  { nome: 'Fisioterapia', qtd: 9 },
];

const ATALHOS: { label: string; target: DashboardTarget }[] = [
  { label: 'Agenda', target: 'PortalAgenda' },
  { label: 'Clientes', target: 'PortalClientes' },
  { label: 'Cavalos', target: 'PortalCavalosAtendidos' },
  { label: 'Serviços', target: 'PortalServicos' },
  { label: 'Reservas', target: 'PortalReservas' },
  { label: 'Financeiro', target: 'PortalFinanceiro' },
  { label: 'Avaliações', target: 'PortalAvaliacoes' },
  { label: 'Analytics', target: 'PortalAnalytics' },
  { label: 'Perfil público', target: 'PortalPerfilPublico' },
  { label: 'Portfólio', target: 'PortalPortfolio' },
  { label: 'Conteúdo', target: 'PortalConteudo' },
  { label: 'Minha loja', target: 'PortalLoja' },
];

export function PortalDashboardScreen({ navigation }: Props) {
  return (
    <PortalScreen
      activeModule="PortalDashboard"
      onNavigateModule={(route) => navigation.navigate(route)}
    >
      <View style={styles.header}>
        <ImagePlaceholder caption="" style={styles.avatar} />
        <View>
          <Text variant="lg" weight="extraBold">
            Dra. Marina Kist
          </Text>
          <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.subtitle}>
            Veterinária · Verificada
          </Text>
        </View>
      </View>

      <View style={styles.banner}>
        <Text variant="sm" weight="medium" style={styles.bannerText}>
          Hoje você possui três atendimentos confirmados e dois novos pedidos de orçamento.
        </Text>
      </View>

      <View style={styles.grid}>
        {CARDS.map((c) => (
          <Pressable
            key={c.label}
            style={styles.card}
            disabled={!c.target}
            onPress={() => c.target && navigation.navigate(c.target)}
          >
            <Text variant="lg" weight="extraBold">
              {c.valor}
            </Text>
            <Text variant="xs" weight="semiBold" color="secondary" style={styles.cardLabel}>
              {c.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text variant="xs" weight="bold" style={styles.sectionTitle}>
        SERVIÇOS MAIS VENDIDOS
      </Text>
      <View style={styles.list}>
        {SERVICOS_MAIS_VENDIDOS.map((s) => (
          <View key={s.nome} style={styles.listRow}>
            <Text variant="sm" weight="semiBold">
              {s.nome}
            </Text>
            <Text variant="sm" weight="semiBold" color={theme.colors.accent.leather}>
              {s.qtd}x
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.atalhosGrid}>
        {ATALHOS.map((a) => (
          <Pressable key={a.label} style={styles.atalho} onPress={() => navigation.navigate(a.target)}>
            <Text variant="xs" weight="bold">
              {a.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </PortalScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  subtitle: {
    marginTop: 2,
  },
  banner: {
    marginTop: theme.spacing.md,
    borderRadius: 18,
    backgroundColor: 'rgba(201,161,90,0.12)',
    padding: theme.spacing.md,
  },
  bannerText: {
    lineHeight: 20,
  },
  grid: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  card: {
    width: '47%',
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 1,
  },
  cardLabel: {
    marginTop: 2,
  },
  sectionTitle: {
    marginTop: theme.spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  list: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  listRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 13,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 1,
  },
  atalhosGrid: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  atalho: {
    width: '47%',
    borderRadius: 12,
    backgroundColor: 'rgba(43,41,36,0.05)',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
});
