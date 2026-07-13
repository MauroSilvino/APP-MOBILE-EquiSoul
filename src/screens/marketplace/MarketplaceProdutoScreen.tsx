import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { FavoriteToggle } from '../../components/ui/FavoriteToggle';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, StarIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMarketplaceStore } from '../../store/useMarketplaceStore';

type Props = NativeStackScreenProps<RootStackParamList, 'MarketplaceProduto'>;

export function MarketplaceProdutoScreen({ navigation, route }: Props) {
  const produto = useMarketplaceStore((state) =>
    state.produtos.find((item) => item.id === route.params.produtoId)
  );
  const favorito = useMarketplaceStore((state) => state.isFavorito('Produtos', route.params.produtoId));
  const toggleFavorito = useMarketplaceStore((state) => state.toggleFavorito);

  if (!produto) return null;

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView>
        <ImagePlaceholder caption={`foto · ${produto.nome}`} style={styles.photo} />

        <View style={styles.body}>
          <Text variant="xl" weight="extraBold">
            {produto.nome}
          </Text>
          <Text variant="lg" weight="bold" color={theme.colors.accent.leather} style={styles.preco}>
            {produto.precoLabel}
          </Text>
          <View style={styles.ratingRow}>
            <StarIcon size={13} />
            <Text variant="sm" weight="semiBold" color="secondary">
              {produto.avaliacao} · {produto.avaliacoesCount} avaliações
            </Text>
          </View>
          <Text variant="sm" weight="medium" color="secondary" style={styles.desc}>
            {produto.descricao}
          </Text>

          <View style={styles.iaCard}>
            <Text variant="xs" weight="bold" color={theme.colors.accent.moss} style={styles.iaLabel}>
              A IA RESUME AS AVALIAÇÕES
            </Text>
            <Text variant="sm" weight="semiBold" style={styles.iaTexto}>
              {produto.iaResumo}
            </Text>
            <Pressable
              onPress={() =>
                navigation.navigate('MarketplaceAvaliacoes', { nome: produto.nome, nota: produto.avaliacao })
              }
            >
              <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.iaCta}>
                Ver todas as avaliações →
              </Text>
            </Pressable>
          </View>

          <View style={styles.actionsRow}>
            <Pressable
              style={styles.primaryButton}
              onPress={() => navigation.navigate('MarketplaceCheckout', { produtoId: produto.id })}
            >
              <Text variant="md" weight="extraBold">
                Comprar
              </Text>
            </Pressable>
            <View style={styles.favButton}>
              <FavoriteToggle favorito={favorito} onToggle={() => toggleFavorito('Produtos', produto.id)} />
            </View>
          </View>
          <Pressable
            style={styles.chatButton}
            onPress={() => navigation.navigate('MarketplaceChat', { nome: 'Vendedor · Equistore' })}
          >
            <Text variant="sm" weight="bold">
              Chat com vendedor
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
    height: 260,
  },
  body: {
    padding: theme.spacing.xl,
    paddingBottom: 40,
  },
  preco: {
    marginTop: 6,
  },
  ratingRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  desc: {
    marginTop: theme.spacing.md,
    lineHeight: 20,
  },
  iaCard: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.card,
    padding: theme.spacing.md,
    backgroundColor: 'rgba(107,115,83,0.1)',
  },
  iaLabel: {
    letterSpacing: 0.5,
  },
  iaTexto: {
    marginTop: 6,
    lineHeight: 19,
  },
  iaCta: {
    marginTop: theme.spacing.sm,
  },
  actionsRow: {
    marginTop: theme.spacing.xl,
    flexDirection: 'row',
    gap: theme.spacing.sm,
    alignItems: 'center',
  },
  primaryButton: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatButton: {
    marginTop: theme.spacing.sm,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
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
