import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, HorseshoeIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useHorseStore } from '../../store/useHorseStore';
import { useHealthStore } from '../../store/useHealthStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Ferrageamento'>;

export function FerrageamentoScreen({ navigation, route }: Props) {
  const horses = useHorseStore((state) => state.horses);
  const horse = horses.find((h) => h.id === route.params.id) ?? horses[0];
  const records = useHealthStore((state) => (horse ? state.getRecords(horse.id) : null));

  if (!horse) {
    return (
      <Screen>
        <Text variant="md" weight="bold">
          Cavalo não encontrado.
        </Text>
      </Screen>
    );
  }

  const ferrageamentos = records?.ferrageamentos ?? [];

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <ImagePlaceholder caption={`foto · cascos de ${horse.nome}`} style={styles.hero} />

        <View style={styles.body}>
          <Text variant="xl" weight="extraBold">
            Ferrageamento
          </Text>

          {ferrageamentos.length === 0 ? (
            <Text variant="sm" weight="medium" color="secondary" style={styles.empty}>
              Nenhum registro de ferrageamento ainda.
            </Text>
          ) : (
            <View style={styles.list}>
              {ferrageamentos.map((item) => (
                <View key={item.id} style={styles.card}>
                  <View style={styles.cardIcon}>
                    <HorseshoeIcon />
                  </View>
                  <View>
                    <Text variant="md" weight="bold">
                      {item.ferrador}
                    </Text>
                    <Text variant="xs" weight="medium" color="secondary" style={styles.cardSubtitle}>
                      {item.tipo} · {item.data}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          <Text variant="xs" weight="medium" color="secondary" style={styles.hint}>
            Historicamente o ferrageamento costuma ocorrer a cada seis semanas.
          </Text>
        </View>
      </ScrollView>

      <BottomTabBar active="Perfis" />

      <Pressable style={styles.backButton} onPress={() => navigation.navigate('SaudeCavalo', { id: horse.id })} hitSlop={8}>
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
    paddingBottom: 130,
  },
  hero: {
    height: 160,
  },
  body: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
  },
  empty: {
    marginTop: theme.spacing.xxl,
    textAlign: 'center',
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
    padding: theme.cardPadding.min,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  cardIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(138,110,75,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardSubtitle: {
    marginTop: 4,
  },
  hint: {
    marginTop: theme.spacing.lg,
    lineHeight: 18,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 20,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    zIndex: 5,
  },
});
