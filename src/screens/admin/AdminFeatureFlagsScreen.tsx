import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View } from 'react-native';
import { AdminScreen } from '../../components/admin/AdminScreen';
import { Switch } from '../../components/ui/Switch';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAdminStore } from '../../store/useAdminStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminFeatureFlags'>;

const ROLLOUT_PRESETS = [0, 10, 25, 50, 75, 100];

export function AdminFeatureFlagsScreen({ navigation }: Props) {
  const flags = useAdminStore((s) => s.flags);
  const toggleFlag = useAdminStore((s) => s.toggleFlag);
  const setRolloutPercent = useAdminStore((s) => s.setRolloutPercent);

  return (
    <AdminScreen
      title="Feature flags"
      activeRoute="AdminFeatureFlags"
      onNavigateModule={(route) => navigation.navigate(route)}
      onNavigateUsuario={(id) => navigation.navigate('AdminUsuarioDetalhe', { id })}
      onNavigateCavalo={(id) => navigation.navigate('AdminCavaloDetalhe', { id })}
      onNavigateChamado={(id) => navigation.navigate('AdminChamadoDetalhe', { id })}
    >
      <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
        Ideal para testes por país, versão, usuário ou plano.
      </Text>

      <View style={styles.list}>
        {flags.map((f) => (
          <View key={f.key} style={styles.row}>
            <View style={styles.rowHeader}>
              <View style={styles.rowTexts}>
                <Text variant="sm" weight="bold">
                  {f.nome}
                </Text>
                <Text variant="xs" weight="medium" color="secondary">
                  {f.hasRollout && f.on ? `Rollout gradual · ${f.rolloutPercent}%` : f.escopo}
                </Text>
              </View>
              <Switch value={f.on} onValueChange={() => toggleFlag(f.key)} />
            </View>
            {f.hasRollout && f.on && (
              <View style={styles.presetsRow}>
                {ROLLOUT_PRESETS.map((p) => (
                  <Pressable
                    key={p}
                    style={[styles.presetChip, f.rolloutPercent === p && styles.presetChipActive]}
                    onPress={() => setRolloutPercent(f.key, p)}
                  >
                    <Text
                      variant="xs"
                      weight="bold"
                      color={f.rolloutPercent === p ? theme.colors.accent.gold : 'primary'}
                    >
                      {p}%
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
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
  list: {
    marginTop: theme.spacing.md,
  },
  row: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(43,41,36,0.06)',
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  rowTexts: {
    flex: 1,
  },
  presetsRow: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 6,
  },
  presetChip: {
    borderRadius: 8,
    backgroundColor: 'rgba(43,41,36,0.06)',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  presetChipActive: {
    backgroundColor: theme.colors.surfaceDark,
  },
});
