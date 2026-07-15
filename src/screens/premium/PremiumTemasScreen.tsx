import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, CheckIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePremiumStore } from '../../store/usePremiumStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PremiumTemas'>;

export function PremiumTemasScreen({ navigation }: Props) {
  const temasList = usePremiumStore((state) => state.temasList);
  const temaSelecionado = usePremiumStore((state) => state.temaSelecionado);
  const selecionarTema = usePremiumStore((state) => state.selecionarTema);

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={16} />
        </Pressable>

        <Text variant="xxl" weight="extraBold">
          Temas exclusivos
        </Text>

        <View style={styles.grid}>
          {temasList.map((tema) => {
            const selecionado = tema.id === temaSelecionado;
            return (
              <Pressable
                key={tema.id}
                style={[styles.card, { borderColor: tema.border }]}
                onPress={() => selecionarTema(tema.id)}
              >
                <View style={[styles.swatch, { backgroundColor: tema.bg }]}>
                  {selecionado && (
                    <View style={styles.check}>
                      <CheckIcon size={12} color={theme.colors.text.primary} strokeWidth={3} />
                    </View>
                  )}
                </View>
                <Text variant="xs" weight="bold" style={styles.cardLabel}>
                  {tema.nome}
                </Text>
              </Pressable>
            );
          })}
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
    paddingBottom: 40,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  grid: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  card: {
    width: '47%',
    borderRadius: theme.radius.card,
    overflow: 'hidden',
    borderWidth: 2,
    backgroundColor: '#fff',
  },
  swatch: {
    height: 70,
    alignItems: 'flex-end',
    padding: 6,
  },
  check: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLabel: {
    padding: theme.spacing.sm,
  },
});
