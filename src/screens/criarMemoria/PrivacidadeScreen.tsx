import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Chip } from '../../components/ui/Chip';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Screen } from '../../components/ui/Screen';
import { Switch } from '../../components/ui/Switch';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { PrivacidadeToggles, useMemoriesStore } from '../../store/useMemoriesStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Privacidade'>;

const QUEM_VE_OPTIONS = ['Somente eu', 'Amigos', 'Seguidores', 'Todos'];

const TOGGLE_DEFS: { key: keyof PrivacidadeToggles; label: string }[] = [
  { key: 'comentarios', label: 'Permitir comentários' },
  { key: 'compartilhar', label: 'Permitir compartilhamento' },
  { key: 'download', label: 'Permitir download' },
  { key: 'ocultarLocalizacao', label: 'Ocultar localização' },
];

export function PrivacidadeScreen({ navigation }: Props) {
  const draft = useMemoriesStore((state) => state.criarMemoriaDraft);
  const setCriarMemoriaDraft = useMemoriesStore((state) => state.setCriarMemoriaDraft);

  function togglePriv(key: keyof PrivacidadeToggles) {
    setCriarMemoriaDraft({ privToggles: { ...draft.privToggles, [key]: !draft.privToggles[key] } });
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <ProgressBar step={6} total={7} />
        <Text variant="xxl" weight="extraBold">
          Privacidade
        </Text>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          QUEM PODE VER?
        </Text>
        <View style={styles.chips}>
          {QUEM_VE_OPTIONS.map((label) => (
            <Chip
              key={label}
              label={label}
              selected={draft.quemVe === label}
              onPress={() => setCriarMemoriaDraft({ quemVe: label })}
            />
          ))}
        </View>

        <View style={styles.toggles}>
          {TOGGLE_DEFS.map((toggle) => (
            <View key={toggle.key} style={styles.toggleRow}>
              <Text variant="sm" weight="semiBold" style={styles.toggleLabel}>
                {toggle.label}
              </Text>
              <Switch value={draft.privToggles[toggle.key]} onValueChange={() => togglePriv(toggle.key)} />
            </View>
          ))}
        </View>

        <Pressable style={styles.continueButton} onPress={() => navigation.navigate('Previa')}>
          <Text variant="lg" weight="extraBold">
            Ver prévia
          </Text>
        </Pressable>
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
    paddingBottom: theme.spacing.xxl,
  },
  sectionLabel: {
    marginTop: theme.spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  chips: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  toggles: {
    marginTop: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  toggleLabel: {
    flex: 1,
  },
  continueButton: {
    marginTop: theme.spacing.xl,
    height: theme.buttonHeight.max,
    borderRadius: theme.buttonHeight.max / 2,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
