import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Chip } from '../../components/ui/Chip';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMemoriesStore } from '../../store/useMemoriesStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Historico'>;

interface HistoricoItem {
  id: string;
  label: string;
  tipo: string;
  status: 'Publicada' | 'Rascunho';
}

export function HistoricoScreen({ navigation }: Props) {
  const memorias = useMemoriesStore((state) => state.memorias);
  const rascunhos = useMemoriesStore((state) => state.rascunhos);
  const carregarRascunho = useMemoriesStore((state) => state.carregarRascunho);

  const [filtro, setFiltro] = useState('Todos');
  const [view, setView] = useState<'Grid' | 'Lista'>('Grid');

  const items: HistoricoItem[] = useMemo(
    () => [
      ...memorias.map((memoria) => ({ id: memoria.id, label: memoria.titulo, tipo: memoria.tipo, status: 'Publicada' as const })),
      ...rascunhos.map((rascunho) => ({
        id: rascunho.id,
        label: rascunho.titulo,
        tipo: rascunho.snapshot.tipo || 'Memória',
        status: 'Rascunho' as const,
      })),
    ],
    [memorias, rascunhos]
  );

  const tipos = useMemo(() => ['Todos', ...Array.from(new Set(items.map((item) => item.tipo)))], [items]);
  const itemsFiltrados = filtro === 'Todos' ? items : items.filter((item) => item.tipo === filtro);

  function abrirItem(item: HistoricoItem) {
    if (item.status === 'Rascunho') {
      carregarRascunho(item.id);
      navigation.navigate('Previa');
    } else {
      navigation.navigate('MemoriaCompleta', { id: item.id });
    }
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="xxl" weight="extraBold">
            Histórico de memórias
          </Text>
          <Pressable onPress={() => navigation.navigate('AlbunsInteligentes')}>
            <Text variant="sm" weight="bold" color={theme.colors.accent.leather}>
              Álbuns
            </Text>
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtros}>
          <View style={styles.filtrosInner}>
            {tipos.map((label) => (
              <Chip key={label} label={label} selected={filtro === label} onPress={() => setFiltro(label)} />
            ))}
          </View>
        </ScrollView>

        <View style={styles.viewChips}>
          {(['Grid', 'Lista'] as const).map((label) => (
            <Chip key={label} label={label} selected={view === label} onPress={() => setView(label)} />
          ))}
        </View>

        {itemsFiltrados.length === 0 && (
          <Text variant="sm" weight="semiBold" color="secondary" style={styles.empty}>
            Nenhuma memória com esse filtro ainda.
          </Text>
        )}

        {view === 'Grid' ? (
          <View style={styles.grid}>
            {itemsFiltrados.map((item) => (
              <Pressable key={item.id} style={styles.gridItem} onPress={() => abrirItem(item)}>
                <Text variant="xs" weight="semiBold" color={theme.colors.accent.leather} style={styles.gridLabel}>
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={styles.list}>
            {itemsFiltrados.map((item) => (
              <Pressable key={item.id} style={styles.listItem} onPress={() => abrirItem(item)}>
                <View style={styles.listThumb} />
                <View style={styles.listText}>
                  <Text variant="md" weight="bold">
                    {item.label}
                  </Text>
                  <Text variant="xs" weight="medium" color="secondary" style={styles.listSubtitle}>
                    {item.tipo} · {item.status}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        )}

        <Pressable style={styles.compareButton} onPress={() => navigation.navigate('Comparacao')}>
          <Text variant="sm" weight="bold" color={theme.colors.accent.leather}>
            Comparar duas memórias
          </Text>
        </Pressable>
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
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  filtros: {
    marginTop: theme.spacing.lg,
  },
  filtrosInner: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  viewChips: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  empty: {
    marginTop: theme.spacing.xl,
    textAlign: 'center',
  },
  grid: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  gridItem: {
    width: '48%',
    height: 110,
    borderRadius: 16,
    backgroundColor: theme.colors.placeholder.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridLabel: {
    textAlign: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
  },
  listThumb: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: theme.colors.placeholder.background,
  },
  listText: {
    flex: 1,
    minWidth: 0,
  },
  listSubtitle: {
    marginTop: 2,
  },
  compareButton: {
    marginTop: theme.spacing.xl,
    height: theme.buttonHeight.min + 4,
    borderRadius: (theme.buttonHeight.min + 4) / 2,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: 'rgba(43,41,36,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
