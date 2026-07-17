import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SettingsHeader } from '../../components/configuracoes/SettingsHeader';
import { SettingsToggleRow } from '../../components/configuracoes/SettingsToggleRow';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { AiIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { IAConfig, useSettingsStore } from '../../store/useSettingsStore';

type Props = NativeStackScreenProps<RootStackParamList, 'ConfiguracoesIA'>;

const TOGGLE_DEFS: { key: keyof IAConfig; label: string }[] = [
  { key: 'cartas', label: 'Cartas automáticas' },
  { key: 'retrospectivas', label: 'Retrospectivas' },
  { key: 'insights', label: 'Insights' },
  { key: 'sugestoes', label: 'Sugestões' },
  { key: 'reconhecimentoImagens', label: 'Reconhecimento de imagens' },
  { key: 'reconhecimentoVideos', label: 'Reconhecimento de vídeos' },
  { key: 'reconhecimentoVoz', label: 'Reconhecimento de voz' },
  { key: 'ocr', label: 'OCR de documentos' },
];

export function ConfiguracoesIAScreen({ navigation }: Props) {
  const ia = useSettingsStore((state) => state.ia);
  const toggleIA = useSettingsStore((state) => state.toggleIA);

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <SettingsHeader title="Configurações da IA" onBack={() => navigation.navigate('Configuracoes')} />
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
          Você decide o que a IA pode fazer.
        </Text>

        <View style={styles.list}>
          {TOGGLE_DEFS.map((t) => (
            <SettingsToggleRow key={t.key} label={t.label} value={ia[t.key]} onValueChange={() => toggleIA(t.key)} />
          ))}
        </View>

        <View style={styles.infoCard}>
          <AiIcon size={18} color={theme.colors.accent.leather} />
          <Text variant="xs" weight="medium" color="secondary" style={styles.infoText}>
            Veja quais dados alimentam a IA e exclua o histórico quando quiser.
          </Text>
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
  subtitle: {
    marginTop: theme.spacing.sm,
  },
  list: {
    marginTop: theme.spacing.lg,
  },
  infoCard: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(201,161,90,0.12)',
    padding: theme.spacing.md,
  },
  infoText: {
    flex: 1,
  },
});
