import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { AdminScreen } from '../../components/admin/AdminScreen';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAdminStore } from '../../store/useAdminStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminAuditoria'>;

export function AdminAuditoriaScreen({ navigation }: Props) {
  const auditoria = useAdminStore((s) => s.auditoria);

  return (
    <AdminScreen
      title="Auditoria"
      activeRoute="AdminAuditoria"
      onNavigateModule={(route) => navigation.navigate(route)}
      onNavigateUsuario={(id) => navigation.navigate('AdminUsuarioDetalhe', { id })}
      onNavigateCavalo={(id) => navigation.navigate('AdminCavaloDetalhe', { id })}
      onNavigateChamado={(id) => navigation.navigate('AdminChamadoDetalhe', { id })}
    >
      <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
        Nenhum registro pode ser apagado.
      </Text>

      <View style={styles.timeline}>
        {auditoria.map((a, i) => (
          <View key={`${a.acao}-${i}`} style={styles.entryRow}>
            <View style={styles.dotColumn}>
              <View style={styles.dot} />
              {i < auditoria.length - 1 && <View style={styles.line} />}
            </View>
            <View style={styles.entryTexts}>
              <Text variant="sm" weight="bold">
                {a.acao}
              </Text>
              <Text variant="xs" weight="medium" color="secondary">
                {a.ator} · {a.tempo}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </AdminScreen>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 6,
  },
  timeline: {
    marginTop: theme.spacing.md,
  },
  entryRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  dotColumn: {
    alignItems: 'center',
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: theme.colors.accent.leather,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(43,41,36,0.1)',
    marginVertical: 2,
  },
  entryTexts: {
    flex: 1,
    paddingBottom: 14,
  },
});
