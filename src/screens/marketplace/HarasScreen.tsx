import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMarketplaceStore } from '../../store/useMarketplaceStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Haras'>;

export function HarasScreen({ navigation, route }: Props) {
  const haras = useMarketplaceStore((state) =>
    state.harasList.find((item) => item.id === route.params.harasId)
  );

  if (!haras) return null;

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView>
        <ImagePlaceholder caption={`foto grande · ${haras.nome}`} style={styles.photo} />

        <View style={styles.body}>
          <Text variant="xl" weight="extraBold">
            {haras.nome}
          </Text>
          <Text variant="sm" weight="semiBold" color="secondary" style={styles.meta}>
            {haras.localizacao} · hospedagem, aulas e eventos · ★ {haras.avaliacao}
          </Text>
          <Pressable
            onPress={() => navigation.navigate('MarketplaceAvaliacoes', { nome: haras.nome, nota: haras.avaliacao })}
          >
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.avaliacoesCta}>
              Ver avaliações →
            </Text>
          </Pressable>

          <ImagePlaceholder caption="mapa" style={styles.mapa} />

          <Text variant="sm" weight="medium" color="secondary" style={styles.desc}>
            {haras.descricaoLonga}
          </Text>

          <View style={styles.fotosRow}>
            {[0, 1, 2].map((i) => (
              <View key={i} style={styles.fotoItem} />
            ))}
          </View>

          <Pressable
            style={styles.primaryButton}
            onPress={() =>
              navigation.navigate('MarketplaceReserva', {
                origem: 'Visita',
                nome: haras.nome,
                precoLabel: 'R$ 50,00',
              })
            }
          >
            <Text variant="md" weight="extraBold">
              Reservar visita
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
        <BackIcon size={16} />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  photo: {
    height: 220,
  },
  body: {
    padding: theme.spacing.xl,
    paddingBottom: 40,
  },
  meta: {
    marginTop: 6,
  },
  avaliacoesCta: {
    marginTop: 3,
  },
  mapa: {
    marginTop: theme.spacing.lg,
    height: 110,
    borderRadius: theme.radius.card,
  },
  desc: {
    marginTop: theme.spacing.lg,
    lineHeight: 20,
  },
  fotosRow: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  fotoItem: {
    flex: 1,
    height: 80,
    borderRadius: 12,
    backgroundColor: theme.colors.placeholder.background,
  },
  primaryButton: {
    marginTop: theme.spacing.xl,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
});
