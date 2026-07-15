import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePremiumStore } from '../../store/usePremiumStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PremiumEventos'>;

export function PremiumEventosScreen({ navigation }: Props) {
  const eventosPremiumList = usePremiumStore((state) => state.eventosPremiumList);

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={16} />
        </Pressable>

        <Text variant="xxl" weight="extraBold">
          Eventos Premium
        </Text>

        <View style={styles.list}>
          {eventosPremiumList.map((evento) => (
            <View key={evento.id} style={styles.card}>
              <ImagePlaceholder caption="" style={styles.cover} />
              <View style={styles.info}>
                <Text variant="sm" weight="bold">
                  {evento.titulo}
                </Text>
                <Text variant="xs" weight="medium" color="secondary" style={styles.meta}>
                  {evento.data} · {evento.tipo}
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
    height: 90,
  },
  info: {
    padding: theme.cardPadding.max,
  },
  meta: {
    marginTop: 2,
  },
});
