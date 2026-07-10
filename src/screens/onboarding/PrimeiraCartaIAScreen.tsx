import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { LetterIcon } from '../../components/ui/icons';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { theme } from '../../theme';
import { RootStackParamList } from '../../navigation/types';
import { useUserStore } from '../../store/useUserStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PrimeiraCartaIA'>;

const CARTA =
  '"Hoje começamos nossa história aqui. Ainda não sei quantas trilhas vamos percorrer juntos, mas sinto que este será um lugar onde nossas lembranças viverão para sempre."';

export function PrimeiraCartaIAScreen({ navigation }: Props) {
  const setOnboardingConcluido = useUserStore((state) => state.setOnboardingConcluido);
  const [cartaAberta, setCartaAberta] = useState(false);

  function handleContinuar() {
    setOnboardingConcluido(true);
    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
  }

  return (
    <Screen style={styles.screen} padded={false}>
      <View style={styles.content}>
        {!cartaAberta ? (
          <Pressable style={styles.envelope} onPress={() => setCartaAberta(true)}>
            <View style={styles.envelopeBox}>
              <LetterIcon />
            </View>
            <Text variant="md" weight="bold" color="inverse" style={styles.envelopeLabel}>
              Toque para abrir sua primeira carta
            </Text>
          </Pressable>
        ) : (
          <View style={styles.letter}>
            <Text
              variant="xs"
              weight="semiBold"
              color={theme.colors.accent.gold}
              style={styles.letterEyebrow}
            >
              CARTA DO SEU CAVALO
            </Text>
            <Text variant="lg" weight="semiBold" color="inverse" style={styles.letterText}>
              {CARTA}
            </Text>

            <View style={styles.actions}>
              <Button variant="primary" onPress={handleContinuar}>
                Continuar
              </Button>
              <View style={styles.secondaryRow}>
                <Pressable style={styles.secondaryButton}>
                  <Text variant="sm" weight="bold" color="inverse">
                    Salvar
                  </Text>
                </Pressable>
                <Pressable style={styles.secondaryButton}>
                  <Text variant="sm" weight="bold" color="inverse">
                    Compartilhar
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.surfaceDark,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xxl,
  },
  envelope: {
    alignItems: 'center',
    gap: theme.spacing.xl,
  },
  envelopeBox: {
    width: 140,
    height: 100,
    borderRadius: 8,
    borderWidth: 1.6,
    borderColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  envelopeLabel: {
    textAlign: 'center',
  },
  letter: {
    width: '100%',
    gap: theme.spacing.xl,
  },
  letterEyebrow: {
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  letterText: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  actions: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  secondaryRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  secondaryButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(251,249,244,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
