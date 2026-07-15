import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePremiumStore } from '../../store/usePremiumStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PremiumLivros'>;

export function PremiumLivrosScreen({ navigation }: Props) {
  const livrosList = usePremiumStore((state) => state.livrosList);

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={16} />
        </Pressable>

        <Text variant="xxl" weight="extraBold">
          Livros digitais
        </Text>
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
          A IA transforma sua jornada em capítulos.
        </Text>

        <View style={styles.list}>
          {livrosList.map((livro) => (
            <View key={livro.id} style={styles.card}>
              <ImagePlaceholder caption={`capa · ${livro.titulo}`} style={styles.cover} />
              <View style={styles.info}>
                <Text variant="md" weight="bold">
                  {livro.titulo}
                </Text>
                <Text variant="sm" weight="medium" color="secondary" style={styles.capitulos}>
                  {livro.capitulos} capítulos
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
  subtitle: {
    marginTop: theme.spacing.xs,
    lineHeight: 20,
  },
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.lg,
  },
  card: {
    borderRadius: theme.radius.cardLarge,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 2,
  },
  cover: {
    height: 100,
  },
  info: {
    padding: theme.spacing.lg,
  },
  capitulos: {
    marginTop: 4,
  },
});
