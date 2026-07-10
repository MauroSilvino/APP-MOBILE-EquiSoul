import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SetupProgressBar } from '../../components/onboarding/SetupProgressBar';
import { Button } from '../../components/ui/Button';
import { Chip } from '../../components/ui/Chip';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { theme } from '../../theme';
import { RootStackParamList } from '../../navigation/types';
import { useUserStore } from '../../store/useUserStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Preferencias'>;

const MIN_PREFERENCIAS = 3;

const TEMAS = [
  'Saúde e bem-estar',
  'Diário e memórias',
  'Comunidade',
  'Eventos e competições',
  'Marketplace',
  'Gamificação e conquistas',
  'Inteligência artificial',
  'Agenda e cuidados',
  'Fotos e vídeos',
  'Dicas de treino',
  'Nutrição equina',
];

function toggleInArray(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function PreferenciasScreen({ navigation }: Props) {
  const setPreferencias = useUserStore((state) => state.setPreferencias);

  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const prefValida = selecionados.length >= MIN_PREFERENCIAS;

  function tentarContinuar() {
    setSubmitAttempted(true);
    if (!prefValida) return;
    setPreferencias(selecionados);
    navigation.navigate('Permissoes');
  }

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <SetupProgressBar step={4} total={5} />

        <Text variant="xl" weight="extraBold">
          O que te interessa?
        </Text>
        <Text variant="md" weight="medium" color="secondary" style={styles.subtitle}>
          Escolha ao menos 3 temas para personalizar seu feed.
        </Text>

        <View style={styles.chips}>
          {TEMAS.map((tema) => (
            <Chip
              key={tema}
              label={tema}
              selected={selecionados.includes(tema)}
              onPress={() => setSelecionados((current) => toggleInArray(current, tema))}
            />
          ))}
        </View>

        {submitAttempted && !prefValida && (
          <View style={styles.errorBanner}>
            <Text variant="sm" weight="semiBold" color={theme.colors.error}>
              Escolha pelo menos 3 temas para continuarmos.
            </Text>
          </View>
        )}

        <View style={styles.spacer} />

        <Button variant="primary" onPress={tentarContinuar}>
          Continuar
        </Button>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xl,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
  },
  chips: {
    marginTop: theme.spacing.xl,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  errorBanner: {
    marginTop: theme.spacing.lg,
    padding: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(184,92,76,0.1)',
  },
  spacer: {
    flex: 1,
    minHeight: theme.spacing.lg,
  },
});
