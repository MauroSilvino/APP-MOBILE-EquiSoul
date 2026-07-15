import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, ShieldIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { LOJA_CATALOG, useGamificationStore } from '../../store/useGamificationStore';

type Props = NativeStackScreenProps<RootStackParamList, 'GamificacaoLoja'>;

export function GamificacaoLojaScreen({ navigation }: Props) {
  const pontos = useGamificationStore((state) => state.pontos);
  const adquiridos = useGamificationStore((state) => state.lojaAdquiridos);
  const resgatarItemLoja = useGamificationStore((state) => state.resgatarItemLoja);

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
              Loja de recompensas
            </Text>
          </View>
        </View>
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
          Puramente cosmético — nunca vantagem competitiva.
        </Text>

        <View style={styles.pontosChip}>
          <ShieldIcon size={16} />
          <Text variant="sm" weight="extraBold">
            {pontos} pontos
          </Text>
        </View>

        <View style={styles.grid}>
          {LOJA_CATALOG.map((item) => {
            const adquirido = adquiridos.includes(item.id);
            const podeResgatar = pontos >= item.custo;
            let label = 'Resgatar';
            if (adquirido) label = 'Adquirido ✓';
            else if (!podeResgatar) label = 'Pontos insuficientes';

            return (
              <View key={item.id} style={styles.card}>
                <ImagePlaceholder caption={item.categoria} style={styles.thumb} />
                <View style={styles.cardBody}>
                  <Text variant="sm" weight="bold">
                    {item.nome}
                  </Text>
                  <Text variant="xs" weight="semiBold" color={theme.colors.accent.leather} style={styles.custo}>
                    {item.custo} pontos
                  </Text>
                  <Pressable
                    style={[
                      styles.resgatarButton,
                      adquirido && styles.resgatarButtonDone,
                      !adquirido && !podeResgatar && styles.resgatarButtonDisabled,
                    ]}
                    disabled={adquirido || !podeResgatar}
                    onPress={() => resgatarItemLoja(item.id)}
                  >
                    <Text
                      variant="xs"
                      weight="bold"
                      color={adquirido ? theme.colors.accent.moss : !podeResgatar ? 'tertiary' : theme.colors.surfaceDark}
                    >
                      {label}
                    </Text>
                  </Pressable>
                </View>
              </View>
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
  subtitle: {
    marginTop: theme.spacing.sm,
    lineHeight: 20,
  },
  pontosChip: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    alignSelf: 'flex-start',
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(43,41,36,0.05)',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  },
  grid: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  card: {
    width: '47%',
    borderRadius: theme.radius.cardLarge,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  thumb: {
    height: 80,
  },
  cardBody: {
    padding: theme.cardPadding.min,
  },
  custo: {
    marginTop: 2,
  },
  resgatarButton: {
    marginTop: theme.spacing.sm,
    height: 34,
    borderRadius: 14,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resgatarButtonDone: {
    backgroundColor: 'rgba(107,115,83,0.15)',
  },
  resgatarButtonDisabled: {
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
});
