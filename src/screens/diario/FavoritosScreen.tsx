import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Chip } from '../../components/ui/Chip';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { FavoritoCategoria, useMemoriesStore } from '../../store/useMemoriesStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Favoritos'>;

const TABS: FavoritoCategoria[] = ['Fotos', 'Cartas', 'Vídeos', 'Posts'];

export function FavoritosScreen({ navigation }: Props) {
  const memorias = useMemoriesStore((state) => state.memorias);
  const [tab, setTab] = useState<FavoritoCategoria>('Fotos');

  const itens = memorias.filter((memoria) => memoria.favorito && memoria.favoritoCategoria === tab);

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Favoritos
        </Text>

        <View style={styles.tabs}>
          {TABS.map((label) => (
            <Chip key={label} label={label} selected={tab === label} onPress={() => setTab(label)} />
          ))}
        </View>

        <View style={styles.grid}>
          {itens.map((memoria) => (
            <Pressable
              key={memoria.id}
              style={styles.tile}
              onPress={() => navigation.navigate('MemoriaCompleta', { id: memoria.id })}
            >
              <ImagePlaceholder style={styles.tileImage} caption={memoria.titulo} />
            </Pressable>
          ))}
        </View>

        {itens.length === 0 && (
          <View style={styles.emptyBox}>
            <Text variant="sm" weight="medium" color="secondary">
              Nenhum favorito em {tab.toLowerCase()} ainda.
            </Text>
          </View>
        )}
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
  tabs: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  grid: {
    marginTop: theme.spacing.xl,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  tile: {
    width: '47%',
    borderRadius: theme.radius.card,
    overflow: 'hidden',
  },
  tileImage: {
    height: 130,
  },
  emptyBox: {
    marginTop: theme.spacing.xl,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(43,41,36,0.04)',
    alignItems: 'center',
  },
});
