import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SettingsHeader } from '../../components/configuracoes/SettingsHeader';
import { Screen } from '../../components/ui/Screen';
import { Switch } from '../../components/ui/Switch';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useSettingsStore } from '../../store/useSettingsStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PreferenciasNotificacao'>;

export function PreferenciasNotificacaoScreen({ navigation }: Props) {
  const categorias = useSettingsStore((state) => state.notificacoesCategorias);
  const toggleNotificacaoCanal = useSettingsStore((state) => state.toggleNotificacaoCanal);
  const horarioSilencioAtivo = useSettingsStore((state) => state.horarioSilencioAtivo);
  const setHorarioSilencioAtivo = useSettingsStore((state) => state.setHorarioSilencioAtivo);

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <SettingsHeader title="Notificações" onBack={() => navigation.navigate('Configuracoes')} />

        <View style={styles.list}>
          {categorias.map((c) => (
            <View key={c.categoria} style={styles.card}>
              <Text variant="sm" weight="extraBold">
                {c.categoria}
              </Text>
              <View style={styles.channels}>
                <View style={styles.channel}>
                  <Text variant="xs" weight="bold" color="secondary">
                    Push
                  </Text>
                  <Switch value={c.push} onValueChange={() => toggleNotificacaoCanal(c.categoria, 'push')} />
                </View>
                <View style={styles.channel}>
                  <Text variant="xs" weight="bold" color="secondary">
                    Email
                  </Text>
                  <Switch value={c.email} onValueChange={() => toggleNotificacaoCanal(c.categoria, 'email')} />
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.silencioRow}>
          <Text variant="sm" weight="extraBold" style={styles.silencioLabel}>
            Horário de silêncio · 22h–07h
          </Text>
          <Switch value={horarioSilencioAtivo} onValueChange={setHorarioSilencioAtivo} />
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
    paddingBottom: 40,
  },
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  card: {
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  channels: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  channel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  silencioRow: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(43,41,36,0.05)',
    padding: theme.spacing.md,
  },
  silencioLabel: {
    flex: 1,
  },
});
