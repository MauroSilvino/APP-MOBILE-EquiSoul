import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMarketplaceStore } from '../../store/useMarketplaceStore';

type Props = NativeStackScreenProps<RootStackParamList, 'MarketplaceEventos'>;

export function MarketplaceEventosScreen({ navigation }: Props) {
  const eventosPreview = useMarketplaceStore((state) => state.eventosPreview);

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={16} />
        </Pressable>

        <Text variant="xxl" weight="extraBold">
          Eventos
        </Text>

        <View style={styles.list}>
          {eventosPreview.map((evento) => (
            <Pressable
              key={evento.id}
              style={styles.card}
              onPress={() => navigation.navigate('EventosDescobrir')}
            >
              <View style={styles.thumb} />
              <View style={styles.info}>
                <Text variant="sm" weight="bold">
                  {evento.titulo}
                </Text>
                <Text variant="xs" weight="medium" color="secondary" style={styles.quando}>
                  {evento.quando}
                </Text>
                <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.preco}>
                  {evento.preco}
                </Text>
              </View>
            </Pressable>
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
  quando: {
    marginTop: 2,
  },
  preco: {
    marginTop: 2,
  },
});
