import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useHorseStore } from '../../store/useHorseStore';

type Props = NativeStackScreenProps<RootStackParamList, 'IABemEstar'>;

const CHIPS = ['Resumo', 'Cuidados', 'Alertas'];

export function IABemEstarScreen({ navigation, route }: Props) {
  const horses = useHorseStore((state) => state.horses);
  const horse = horses.find((h) => h.id === route.params.id) ?? horses[0];

  if (!horse) {
    return (
      <Screen>
        <Text variant="md" weight="bold">
          Cavalo não encontrado.
        </Text>
      </Screen>
    );
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          IA Bem-estar
        </Text>
        <Text variant="md" weight="medium" color="secondary" style={styles.intro}>
          Uma assistente silenciosa que ajuda a organizar e lembrar. É a mesma IA que acompanha{' '}
          {horse.nome} em todo o EquiSoul.
        </Text>

        <View style={styles.chipsRow}>
          {CHIPS.map((chip) => (
            <View key={chip} style={styles.chip}>
              <Text variant="sm" weight="bold">
                {chip}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.resumoCard}>
          <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.cardEyebrow}>
            RESUMO
          </Text>
          <Text variant="md" weight="medium" style={styles.resumoText}>
            Nos últimos meses vocês mantiveram uma rotina consistente de cuidados registrados.
          </Text>
        </View>

        <View style={styles.lembreteCard}>
          <Text variant="xs" weight="bold" style={styles.cardEyebrow}>
            LEMBRETE SUAVE
          </Text>
          <Text variant="md" weight="medium" color="secondary" style={styles.lembreteText}>
            Existe um exame registrado há bastante tempo. Caso faça sentido para sua rotina, vale
            verificar com seu veterinário quando será o próximo acompanhamento.
          </Text>
        </View>

        <Pressable
          style={styles.assistenteButton}
          onPress={() => navigation.navigate('InteligenciaArtificial')}
        >
          <Text variant="sm" weight="extraBold">
            Abrir assistente completo
          </Text>
        </Pressable>
      </ScrollView>

      <BottomTabBar active="Perfis" />

      <Pressable style={styles.backButton} onPress={() => navigation.navigate('SaudeCavalo', { id: horse.id })} hitSlop={8}>
        <BackIcon />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: 70,
    paddingBottom: 130,
  },
  intro: {
    marginTop: theme.spacing.xs,
    lineHeight: 20,
  },
  chipsRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  chip: {
    borderRadius: 18,
    backgroundColor: 'rgba(107,115,83,0.14)',
    paddingVertical: 9,
    paddingHorizontal: 15,
  },
  resumoCard: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: 'rgba(201,161,90,0.12)',
    padding: theme.cardPadding.max,
  },
  lembreteCard: {
    marginTop: theme.spacing.md,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: '#fff',
    padding: theme.cardPadding.max,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  cardEyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  resumoText: {
    marginTop: theme.spacing.sm,
    lineHeight: 22,
  },
  lembreteText: {
    marginTop: theme.spacing.sm,
    lineHeight: 22,
  },
  assistenteButton: {
    marginTop: theme.spacing.lg,
    height: theme.buttonHeight.min + 4,
    borderRadius: (theme.buttonHeight.min + 4) / 2,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 20,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
});
