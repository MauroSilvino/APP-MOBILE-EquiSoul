import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { HeartIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import {
  CatalogHaras,
  CatalogProduto,
  CatalogProfissional,
  CatalogServico,
  EventoPreview,
  FavoritoCategoria,
  useMarketplaceStore,
} from '../../store/useMarketplaceStore';

type Props = NativeStackScreenProps<RootStackParamList, 'MarketplaceFavoritos'>;

const CATEGORIAS: FavoritoCategoria[] = ['Produtos', 'Serviços', 'Profissionais', 'Haras', 'Eventos'];

type FavoritoItem = { id: string; nome: string };

function toFavoritoItem(
  item: CatalogProduto | CatalogServico | CatalogProfissional | CatalogHaras | EventoPreview
): FavoritoItem {
  const nome = 'nome' in item ? item.nome : item.titulo;
  return { id: item.id, nome };
}

export function MarketplaceFavoritosScreen({ navigation }: Props) {
  const [categoria, setCategoria] = useState<FavoritoCategoria>('Produtos');
  const favoritos = useMarketplaceStore((state) => state.favoritos);
  const toggleFavorito = useMarketplaceStore((state) => state.toggleFavorito);
  const produtos = useMarketplaceStore((state) => state.produtos);
  const servicos = useMarketplaceStore((state) => state.servicos);
  const profissionais = useMarketplaceStore((state) => state.profissionais);
  const harasList = useMarketplaceStore((state) => state.harasList);
  const eventosPreview = useMarketplaceStore((state) => state.eventosPreview);

  const catalogPorCategoria: Record<FavoritoCategoria, FavoritoItem[]> = {
    Produtos: produtos.map(toFavoritoItem),
    Serviços: servicos.map(toFavoritoItem),
    Profissionais: profissionais.map(toFavoritoItem),
    Haras: harasList.map(toFavoritoItem),
    Eventos: eventosPreview.map(toFavoritoItem),
  };

  const idsFavoritos = favoritos[categoria];
  const itensFavoritos = useMemo(
    () => catalogPorCategoria[categoria].filter((item) => idsFavoritos.includes(item.id)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categoria, idsFavoritos]
  );

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Favoritos
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
          <View style={styles.chipsRow}>
            {CATEGORIAS.map((item) => {
              const selected = categoria === item;
              return (
                <Pressable
                  key={item}
                  style={[styles.chip, selected && styles.chipSelected]}
                  onPress={() => setCategoria(item)}
                >
                  <Text variant="sm" weight="bold" color={selected ? theme.colors.text.inverse : 'primary'}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        {itensFavoritos.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Text variant="sm" weight="semiBold" color="secondary">
              Nenhum favorito em {categoria} ainda.
            </Text>
            <Pressable onPress={() => navigation.navigate('MarketplaceExplorar', undefined)}>
              <Text variant="sm" weight="bold" color={theme.colors.accent.leather} style={styles.emptyLink}>
                Explorar →
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.list}>
            {itensFavoritos.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.thumb} />
                <Text variant="sm" weight="bold" style={styles.cardNome}>
                  {item.nome}
                </Text>
                <Pressable
                  style={styles.removeButton}
                  onPress={() => toggleFavorito(categoria, item.id)}
                  hitSlop={8}
                >
                  <HeartIcon size={16} color={theme.colors.accent.gold} filled />
                </Pressable>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <BottomTabBar active="Home" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxl + 12,
    paddingBottom: 130,
  },
  chipsScroll: {
    marginTop: theme.spacing.md,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  chip: {
    paddingVertical: theme.chipPadding.vertical,
    paddingHorizontal: theme.chipPadding.horizontal,
    borderRadius: theme.radius.chip,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  chipSelected: {
    backgroundColor: theme.colors.surfaceDark,
  },
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  thumb: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: theme.colors.placeholder.background,
  },
  cardNome: {
    flex: 1,
  },
  removeButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyWrap: {
    marginTop: 40,
    alignItems: 'center',
  },
  emptyLink: {
    marginTop: 6,
  },
});
