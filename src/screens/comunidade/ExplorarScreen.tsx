import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { CommunityTabs } from '../../components/comunidade/CommunityTabs';
import { Chip } from '../../components/ui/Chip';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { SearchIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useCommunityStore } from '../../store/useCommunityStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Explorar'>;

const CATEGORIAS = ['Saltos', 'Trilhas', 'Raças', 'Equipamentos', 'Fotografia', 'Haras'];

export function ExplorarScreen({ navigation }: Props) {
  const explorarItems = useCommunityStore((state) => state.explorarItems);
  const posts = useCommunityStore((state) => state.posts);

  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Saltos');

  const query = busca.trim().toLowerCase();
  const itens = query ? explorarItems.filter((item) => item.titulo.includes(query)) : explorarItems;
  const semResultado = itens.length === 0;

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold" style={styles.title}>
          Comunidade
        </Text>

        <CommunityTabs active="Explorar" />

        <View style={styles.searchBox}>
          <View style={styles.searchIcon}>
            <SearchIcon size={16} color={theme.colors.text.secondary} />
          </View>
          <TextField
            value={busca}
            onChangeText={setBusca}
            placeholder="Buscar na comunidade"
            style={styles.searchInput}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriasRow}>
          <View style={styles.categoriasInner}>
            {CATEGORIAS.map((label) => (
              <Chip key={label} label={label} selected={categoria === label} onPress={() => setCategoria(label)} />
            ))}
          </View>
        </ScrollView>

        {semResultado ? (
          <View style={styles.empty}>
            <Text variant="lg" weight="bold">
              Nada encontrado
            </Text>
            <Text variant="sm" weight="medium" color="secondary" style={styles.emptyText}>
              Tente buscar por outro termo.
            </Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {itens.map((item) => (
              <Pressable
                key={item.id}
                style={{ width: '48.5%' }}
                onPress={() => navigation.navigate('Comentarios', { postId: posts[0]?.id ?? 'post-1' })}
              >
                <ImagePlaceholder caption="" style={[styles.gridItem, { height: item.altura }]}>
                  <Text variant="xs" weight="semiBold" color={theme.colors.accent.leather} style={styles.gridLabel}>
                    {item.titulo}
                  </Text>
                </ImagePlaceholder>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>

      <BottomTabBar active="Comunidade" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: 130,
  },
  title: {
    marginTop: theme.spacing.xxl,
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
  categoriasRow: {
    marginTop: theme.spacing.lg,
  },
  categoriasInner: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  empty: {
    marginTop: 50,
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xl,
  },
  emptyText: {
    textAlign: 'center',
  },
  grid: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  gridItem: {
    borderRadius: 14,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    padding: theme.spacing.sm,
  },
  gridLabel: {
    textAlign: 'left',
    textTransform: 'uppercase',
    paddingHorizontal: 0,
  },
});
