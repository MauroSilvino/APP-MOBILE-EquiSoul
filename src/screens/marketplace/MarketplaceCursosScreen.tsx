import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMarketplaceStore } from '../../store/useMarketplaceStore';

type Props = NativeStackScreenProps<RootStackParamList, 'MarketplaceCursos'>;

export function MarketplaceCursosScreen({ navigation }: Props) {
  const cursos = useMarketplaceStore((state) => state.cursos);

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={16} />
        </Pressable>

        <Text variant="xxl" weight="extraBold">
          Cursos
        </Text>

        <View style={styles.list}>
          {cursos.map((curso) => (
            <View key={curso.id} style={styles.card}>
              <View style={styles.thumb} />
              <View style={styles.info}>
                <Text variant="sm" weight="bold">
                  {curso.titulo}
                </Text>
                <Text variant="xs" weight="medium" color="secondary" style={styles.instrutor}>
                  {curso.instrutor}
                </Text>
                <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.preco}>
                  {curso.preco}
                </Text>
              </View>
            </View>
          ))}
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
    paddingBottom: 40,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  card: {
    flexDirection: 'row',
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
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: theme.colors.placeholder.background,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  instrutor: {
    marginTop: 2,
  },
  preco: {
    marginTop: 2,
  },
});
