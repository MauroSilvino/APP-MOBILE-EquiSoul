import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Chip } from '../../components/ui/Chip';
import { FavoriteToggle } from '../../components/ui/FavoriteToggle';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { CalendarIcon, HeartIcon, SearchIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { Memoria, useMemoriesStore } from '../../store/useMemoriesStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Timeline'>;

const FILTROS = ['Hoje', 'Semana', 'Mês', 'Ano', 'Tudo'];
const PAGE_SIZE = 3;

function matchesFiltro(memoria: Memoria, filtro: string): boolean {
  if (filtro === 'Hoje') return memoria.relativeLabel === 'Hoje';
  if (filtro === 'Semana' || filtro === 'Mês') return memoria.relativeLabel !== 'Há exatamente 1 ano';
  return true;
}

export function TimelineScreen({ navigation }: Props) {
  const memorias = useMemoriesStore((state) => state.memorias);
  const toggleFavorito = useMemoriesStore((state) => state.toggleFavorito);

  const [filtro, setFiltro] = useState('Tudo');
  const [pageSize, setPageSize] = useState(PAGE_SIZE);

  const filtradas = memorias.filter((memoria) => matchesFiltro(memoria, filtro));
  const visiveis = filtradas.slice(0, pageSize);
  const temMais = filtradas.length > visiveis.length;

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="xxl" weight="extraBold">
            Linha do tempo
          </Text>
          <View style={styles.headerIcons}>
            <Pressable onPress={() => navigation.navigate('Favoritos')}>
              <HeartIcon size={20} color={theme.colors.text.primary} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('PesquisaMemorias')}>
              <SearchIcon />
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Calendario')}>
              <CalendarIcon />
            </Pressable>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtros}>
          {FILTROS.map((label) => (
            <Chip
              key={label}
              label={label}
              selected={filtro === label}
              onPress={() => {
                setFiltro(label);
                setPageSize(PAGE_SIZE);
              }}
            />
          ))}
        </ScrollView>

        <View style={styles.list}>
          <View style={styles.line} />
          {visiveis.map((memoria) => (
            <View key={memoria.id} style={styles.item}>
              <View style={styles.dot} />
              <Text variant="xs" weight="semiBold" color={theme.colors.accent.leather} style={styles.date}>
                {memoria.relativeLabel}
              </Text>
              <Pressable
                style={styles.card}
                onPress={() => navigation.navigate('MemoriaCompleta', { id: memoria.id })}
              >
                <View style={styles.thumb} />
                <View style={styles.cardText}>
                  <Text variant="md" weight="bold">
                    {memoria.titulo}
                  </Text>
                  {!!memoria.subtitulo && (
                    <Text variant="sm" weight="medium" color="secondary" style={styles.cardSubtitle}>
                      {memoria.subtitulo}
                    </Text>
                  )}
                </View>
                <FavoriteToggle
                  size={18}
                  favorito={memoria.favorito}
                  onToggle={() => toggleFavorito(memoria.id)}
                />
              </Pressable>
            </View>
          ))}

          {visiveis.length === 0 && (
            <Text variant="sm" weight="medium" color="secondary" style={styles.empty}>
              Nenhuma memória neste período.
            </Text>
          )}

          {temMais && (
            <Pressable style={styles.loadMore} onPress={() => setPageSize((current) => current + PAGE_SIZE)}>
              <Text variant="sm" weight="bold" color={theme.colors.accent.leather}>
                Carregar mais…
              </Text>
            </Pressable>
          )}
        </View>
      </ScrollView>

      <BottomTabBar active="Timeline" />
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
  },
  filtros: {
    marginTop: theme.spacing.lg,
  },
  list: {
    marginTop: theme.spacing.xl,
    paddingLeft: theme.spacing.lg,
  },
  line: {
    position: 'absolute',
    left: 5,
    top: 6,
    bottom: 6,
    width: 1.5,
    backgroundColor: 'rgba(43,41,36,0.12)',
  },
  item: {
    marginBottom: theme.spacing.xl,
  },
  dot: {
    position: 'absolute',
    left: -theme.spacing.lg,
    top: 6,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: theme.colors.accent.gold,
    borderWidth: 2,
    borderColor: theme.colors.background,
  },
  date: {
    marginBottom: theme.spacing.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
  },
  thumb: {
    width: 60,
    height: 60,
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
  empty: {
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
  loadMore: {
    marginTop: theme.spacing.sm,
    alignItems: 'center',
  },
});
