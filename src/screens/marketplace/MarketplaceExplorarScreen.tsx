import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { SearchIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMarketplaceStore } from '../../store/useMarketplaceStore';

type Props = NativeStackScreenProps<RootStackParamList, 'MarketplaceExplorar'>;

type Categoria = 'Produtos' | 'Serviços' | 'Profissionais' | 'Haras';
const CATEGORIA_CHIPS = ['Produtos', 'Serviços', 'Profissionais', 'Haras', 'Eventos', 'Cursos'] as const;
const FILTRO_TIPOS = ['Cidade', 'Preço', 'Avaliação'] as const;
type FiltroTipo = (typeof FILTRO_TIPOS)[number];

const FILTRO_OPCOES: Record<FiltroTipo, string[]> = {
  Cidade: ['Todas', 'Campinas, SP', 'São Paulo, SP', 'Valinhos, SP'],
  Preço: ['Qualquer', 'Até R$ 100', 'R$ 100–300', 'R$ 300+'],
  Avaliação: ['Qualquer', '4.5+', '4.8+'],
};
const FILTRO_DEFAULT: Record<FiltroTipo, string> = { Cidade: 'Todas', Preço: 'Qualquer', Avaliação: 'Qualquer' };

interface ResultItem {
  id: string;
  nome: string;
  sub: string;
  categoria: Categoria;
  cidade: string | null;
  onPress: () => void;
}

export function MarketplaceExplorarScreen({ navigation, route }: Props) {
  const produtos = useMarketplaceStore((state) => state.produtos);
  const servicos = useMarketplaceStore((state) => state.servicos);
  const profissionais = useMarketplaceStore((state) => state.profissionais);
  const harasList = useMarketplaceStore((state) => state.harasList);

  const [categoria, setCategoria] = useState<Categoria>(
    (route.params?.categoriaInicial as Categoria) ?? 'Produtos'
  );
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(false);
  const [filtroAberto, setFiltroAberto] = useState<FiltroTipo | null>(null);
  const [filtroValores, setFiltroValores] = useState<Record<FiltroTipo, string>>(FILTRO_DEFAULT);

  const onCategoriaPress = (label: (typeof CATEGORIA_CHIPS)[number]) => {
    if (label === 'Eventos') {
      navigation.navigate('MarketplaceEventos');
      return;
    }
    if (label === 'Cursos') {
      navigation.navigate('MarketplaceCursos');
      return;
    }
    setCategoria(label);
    setLoading(true);
    setTimeout(() => setLoading(false), 450);
  };

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const itemsAll = useMemo<ResultItem[]>(
    () => [
      ...produtos.map((p) => ({
        id: p.id,
        nome: p.nome,
        sub: p.precoLabel,
        categoria: 'Produtos' as const,
        cidade: null,
        onPress: () => navigation.navigate('MarketplaceProduto', { produtoId: p.id }),
      })),
      ...servicos.map((s) => ({
        id: s.id,
        nome: s.nome,
        sub: `${s.especialidade} · ★ ${s.avaliacao}`,
        categoria: 'Serviços' as const,
        cidade: null,
        onPress: () => navigation.navigate('MarketplaceServico', { servicoId: s.id }),
      })),
      ...profissionais.map((p) => ({
        id: p.id,
        nome: p.nome,
        sub: `${p.titulo.split(' · ')[0]} · ★ ${p.avaliacao}`,
        categoria: 'Profissionais' as const,
        cidade: null,
        onPress: () => navigation.navigate('PerfilProfissional', { profissionalId: p.id }),
      })),
      ...harasList.map((h) => ({
        id: h.id,
        nome: h.nome,
        sub: `Hospedagem · ${h.localizacao}`,
        categoria: 'Haras' as const,
        cidade: h.localizacao,
        onPress: () => navigation.navigate('Haras', { harasId: h.id }),
      })),
    ],
    [produtos, servicos, profissionais, harasList, navigation]
  );

  let resultados = itemsAll.filter((item) => item.categoria === categoria);
  const query = busca.trim().toLowerCase();
  if (query) {
    resultados = resultados.filter(
      (item) => item.nome.toLowerCase().includes(query) || item.sub.toLowerCase().includes(query)
    );
  }
  if (filtroValores.Cidade !== 'Todas') {
    resultados = resultados.filter((item) => !item.cidade || item.cidade === filtroValores.Cidade);
  }
  const vazio = resultados.length === 0;

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Explorar
        </Text>

        <View style={styles.searchBox}>
          <View style={styles.searchIcon}>
            <SearchIcon size={16} color={theme.colors.text.secondary} />
          </View>
          <TextField
            value={busca}
            onChangeText={setBusca}
            placeholder="Ex: ferrador especializado em salto"
            style={styles.searchInput}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
          <View style={styles.chipsInner}>
            {CATEGORIA_CHIPS.map((label) => {
              const selected = label === categoria;
              return (
                <Pressable
                  key={label}
                  style={[styles.chip, selected && styles.chipSelected]}
                  onPress={() => onCategoriaPress(label)}
                >
                  <Text variant="sm" weight="bold" color={selected ? theme.colors.accent.gold : 'primary'}>
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.filtrosRow}>
          {FILTRO_TIPOS.map((tipo) => {
            const ativo = filtroValores[tipo] !== FILTRO_DEFAULT[tipo];
            return (
              <Pressable
                key={tipo}
                style={[styles.filtroChip, ativo && styles.filtroChipAtivo]}
                onPress={() => setFiltroAberto(tipo)}
              >
                <Text variant="xs" weight="semiBold" color={ativo ? theme.colors.accent.gold : 'primary'}>
                  {ativo ? `${tipo}: ${filtroValores[tipo]}` : tipo}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {loading ? (
          <View style={styles.grid}>
            {[0, 1, 2, 3].map((k) => (
              <View key={k} style={styles.gridItemWrap}>
                <View style={styles.skeletonThumb} />
                <View style={styles.skeletonLine} />
              </View>
            ))}
          </View>
        ) : (
          <>
            <View style={styles.grid}>
              {resultados.map((item) => (
                <Pressable key={item.id} style={styles.gridItemWrap} onPress={item.onPress}>
                  <ImagePlaceholder caption="" style={styles.gridThumb} />
                  <Text variant="sm" weight="bold" style={styles.gridNome}>
                    {item.nome}
                  </Text>
                  <Text variant="xs" weight="semiBold" color={theme.colors.accent.leather}>
                    {item.sub}
                  </Text>
                </Pressable>
              ))}
            </View>
            {vazio && (
              <Text variant="sm" weight="semiBold" color="secondary" style={styles.vazio}>
                Nenhum resultado para essa busca.
              </Text>
            )}
          </>
        )}
      </ScrollView>

      <Modal visible={filtroAberto !== null} transparent animationType="fade">
        <Pressable style={styles.modalBackdrop} onPress={() => setFiltroAberto(null)} />
        <View style={styles.sheet}>
          <View style={styles.sheetHandle} />
          <Text variant="lg" weight="extraBold">
            {filtroAberto}
          </Text>
          <View style={styles.sheetOptions}>
            {filtroAberto &&
              FILTRO_OPCOES[filtroAberto].map((opcao) => {
                const selected = filtroValores[filtroAberto] === opcao;
                return (
                  <Pressable
                    key={opcao}
                    style={[styles.sheetOption, selected && styles.sheetOptionSelected]}
                    onPress={() => {
                      setFiltroValores((prev) => ({ ...prev, [filtroAberto]: opcao }));
                      setFiltroAberto(null);
                    }}
                  >
                    <Text variant="md" weight="bold" color={selected ? theme.colors.accent.gold : 'primary'}>
                      {opcao}
                    </Text>
                  </Pressable>
                );
              })}
          </View>
        </View>
      </Modal>
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
  searchBox: {
    marginTop: theme.spacing.lg,
    justifyContent: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: theme.spacing.lg,
    zIndex: 1,
  },
  searchInput: {
    paddingLeft: theme.spacing.xxl + theme.spacing.sm,
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
  chipSelected: {
    backgroundColor: theme.colors.surfaceDark,
  },
  filtrosRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  filtroChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  filtroChipAtivo: {
    backgroundColor: theme.colors.surfaceDark,
  },
  grid: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  gridItemWrap: {
    width: '47%',
  },
  gridThumb: {
    height: 110,
    borderRadius: theme.radius.card,
  },
  gridNome: {
    marginTop: 6,
  },
  skeletonThumb: {
    height: 110,
    borderRadius: theme.radius.card,
    backgroundColor: theme.colors.placeholder.background,
  },
  skeletonLine: {
    marginTop: 6,
    height: 10,
    width: '70%',
    borderRadius: 5,
    backgroundColor: 'rgba(43,41,36,0.08)',
  },
  vazio: {
    marginTop: theme.spacing.xl,
    textAlign: 'center',
    padding: theme.spacing.lg,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(43,41,36,0.4)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(43,41,36,0.15)',
    alignSelf: 'center',
    marginBottom: theme.spacing.lg,
  },
  sheetOptions: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  sheetOption: {
    padding: theme.spacing.md,
    borderRadius: 14,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  sheetOptionSelected: {
    backgroundColor: theme.colors.surfaceDark,
  },
});
