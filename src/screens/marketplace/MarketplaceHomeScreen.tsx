import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { CloseIcon, HeartIcon, SearchIcon, WalletIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import {
  CatalogProfissional,
  CatalogServico,
  useMarketplaceStore,
} from '../../store/useMarketplaceStore';

type Props = NativeStackScreenProps<RootStackParamList, 'MarketplaceHome'>;

const CATEGORIA_CHIPS = ['Produtos', 'Serviços', 'Profissionais', 'Haras', 'Eventos', 'Cursos'] as const;

export function MarketplaceHomeScreen({ navigation }: Props) {
  const produtos = useMarketplaceStore((state) => state.produtos);
  const servicos = useMarketplaceStore((state) => state.servicos);
  const profissionais = useMarketplaceStore((state) => state.profissionais);
  const harasList = useMarketplaceStore((state) => state.harasList);
  const reservas = useMarketplaceStore((state) => state.reservas);
  const removeReserva = useMarketplaceStore((state) => state.removeReserva);
  const favoritos = useMarketplaceStore((state) => state.favoritos);
  const favoritosCount = Object.values(favoritos).reduce((sum, arr) => sum + arr.length, 0);
  const haras = harasList[0];

  const proximosProfissionais: { id: string; nome: string; onPress: () => void }[] = [
    ...servicos.map((servico: CatalogServico) => ({
      id: servico.id,
      nome: servico.nome,
      onPress: () => navigation.navigate('MarketplaceServico', { servicoId: servico.id }),
    })),
    ...profissionais.map((profissional: CatalogProfissional) => ({
      id: profissional.id,
      nome: profissional.nome,
      onPress: () => navigation.navigate('PerfilProfissional', { profissionalId: profissional.id }),
    })),
  ];

  const onCategoriaPress = (categoria: (typeof CATEGORIA_CHIPS)[number]) => {
    if (categoria === 'Eventos') {
      navigation.navigate('MarketplaceEventos');
    } else if (categoria === 'Cursos') {
      navigation.navigate('MarketplaceCursos');
    } else {
      navigation.navigate('MarketplaceExplorar', { categoriaInicial: categoria });
    }
  };

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="xxl" weight="extraBold">
            Marketplace
          </Text>
          <View style={styles.headerIcons}>
            <Pressable
              accessibilityLabel="Explorar marketplace"
              onPress={() => navigation.navigate('MarketplaceExplorar')}
              hitSlop={8}
            >
              <SearchIcon />
            </Pressable>
            <Pressable
              accessibilityLabel="Favoritos"
              style={styles.favIconWrap}
              onPress={() => navigation.navigate('MarketplaceFavoritos')}
              hitSlop={8}
            >
              <HeartIcon />
              {favoritosCount > 0 && (
                <View style={styles.favBadge}>
                  <Text variant="xs" weight="extraBold" color="primary">
                    {favoritosCount}
                  </Text>
                </View>
              )}
            </Pressable>
            <Pressable accessibilityLabel="Carteira" onPress={() => navigation.navigate('Carteira')} hitSlop={8}>
              <WalletIcon />
            </Pressable>
          </View>
        </View>

        <ImagePlaceholder caption="banner · clínica de adestramento com 20% off" style={styles.banner} />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
          <View style={styles.chipsInner}>
            {CATEGORIA_CHIPS.map((label) => (
              <Pressable key={label} style={styles.chip} onPress={() => onCategoriaPress(label)}>
                <Text variant="sm" weight="bold">
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        <View style={styles.sectionHeaderRow}>
          <Text variant="xs" weight="bold" style={styles.sectionLabel}>
            PRÓXIMOS SERVIÇOS
          </Text>
          <Pressable onPress={() => navigation.navigate('MarketplaceHistorico')}>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather}>
              ver todos
            </Text>
          </Pressable>
        </View>

        {reservas.length > 0 ? (
          <View style={styles.proximosList}>
            {reservas.map((reserva) => (
              <View key={reserva.id} style={styles.proximoCard}>
                <View style={styles.proximoThumb} />
                <View style={styles.proximoInfo}>
                  <Text variant="md" weight="bold">
                    {reserva.nome}
                  </Text>
                  <Text variant="sm" weight="medium" color="secondary" style={styles.proximoQuando}>
                    {reserva.origem} agendado · {reserva.data} às {reserva.horario}
                  </Text>
                </View>
                <Pressable
                  style={styles.removeButton}
                  onPress={() => removeReserva(reserva.id)}
                  hitSlop={8}
                >
                  <CloseIcon size={12} color={theme.colors.text.tertiary} />
                </Pressable>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyProximos}>
            <Text variant="sm" weight="semiBold" color="secondary">
              Nenhum serviço agendado no momento.
            </Text>
            <Pressable onPress={() => navigation.navigate('MarketplaceExplorar')}>
              <Text variant="sm" weight="bold" color={theme.colors.accent.leather} style={styles.emptyCta}>
                Explorar serviços →
              </Text>
            </Pressable>
          </View>
        )}

        <Text variant="xs" weight="bold" style={styles.sectionLabelNoAction}>
          PRODUTOS RECOMENDADOS
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.produtosRow}>
          <View style={styles.produtosInner}>
            {produtos.map((produto) => (
              <Pressable
                key={produto.id}
                style={styles.produtoCard}
                onPress={() => navigation.navigate('MarketplaceProduto', { produtoId: produto.id })}
              >
                <ImagePlaceholder caption="" style={styles.produtoThumb} />
                <Text variant="sm" weight="bold" style={styles.produtoNome}>
                  {produto.nome}
                </Text>
                <Text variant="sm" weight="bold" color={theme.colors.accent.leather}>
                  {produto.precoLabel}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        <Text variant="xs" weight="bold" style={styles.sectionLabelNoAction}>
          PROFISSIONAIS PRÓXIMOS
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.profissionaisRow}>
          <View style={styles.profissionaisInner}>
            {proximosProfissionais.map((profissional) => (
              <Pressable key={profissional.id} style={styles.profissionalItem} onPress={profissional.onPress}>
                <View style={styles.profissionalAvatar} />
                <Text variant="xs" weight="semiBold" color="secondary" style={styles.profissionalNome}>
                  {profissional.nome}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        {!!haras && (
          <Pressable
            style={styles.harasCard}
            onPress={() => navigation.navigate('Haras', { harasId: haras.id })}
          >
            <View style={styles.harasThumb} />
            <View style={styles.harasInfo}>
              <Text variant="xs" weight="bold" color={theme.colors.accent.gold} style={styles.harasLabel}>
                HARAS EM DESTAQUE
              </Text>
              <Text variant="md" weight="bold" color="inverse" style={styles.harasNome}>
                {haras.nome}
              </Text>
              <Text variant="xs" weight="medium" color="inverse" style={styles.harasDesc}>
                Hospedagem, aulas e eventos
              </Text>
            </View>
          </Pressable>
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
    paddingTop: theme.spacing.xxl,
    paddingBottom: 130,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    alignItems: 'center',
  },
  favIconWrap: {
    position: 'relative',
  },
  favBadge: {
    position: 'absolute',
    top: -6,
    right: -8,
    minWidth: 15,
    height: 15,
    paddingHorizontal: 3,
    borderRadius: 8,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    marginTop: theme.spacing.lg,
    height: 150,
    borderRadius: theme.radius.cardLarge,
  },
  chipsRow: {
    marginTop: theme.spacing.lg,
  },
  chipsInner: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  chip: {
    paddingVertical: theme.chipPadding.vertical,
    paddingHorizontal: theme.chipPadding.horizontal,
    borderRadius: theme.radius.chip,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  sectionHeaderRow: {
    marginTop: theme.spacing.xl,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  sectionLabel: {
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  sectionLabelNoAction: {
    marginTop: theme.spacing.xl,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  proximosList: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  proximoCard: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  proximoThumb: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: theme.colors.placeholder.background,
  },
  proximoInfo: {
    flex: 1,
    minWidth: 0,
  },
  proximoQuando: {
    marginTop: 2,
  },
  removeButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyProximos: {
    marginTop: theme.spacing.sm,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: 'rgba(43,41,36,0.04)',
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  emptyCta: {
    marginTop: 6,
  },
  produtosRow: {
    marginTop: theme.spacing.sm,
  },
  produtosInner: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  produtoCard: {
    width: 130,
  },
  produtoThumb: {
    height: 110,
    borderRadius: theme.radius.card,
  },
  produtoNome: {
    marginTop: 6,
  },
  profissionaisRow: {
    marginTop: theme.spacing.sm,
  },
  profissionaisInner: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
  },
  profissionalItem: {
    alignItems: 'center',
    gap: 6,
    width: 76,
  },
  profissionalAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.placeholder.background,
  },
  profissionalNome: {
    textAlign: 'center',
  },
  harasCard: {
    marginTop: theme.spacing.xl,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: theme.colors.surfaceDark,
    flexDirection: 'row',
    gap: theme.spacing.md,
    padding: theme.spacing.md,
  },
  harasThumb: {
    width: 70,
    height: 70,
    borderRadius: 14,
    backgroundColor: 'rgba(251,249,244,0.15)',
  },
  harasInfo: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
  },
  harasLabel: {
    letterSpacing: 0.5,
  },
  harasNome: {
    marginTop: 4,
  },
  harasDesc: {
    marginTop: 2,
    opacity: 0.7,
  },
});
