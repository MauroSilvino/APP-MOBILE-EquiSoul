import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMemoriesStore } from '../../store/useMemoriesStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AlbumDetalhe'>;

export function AlbumDetalheScreen({ navigation, route }: Props) {
  const { nome, tipo } = route.params;
  const memorias = useMemoriesStore((state) => state.memorias);

  const itens = tipo ? memorias.filter((memoria) => memoria.tipo === tipo) : [];

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          {nome}
        </Text>

        {itens.length > 0 ? (
          <View style={styles.grid}>
            {itens.map((memoria) => (
              <Pressable
                key={memoria.id}
                style={styles.gridItem}
                onPress={() => navigation.navigate('MemoriaCompleta', { id: memoria.id })}
              />
            ))}
          </View>
        ) : (
          <Text variant="sm" weight="semiBold" color="secondary" style={styles.empty}>
            Nenhuma mídia neste álbum ainda.
          </Text>
        )}
      </ScrollView>

      <Pressable style={styles.back} onPress={() => navigation.goBack()}>
        <BackIcon />
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: 70,
    paddingBottom: theme.spacing.xxl,
  },
  grid: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  gridItem: {
    width: '31.5%',
    height: 110,
    borderRadius: 12,
    backgroundColor: theme.colors.placeholder.background,
  },
  empty: {
    marginTop: theme.spacing.xl,
    textAlign: 'center',
  },
  back: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 3,
  },
});
