import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, CheckIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePremiumStore } from '../../store/usePremiumStore';
import { useUserStore } from '../../store/useUserStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PremiumHome'>;

export function PremiumHomeScreen({ navigation }: Props) {
  const homeCards = usePremiumStore((state) => state.homeCards);
  const premium = useUserStore((state) => state.premium);

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <ImagePlaceholder caption="foto cinematográfica · cavaleiro e cavalo ao entardecer" style={styles.heroPlaceholder} />
          <View style={styles.heroOverlay} />
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
            <BackIcon size={16} color={theme.colors.text.inverse} />
          </Pressable>
          <View style={styles.heroText}>
            <Text variant="xs" weight="bold" color={theme.colors.accent.gold} style={styles.heroLabel}>
              CLUBE EQUISOUL
            </Text>
            <Text variant="xxl" weight="extraBold" color="inverse" style={styles.heroTitle}>
              Bem-vindo ao Clube EquiSoul
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text variant="sm" weight="medium" color="secondary" style={styles.intro}>
            Um espaço dedicado a quem deseja preservar, da melhor forma possível, a história vivida com seu
            cavalo.
          </Text>

          {premium && (
            <View style={styles.statusBadge}>
              <CheckIcon size={13} color={theme.colors.accent.olive} />
              <Text variant="xs" weight="bold" color={theme.colors.accent.olive}>
                Assinatura ativa
              </Text>
            </View>
          )}

          <View style={styles.grid}>
            {homeCards.map((card) => (
              <Pressable
                key={card.id}
                style={styles.card}
                onPress={() => navigation.navigate(card.destino)}
              >
                <Text variant="sm" weight="bold">
                  {card.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <Pressable style={styles.cta} onPress={() => {}}>
            <Text variant="md" weight="extraBold" color={theme.colors.accent.gold}>
              {premium ? 'Gerenciar assinatura' : 'Ver planos'}
            </Text>
          </Pressable>
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
  hero: {
    height: 320,
  },
  heroPlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(43,41,36,0.4)',
  },
  backButton: {
    position: 'absolute',
    top: theme.spacing.xl,
    left: theme.spacing.lg,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(43,41,36,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroText: {
    position: 'absolute',
    left: theme.spacing.lg,
    right: theme.spacing.lg,
    bottom: theme.spacing.lg,
  },
  heroLabel: {
    letterSpacing: 0.6,
  },
  heroTitle: {
    marginTop: theme.spacing.xs,
  },
  body: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
  },
  intro: {
    lineHeight: 21,
  },
  statusBadge: {
    marginTop: theme.spacing.md,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingVertical: 6,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.chip,
    backgroundColor: 'rgba(107,115,83,0.12)',
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
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  cta: {
    marginTop: theme.spacing.lg,
    height: 54,
    borderRadius: 27,
    backgroundColor: theme.colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
