import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Chip } from '../../components/ui/Chip';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { SearchIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMemoriesStore } from '../../store/useMemoriesStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PesquisaMemorias'>;

function toggleInArray(list: string[], value: string): string[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function PesquisaMemoriasScreen({ navigation }: Props) {
  const memorias = useMemoriesStore((state) => state.memorias);

  const [query, setQuery] = useState('');
  const [filtros, setFiltros] = useState<string[]>([]);

  const todasTags = useMemo(() => {
    const set = new Set<string>();
    memorias.forEach((memoria) => memoria.tags.forEach((tag) => set.add(tag)));
    return Array.from(set).slice(0, 8);
  }, [memorias]);

  const resultados = memorias.filter((memoria) => {
    const texto = `${memoria.titulo} ${memoria.subtitulo} ${memoria.tags.join(' ')}`.toLowerCase();
    const matchesQuery = query.trim() === '' || texto.includes(query.trim().toLowerCase());
    const matchesFiltros = filtros.length === 0 || memoria.tags.some((tag) => filtros.includes(tag));
    return matchesQuery && matchesFiltros;
  });

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text variant="xxl" weight="extraBold">
          Pesquisar memórias
        </Text>

        <View style={styles.searchBox}>
          <SearchIcon color={theme.colors.text.secondary} />
          <TextField
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Cavalo, local, hashtag, pessoa..."
          />
        </View>

        <View style={styles.chips}>
          {todasTags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              selected={filtros.includes(tag)}
              onPress={() => setFiltros((current) => toggleInArray(current, tag))}
            />
          ))}
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          RESULTADOS{filtros.length > 0 ? ` (${resultados.length})` : ''}
        </Text>
        <View style={styles.results}>
          {resultados.map((memoria) => (
            <Pressable
              key={memoria.id}
              style={styles.card}
              onPress={() => navigation.navigate('MemoriaCompleta', { id: memoria.id })}
            >
              <View style={styles.thumb} />
              <View style={styles.cardText}>
                <Text variant="md" weight="bold">
                  {memoria.titulo}
                </Text>
                <Text variant="sm" weight="medium" color="secondary" style={styles.cardSubtitle}>
                  {memoria.subtitulo || memoria.local}
                </Text>
              </View>
            </Pressable>
          ))}
          {resultados.length === 0 && (
            <View style={styles.emptyBox}>
              <Text variant="sm" weight="medium" color="secondary">
                Nenhum resultado para esses filtros.
              </Text>
            </View>
          )}
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
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xxl,
  },
  searchBox: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
  },
  chips: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  sectionLabel: {
    marginTop: theme.spacing.xl,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  results: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.md,
  },
  card: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: theme.colors.placeholder.background,
  },
  cardText: {
    flex: 1,
    minWidth: 0,
  },
  cardSubtitle: {
    marginTop: 2,
  },
  emptyBox: {
    padding: theme.spacing.lg,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(43,41,36,0.04)',
    alignItems: 'center',
  },
});
