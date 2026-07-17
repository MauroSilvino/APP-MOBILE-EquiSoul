import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { AdminScreen } from '../../components/admin/AdminScreen';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAdminStore } from '../../store/useAdminStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminIA'>;

export function AdminIAScreen({ navigation }: Props) {
  const iaIndicadores = useAdminStore((s) => s.iaIndicadores);
  const iaFerramentas = useAdminStore((s) => s.iaFerramentas);

  return (
    <AdminScreen
      title="IA"
      activeRoute="AdminIA"
      onNavigateModule={(route) => navigation.navigate(route)}
      onNavigateUsuario={(id) => navigation.navigate('AdminUsuarioDetalhe', { id })}
      onNavigateCavalo={(id) => navigation.navigate('AdminCavaloDetalhe', { id })}
      onNavigateChamado={(id) => navigation.navigate('AdminChamadoDetalhe', { id })}
    >
      <View style={styles.grid}>
        {iaIndicadores.map((i) => (
          <View key={i.label} style={styles.card}>
            <Text variant="md" weight="extraBold">
              {i.valor}
            </Text>
            <Text variant="xs" weight="semiBold" color="secondary" style={styles.label}>
              {i.label}
            </Text>
          </View>
        ))}
      </View>

      <Text variant="xs" weight="bold" style={styles.sectionLabel}>
        FERRAMENTAS
      </Text>
      <View style={styles.toolsRow}>
        {iaFerramentas.map((f) => (
          <View key={f} style={styles.toolChip}>
            <Text variant="sm" weight="bold">
              {f}
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
  card: {
    width: '32%',
    borderRadius: 14,
    backgroundColor: '#fff',
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 1,
  },
  label: {
    marginTop: 2,
  },
  sectionLabel: {
    marginTop: theme.spacing.lg,
    letterSpacing: 0.4,
  },
  toolsRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  toolChip: {
    borderRadius: 14,
    backgroundColor: 'rgba(43,41,36,0.06)',
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
});
