import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { AdminScreen } from '../../components/admin/AdminScreen';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAdminStore } from '../../store/useAdminStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminCampanhas'>;

export function AdminCampanhasScreen({ navigation }: Props) {
  const segmentacaoOptions = useAdminStore((s) => s.segmentacaoOptions);
  const campanhas = useAdminStore((s) => s.campanhas);

  return (
    <AdminScreen
      title="Campanhas"
      activeRoute="AdminCampanhas"
      onNavigateModule={(route) => navigation.navigate(route)}
      onNavigateUsuario={(id) => navigation.navigate('AdminUsuarioDetalhe', { id })}
      onNavigateCavalo={(id) => navigation.navigate('AdminCavaloDetalhe', { id })}
      onNavigateChamado={(id) => navigation.navigate('AdminChamadoDetalhe', { id })}
    >
      <Text variant="xs" weight="bold" style={styles.sectionLabel}>
        SEGMENTAR POR
      </Text>
      <View style={styles.optionsRow}>
        {segmentacaoOptions.map((s) => (
          <View key={s} style={styles.optionChip}>
            <Text variant="sm" weight="bold">
              {s}
            </Text>
          </View>
        ))}
      </View>

      <Text variant="xs" weight="bold" style={styles.sectionLabel}>
        CAMPANHAS AGENDADAS
      </Text>
      <View style={styles.list}>
        {campanhas.map((c) => (
          <View key={c.titulo} style={styles.card}>
            <Text variant="sm" weight="bold">
              {c.titulo}
            </Text>
            <Text variant="xs" weight="medium" color="secondary" style={styles.meta}>
              {c.tipo} · {c.data}
            </Text>
          </View>
        ))}
      </View>
    </AdminScreen>
  );
}

const styles = StyleSheet.create({
  sectionLabel: {
    marginTop: theme.spacing.lg,
    letterSpacing: 0.4,
  },
  optionsRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  optionChip: {
    borderRadius: 14,
    backgroundColor: 'rgba(43,41,36,0.06)',
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  list: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  card: {
    borderRadius: 14,
    backgroundColor: '#fff',
    paddingHorizontal: 13,
    paddingVertical: 11,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 1,
  },
  meta: {
    marginTop: 2,
  },
});
