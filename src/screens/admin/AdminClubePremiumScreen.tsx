import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { AdminScreen } from '../../components/admin/AdminScreen';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAdminStore } from '../../store/useAdminStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminClubePremium'>;

export function AdminClubePremiumScreen({ navigation }: Props) {
  const premiumMetricas = useAdminStore((s) => s.premiumMetricas);
  const premiumPlanos = useAdminStore((s) => s.premiumPlanos);

  return (
    <AdminScreen
      title="Clube Premium"
      activeRoute="AdminClubePremium"
      onNavigateModule={(route) => navigation.navigate(route)}
      onNavigateUsuario={(id) => navigation.navigate('AdminUsuarioDetalhe', { id })}
      onNavigateCavalo={(id) => navigation.navigate('AdminCavaloDetalhe', { id })}
      onNavigateChamado={(id) => navigation.navigate('AdminChamadoDetalhe', { id })}
    >
      <View style={styles.grid}>
        {premiumMetricas.map((m) => (
          <View key={m.label} style={styles.metricCard}>
            <Text variant="lg" weight="extraBold">
              {m.valor}
            </Text>
            <Text variant="xs" weight="semiBold" color="secondary" style={styles.metricLabel}>
              {m.label}
            </Text>
          </View>
        ))}
      </View>

      <Text variant="xs" weight="bold" style={styles.sectionLabel}>
        PLANOS ATIVOS
      </Text>
      <View style={styles.list}>
        {premiumPlanos.map((p) => (
          <View key={p.nome} style={styles.planoRow}>
            <Text variant="sm" weight="semiBold">
              {p.nome}
            </Text>
            <Text variant="sm" weight="semiBold" color={theme.colors.accent.leather}>
              {p.assinantes} assinantes
            </Text>
          </View>
        ))}
      </View>
    </AdminScreen>
  );
}

const styles = StyleSheet.create({
  grid: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  metricCard: {
    width: '48.5%',
    borderRadius: 14,
    backgroundColor: '#fff',
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 1,
  },
  metricLabel: {
    marginTop: 2,
  },
  sectionLabel: {
    marginTop: theme.spacing.lg,
    letterSpacing: 0.4,
  },
  list: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  planoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 1,
  },
});
