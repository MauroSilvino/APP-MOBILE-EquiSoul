import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, CheckIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { TEMPORADA_ATUAL } from '../../store/useGamificationStore';

type Props = NativeStackScreenProps<RootStackParamList, 'GamificacaoTemporadas'>;

export function GamificacaoTemporadasScreen({ navigation }: Props) {
  const diasRestantes = useMemo(() => {
    const fim = new Date(TEMPORADA_ATUAL.fimISO).getTime();
    const hoje = Date.now();
    return Math.max(0, Math.ceil((fim - hoje) / (1000 * 60 * 60 * 24)));
  }, []);

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerRow}>
          <Pressable
            accessibilityLabel="Voltar ao centro de evolução"
            style={styles.backButton}
            onPress={() => navigation.navigate('GamificacaoHub')}
            hitSlop={8}
          >
            <BackIcon size={15} strokeWidth={2.2} />
          </Pressable>
          <View>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.eyebrow}>
              GAMIFICAÇÃO
            </Text>
            <Text variant="xl" weight="extraBold">
              Temporadas
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <ImagePlaceholder caption={`ilustração · ${TEMPORADA_ATUAL.nome}`} style={styles.banner} />
          <View style={styles.cardBody}>
            <Text variant="md" weight="extraBold">
              {TEMPORADA_ATUAL.nome}
            </Text>
            <Text variant="xs" weight="semiBold" color="secondary" style={styles.restam}>
              Termina em {diasRestantes} dias
            </Text>
            <View style={styles.novidades}>
              {TEMPORADA_ATUAL.novidades.map((item) => (
                <View key={item} style={styles.novidadeRow}>
                  <CheckIcon size={16} strokeWidth={1.8} color={theme.colors.accent.leather} />
                  <Text variant="xs" weight="semiBold">
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <Pressable style={styles.retrospectivaButton} onPress={() => navigation.navigate('Retrospectivas')}>
          <Text variant="sm" weight="bold">
            Ver retrospectiva da temporada
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
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  eyebrow: {
    letterSpacing: 0.6,
  },
  card: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.cardLarge,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 3,
  },
  banner: {
    height: 120,
  },
  cardBody: {
    padding: theme.cardPadding.min,
  },
  restam: {
    marginTop: 4,
  },
  novidades: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  novidadeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  retrospectivaButton: {
    marginTop: theme.spacing.md,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});