import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, CheckIcon, PlayIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePremiumStore } from '../../store/usePremiumStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PremiumVideos'>;

export function PremiumVideosScreen({ navigation }: Props) {
  const videoEstilos = usePremiumStore((state) => state.videoEstilos);
  const videoEstiloSelecionado = usePremiumStore((state) => state.videoEstiloSelecionado);
  const selecionarVideoEstilo = usePremiumStore((state) => state.selecionarVideoEstilo);

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={16} />
        </Pressable>

        <Text variant="xxl" weight="extraBold">
          Vídeos Premium
        </Text>
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
          A IA monta filmes com sua história.
        </Text>

        <View style={styles.grid}>
          {videoEstilos.map((estilo) => {
            const selecionado = estilo.id === videoEstiloSelecionado;
            return (
              <Pressable
                key={estilo.id}
                style={[styles.card, selecionado && styles.cardSelecionado]}
                onPress={() => selecionarVideoEstilo(estilo.id)}
              >
                <ImagePlaceholder caption="" style={styles.thumb}>
                  <PlayIcon size={18} color={theme.colors.accent.leather} />
                </ImagePlaceholder>
                <View style={styles.cardFooter}>
                  <Text variant="xs" weight="bold">
                    {estilo.nome}
                  </Text>
                  {selecionado && <CheckIcon size={13} color={theme.colors.accent.olive} strokeWidth={2.6} />}
                </View>
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
  subtitle: {
    marginTop: theme.spacing.xs,
    lineHeight: 20,
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
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  cardSelecionado: {
    borderColor: theme.colors.accent.olive,
  },
  thumb: {
    height: 64,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.sm,
  },
});
